import { simpleGit, type SimpleGit } from "simple-git";
import { generateRandomID } from "../utils/randomID.js";
import { fileURLToPath } from "url";

import type { Request, Response } from "express";
import path from "path";
import { getAllFiles } from "../file.js";
import { uploadFile } from "../aws/aws.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const Deploy = async (req: Request, res: Response) => {
  try {
    const { repoUrl } = req.body;
    const id = generateRandomID();
    await simpleGit().clone(repoUrl, path.join(__dirname, `output/${id}`));

    const files = getAllFiles(path.join(__dirname, `output/${id}`));
    //Iterate over all the files and upload them to S3 one by one (or together) not s3 but cf r2
    // Use Promise.all to upload all files in parallel, or use for...of for sequential uploads
    await Promise.all(
      files.map(async (file) => {
        const key = file.slice(__dirname.length + 1);
        await uploadFile(key, file);
        console.log(`Uploaded: ${key}`);
      })
    );
    //slice function will remove this part users/nraj/zellr/dist/output/122c2/app.js  slice will remove users/nraj/zellr/dist/output + / where 1 was "/"
    //it will eventually give us output/122c2/app.js a clean path to store in r2
    res.status(200).json({
      message: "file uploaded successfully",
      id: id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
export default Deploy;

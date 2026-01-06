import dotenv from "dotenv";
dotenv.config();
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { Readable } from "stream";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// go up from dist/aws to project root)
const projectRoot = path.resolve(__dirname, "../..");

const s3Client = new S3Client({
  region: "auto",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  },
  ...(process.env.ENDPOINT && { endpoint: process.env.ENDPOINT }),
});

export async function downloadS3Folder(prefix: string) {
  const outputBase = path.join(process.cwd(), prefix); //eg deploy-service/output/37ko9

  // Ensureds that folder exists even if S3 has no files
  if (!fs.existsSync(outputBase)) {
    fs.mkdirSync(outputBase, { recursive: true });
    console.log("Created folder:", outputBase);
  }

  // List all objects under the prefix...
  const listCommand = new ListObjectsV2Command({
    Bucket: "zellr-bucket",
    Prefix: prefix,
  });

  const listResponse = await s3Client.send(listCommand);
  const allFiles = listResponse.Contents || [];

  if (allFiles.length === 0) {
    console.log(`No files found in S3 for prefix: ${prefix}`);
    return;
  }

  // Download all files
  const downloadPromises = allFiles.map(async ({ Key }) => {
    if (!Key) return;

    // Remove prefix from key to avoid nested folder issues
    const relativePath = Key.startsWith(`${prefix}/`)
      ? Key.slice(prefix.length + 1)
      : Key;

    const finalOutputPath = path.join(outputBase, relativePath);
    const dirName = path.dirname(finalOutputPath);

    // Ensure parent folders exist
    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName, { recursive: true });
    }

    // Get the object from S3
    const getCommand = new GetObjectCommand({
      Bucket: "zellr-bucket",
      Key,
    });

    const response = await s3Client.send(getCommand);
    if (!response.Body) return;

    const stream = response.Body as Readable;
    const outputFile = fs.createWriteStream(finalOutputPath);

    return new Promise<void>((resolve, reject) => {
      stream
        .pipe(outputFile)
        .on("finish", () => {
          console.log("Downloaded:", finalOutputPath);
          resolve();
        })
        .on("error", (err) => {
          console.error("Download error:", finalOutputPath, err);
          reject(err);
        });
    });
  });

  await Promise.all(downloadPromises);
  console.log("Downloaded all files to:", outputBase);
}

export async function copyFinalDist(id: string) {
  // Correct path to dist folder
  const folderPath = path.join(process.cwd(), `output/${id}/dist`);

  if (!fs.existsSync(folderPath)) {
    console.error("Dist folder not found for", id, folderPath);
    return;
  }

  const allFiles = getAllFiles(folderPath);

  const uploadPromises = allFiles.map((file) => {
    // Keep relative path inside dist
    const relativePath = file.slice(folderPath.length + 1);
    return uploadFile(`dist/${id}/${relativePath}`, file);
  });

  await Promise.all(uploadPromises);
  console.log("Uploaded dist for", id);
}

const getAllFiles = (folderPath: string): string[] => {
  let response: string[] = [];

  const allFilesAndFolders = fs.readdirSync(folderPath);

  allFilesAndFolders.forEach((file) => {
    const fullFilePath = path.join(folderPath, file);
    if (fs.statSync(fullFilePath).isDirectory()) {
      response = response.concat(getAllFiles(fullFilePath));
    } else {
      response.push(fullFilePath);
    }
  });

  return response;
};

const uploadFile = async (fileName: string, localFilePath: string) => {
  const fileContent = fs.readFileSync(localFilePath);

  const command = new PutObjectCommand({
    Body: fileContent,
    Bucket: "zellr-bucket",
    Key: fileName,
  });

  const response = await s3Client.send(command);
  console.log(response);
};

import { simpleGit, type SimpleGit } from "simple-git";
import { generateRandomID } from "../utils/randomID.js";
import type { Request, Response} from "express";
import path from "path"
import { getAllFiles } from "../file.js"

const Deploy = async (req: Request, res: Response) =>{
try{
    const { repoUrl } = req.body;
    const id = generateRandomID();
    await simpleGit().clone(repoUrl, path.join(__dirname,`output/${id}`));

    const files = getAllFiles(path.join(__dirname,`output/${id}`))

    res.status(200).json({
        message : "file uploaded successfully",
        id:id
    })

}
catch(err){
    console.error(err);
    res.status(500).json({message: "Internal server error"});
}
}
export default Deploy;
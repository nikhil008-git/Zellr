import fs from "fs";
import path from "path";

export const getAllFiles = (folderPath: string) => {
    let response: string[] = [];

    const allFilesAndFolders = fs.readdirSync(folderPath);allFilesAndFolders.forEach(file => {
        const fullFilePath = path.join(folderPath, file);
        if (fs.statSync(fullFilePath).isDirectory()) {
            response = response.concat(getAllFiles(fullFilePath))
        } else {
            response.push(fullFilePath);
        }
    });
    return response;
}
//here what the function does is it basically gives us the path eventually from going inside the folders or present files from the cloned reposistory stored in output dir 

// this will work only when the folder is in the same directory as the file
// export const getAllFiles = (folderPath : string)=>{
//     let response = [];
//     const files = fs.readdirSync(folderPath);
//     response.push(...files);
//     return response;
// }
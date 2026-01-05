import dotenv from "dotenv";
dotenv.config();
import { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { Readable } from "stream";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Get the project root (go up from dist/aws to project root)
const projectRoot = path.resolve(__dirname, '../..');

const s3Client = new S3Client({
  region: "auto",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  },
  ...(process.env.ENDPOINT && { endpoint: process.env.ENDPOINT }),
});

// Download S3 folder
export async function downloadS3Folder(prefix: string) {
    const command = new ListObjectsV2Command({
        Bucket: "zellr-bucket",
        Prefix: prefix
    });
    
    const allFiles = await s3Client.send(command);
    
    const allPromises = allFiles.Contents?.map(async ({Key}) => {
        if (!Key) {
            return;
        }
        
        const finalOutputPath = path.join(__dirname, Key);
        const dirName = path.dirname(finalOutputPath);
        
        if (!fs.existsSync(dirName)){
            fs.mkdirSync(dirName, { recursive: true });
        }
        
        const getCommand = new GetObjectCommand({
            Bucket: "zellr-bucket",
            Key
        });
        
        const response = await s3Client.send(getCommand);
        
        if (response.Body) {
            const stream = response.Body as Readable;
            const outputFile = fs.createWriteStream(finalOutputPath);
            
            return new Promise<void>((resolve, reject) => {
                stream.pipe(outputFile)
                    .on("finish", () => resolve())
                    .on("error", reject);
            });
        }
    }) || [];
    
    console.log("awaiting");
    await Promise.all(allPromises.filter(x => x !== undefined));
}

export async function copyFinalDist(id: string) {
    const folderPath = path.join(__dirname, `output/${id}/dist`);
    const allFiles = getAllFiles(folderPath);
    
    const uploadPromises = allFiles.map(file => {
        return uploadFile(`dist/${id}/` + file.slice(folderPath.length + 1), file);
    });
    
    await Promise.all(uploadPromises);
}

const getAllFiles = (folderPath: string): string[] => {
    let response: string[] = [];

    const allFilesAndFolders = fs.readdirSync(folderPath);
    
    allFilesAndFolders.forEach(file => {
        const fullFilePath = path.join(folderPath, file);
        if (fs.statSync(fullFilePath).isDirectory()) {
            response = response.concat(getAllFiles(fullFilePath));
        } else {
            response.push(fullFilePath);
        }
    });
    
    return response;
}

const uploadFile = async (fileName: string, localFilePath: string) => {
    const fileContent = fs.readFileSync(localFilePath);
    
    const command = new PutObjectCommand({
        Body: fileContent,
        Bucket: "zellr-bucket",
        Key: fileName,
    });
    
    const response = await s3Client.send(command);
    console.log(response);
}
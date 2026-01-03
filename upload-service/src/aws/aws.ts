import dotenv from "dotenv";
dotenv.config();
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";

const s3Client = new S3Client({
  region: "auto",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  },
  ...(process.env.ENDPOINT && { endpoint: process.env.ENDPOINT }),
});

export const uploadFile = async (fileName: string, localFilePath: string) => {
  const fileContent = fs.readFileSync(localFilePath);
  const response = await s3Client.send(
    new PutObjectCommand({
      Body: fileContent,
      Bucket: process.env.R2_BUCKET_NAME || "zellr-bucket",
      Key: fileName,
    })
  );
  console.log(response);
};
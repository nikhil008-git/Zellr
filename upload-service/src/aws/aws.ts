import dotenv from "dotenv";
dotenv.config();
import { S3Client, PutObjectCommand, ListBucketsCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";

// Get bucket name from environment, default to "zellr"
const BUCKET_NAME = process.env.R2_BUCKET_NAME || "zellr";

const s3Client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  },
  ...(process.env.ENDPOINT ? { endpoint: process.env.ENDPOINT } : {}),
  // Cloudflare R2 requires forcePathStyle for path-style URLs
  forcePathStyle: true,
});

// Helper function to get content type based on file extension
const getContentType = (filePath: string): string => {
  const ext = path.extname(filePath).toLowerCase();
  const contentTypes: Record<string, string> = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".jsx": "application/javascript",
    ".ts": "application/typescript",
    ".tsx": "application/typescript",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".pdf": "application/pdf",
    ".txt": "text/plain",
    ".md": "text/markdown",
  };
  return contentTypes[ext] || "application/octet-stream";
};

// Helper function to list all buckets (for debugging)
export const listBuckets = async (): Promise<string[]> => {
  try {
    const command = new ListBucketsCommand({});
    const response = await s3Client.send(command);
    const bucketNames = response.Buckets?.map(bucket => bucket.Name || "") || [];
    console.log("Available buckets:", bucketNames);
    return bucketNames;
  } catch (error) {
    console.error("Error listing buckets:", error);
    throw error;
  }
};

export const uploadFile = async (fileName: string, localFilePath: string): Promise<string> => {
  try {
    // Debug: Log bucket configuration
    console.log("Bucket configuration:", {
      bucketName: BUCKET_NAME,
      endpoint: process.env.ENDPOINT,
      hasAccessKey: !!process.env.ACCESS_KEY_ID,
      hasSecretKey: !!process.env.SECRET_ACCESS_KEY,
    });

    // Check if file exists
    if (!fs.existsSync(localFilePath)) {
      throw new Error(`File not found: ${localFilePath}`);
    }

    // Read file content
    const fileContent = fs.readFileSync(localFilePath);
    const contentType = getContentType(localFilePath);

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: fileContent,
      ContentType: contentType,
    });

    console.log(`Uploading to bucket: ${BUCKET_NAME}, key: ${fileName}`);
    await s3Client.send(command);
    
    // Construct the location URL for Cloudflare R2
    const endpoint = process.env.ENDPOINT || "";
    const location = endpoint 
      ? `${endpoint}/${BUCKET_NAME}/${fileName}`
      : `https://${BUCKET_NAME}.s3.amazonaws.com/${fileName}`;
    
    return location;
  } catch (error) {
    console.error(`Error uploading file ${fileName}:`, error);
    throw error;
  }
};
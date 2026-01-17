import type { Request, Response } from "express";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import dotenv from "dotenv";  
dotenv.config();

const s3Client = new S3Client({
  region: "auto", 
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  },
  ...(process.env.ENDPOINT && { endpoint: process.env.ENDPOINT }),
});

//  stream =>>> buffer
const streamToBuffer = async (stream: Readable): Promise<Buffer> => {
  const chunks: Uint8Array[] = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
};

async function Subdomain(req: Request, res: Response) {
  try {
    const host = req.hostname;
    const id = host.split(".")[0];
    const filePath = req.path === "/" ? "/index.html" : req.path;

    const command = new GetObjectCommand({
      Bucket: "zellr-bucket",
      Key: `dist/${id}${filePath}`,
    });

    const response = await s3Client.send(command);

    if (!response.Body) {
      return res.status(404).send("File not found");
    }

    const body = await streamToBuffer(response.Body as Readable);

    const type = filePath.endsWith(".html")
      ? "text/html"
      : filePath.endsWith(".css")
      ? "text/css"
      : filePath.endsWith(".js")
      ? "application/javascript"
      : "application/octet-stream";

    res.setHeader("Content-Type", type);
    res.send(body);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

export default Subdomain;
 
import express from "express";
import cors from "cors";
import Deploy from "./controllers/uploadControllers.js";
import dotenv from 'dotenv';
// import { uploadFile, listBuckets } from './aws/aws.js'
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/upload", Deploy);
// console.log("start upload")


//below block for object store testing purpose!!!!!!!!!!!!!!!!!!!!!!!
// First, list all available buckets to verify the bucket name
// listBuckets()
//   .then(buckets => {
//     console.log("Available buckets:", buckets);
//     const targetBucket = process.env.R2_BUCKET_NAME || "zellr";
//     if (!buckets.includes(targetBucket)) {
//       console.error(` Bucket "${targetBucket}" not found! Available buckets: ${buckets.join(", ")}`);
//       console.error("Please check your bucket name in Cloudflare R2 dashboard or set R2_BUCKET_NAME env variable.");
//       return;
//     }
//     console.log(`Bucket "${targetBucket}" found!`);
    
//     // Test with a file that actually exists
//     return uploadFile(
//       "test/package.json",  // This will be the key in your R2 bucket
//       "./package.json"  // Use a file that exists, like your package.json
//     );
//   })
//   .then(location => {
//     if (location) {
//       console.log("Upload successful! Location:", location);
//     }
//   })
//   .catch(err => {
//     console.error("Upload failed:", err);
//   });


app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: Error | any, promise: Promise<any>) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
  console.error('Uncaught Exception:', error);
});

app.listen(3000, () => {
  console.log("Upload service is running on port 3000");
});

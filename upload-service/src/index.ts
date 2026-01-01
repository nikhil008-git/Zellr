import express from "express";
import cors from "cors";
import Deploy from "./controllers/uploadControllers.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/upload", Deploy);

// Error handling middleware (optional but recommended)
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(3000, () => {
  console.log("Upload service is running on port 3000");
});
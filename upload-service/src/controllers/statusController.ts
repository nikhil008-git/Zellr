import { createClient } from "redis";
// @ts-ignore
import type { Request, Response } from "express";

const subscriber = createClient();
await subscriber.connect();

if (!subscriber.isOpen) {
  await subscriber.connect();
}

async function Status(req: Request, res: Response) {
  try {
    const id = req.query.id;
    
    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    const response = await subscriber.hGet("status", id as string);
    
    res.json({
      // @ts-ignore
      status: response || "not found"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export default Status;
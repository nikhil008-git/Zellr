
import dotenv from "dotenv";
dotenv.config();
import { createClient } from "redis";
import { copyFinalDist, downloadS3Folder } from "./aws/aws.js";
import { buildProject } from "./helper.js";

const subscriber = createClient();
await subscriber.connect();

const publisher = createClient();
await publisher.connect();

async function main() {
    while(1) {
        try {
            const res = await subscriber.brPop(
                'build-queue',
                0
            );
            
            if (!res || !res.element) {
                console.log("No items in queue");
                continue;
            }
            
            const id = res.element;
            console.log(`Processing build for ID: ${id}`);
            
            // Logs to check the process of deployment
            await downloadS3Folder(`output/${id}`);
            console.log(`Downloaded files for ${id}`);
            
            await buildProject(id);
            console.log(`Built project ${id}`);
            
            await copyFinalDist(id);  
            console.log(`Uploaded dist for ${id}`);
            
            await publisher.hSet("status", id, "deployed");
            console.log(`Deployment complete for ${id}`);
        } catch (err) {
            console.error("Error in main loop:", err);
            // Continue processing next item instead of crashing
        }
    }
}

main()
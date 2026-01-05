import { exec, spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Get the project root (go up from dist to project root)
const projectRoot = path.resolve(__dirname, '..');

export function buildProject(id: string) {
    return new Promise((resolve) => {
        const child = exec(`cd ${path.join(process.cwd(), `output/${id}`)} && npm install && npm run build`)

        child.stdout?.on('data', function(data) {
            console.log('stdout: ' + data);
        });
        child.stderr?.on('data', function(data) {
            console.log('stderr: ' + data);
        });

        child.on('close', function(code) {
           resolve("")
        });

    })

}
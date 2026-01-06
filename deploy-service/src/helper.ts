import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function buildProject(id: string) {
  return new Promise<void>((resolve, reject) => {
    const projectPath = path.join(__dirname, `../output/${id}`);

    console.log("Building at:", projectPath);

    const child = exec(
      `cd "${projectPath}" && npm install && npm run build`,
    );

    child.stdout?.on("data", (data) => {
      console.log("stdout:", data.toString());
    });

    child.stderr?.on("data", (data) => {
      console.error("stderr:", data.toString());
    });

    child.on("close", (code) => {
      if (code === 0) {
        console.log("Build finished successfully");
        resolve();
      } else {
        reject(new Error(`Build failed with exit code ${code}`));
      }
    });
  });
}

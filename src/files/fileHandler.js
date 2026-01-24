import fs from "fs";
import fetch from "node-fetch";
import path from "path";

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function downloadFile(url, filename, retries = 3) {
  if (!fs.existsSync("backups/assets")) {
    fs.mkdirSync("backups/assets", { recursive: true });
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);

      const res = await fetch(url, {
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (!res.ok) throw new Error("Download failed");

      const buffer = await res.arrayBuffer();

      const filePath = path.join("backups/assets", filename);
      fs.writeFileSync(filePath, Buffer.from(buffer));

      return `../assets/${filename}`;

    } catch (err) {
      console.log(`⚠️ File download failed (attempt ${attempt})`);

      if (attempt === retries) {
        console.log("⏭️ Skipping file");
        return null;
      }

      await sleep(2000);
    }
  }
}

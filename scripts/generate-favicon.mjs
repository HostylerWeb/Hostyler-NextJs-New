import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const svgPath = join(root, "src/lib/brand/brand-mark.svg");
const appDir = join(root, "src/app");

const svg = await readFile(svgPath);

const icon512 = await sharp(svg).resize(512, 512).png().toBuffer();
const apple180 = await sharp(svg).resize(180, 180).png().toBuffer();

await writeFile(join(appDir, "icon.png"), icon512);
await writeFile(join(appDir, "apple-icon.png"), apple180);

console.log("Generated src/app/icon.png (512x512)");
console.log("Generated src/app/apple-icon.png (180x180)");

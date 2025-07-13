// scripts/generate-assets.ts
import * as fs from "fs";
import * as path from "path";

const assetDir = "res";
const outPath = "src/Types/res.d.ts";

function getAllFiles(dir: string, prefix = ""): string[] {
    return fs.readdirSync(dir).flatMap(file => {
        const fullPath = path.join(dir, file);
        const relativePath = path.join(prefix, file);
        return fs.statSync(fullPath).isDirectory()
            ? getAllFiles(fullPath, relativePath)
            : [relativePath.replace(/\\/g, "/")];
    });
}

const files = getAllFiles(assetDir);

const lines = [
    `// Auto-generated file`,
    `export type AssetPath =`,
    ...files.map(file => `  | "${assetDir}/${file}"`),
    `;`
];

fs.writeFileSync(outPath, lines.join("\n"));
console.log(`✅ Generated ${outPath}`);

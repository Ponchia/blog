import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname);
const assetsDir = path.resolve(rootDir, 'src', 'assets', 'images');
const publicDir = path.resolve(rootDir, 'public');

// Check if assets directory exists
if (!fs.existsSync(assetsDir)) {
  console.log('Assets directory does not exist. Nothing to copy.');
  process.exit(0);
}

// Copy all webp and avif files from assets to public
console.log('Copying optimized images to public directory...');

let filesCopied = 0;
const optimizedExtensions = ['.webp', '.avif'];

fs.readdirSync(assetsDir).forEach(file => {
  const ext = path.extname(file).toLowerCase();
  
  if (optimizedExtensions.includes(ext)) {
    const sourcePath = path.join(assetsDir, file);
    const destPath = path.join(publicDir, file);
    
    try {
      fs.copyFileSync(sourcePath, destPath);
      filesCopied++;
      console.log(`Copied: ${file}`);
    } catch (error) {
      console.error(`Error copying ${file}: ${error.message}`);
    }
  }
});

console.log(`Copied ${filesCopied} optimized image files to public directory.`); 
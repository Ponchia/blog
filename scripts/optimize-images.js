import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

// Get directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');
const assetsDir = path.resolve(rootDir, 'src', 'assets', 'images');

// Ensure assets directory exists
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
  console.log(`Created assets directory: ${assetsDir}`);
}

// Image file extensions to process
const validExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

// Formats to convert to
const targetFormats = ['webp', 'avif'];

// Process a single image
async function processImage(filePath) {
  const fileName = path.basename(filePath);
  const fileExt = path.extname(fileName).toLowerCase();
  const baseName = path.basename(fileName, fileExt);
  
  if (!validExtensions.includes(fileExt)) {
    return;
  }
  
  console.log(`Processing: ${fileName}`);
  
  // Read the image
  const image = sharp(filePath);
  
  // Get image metadata
  const metadata = await image.metadata();
  
  // Convert to each target format
  for (const format of targetFormats) {
    const outputPath = path.join(assetsDir, `${baseName}.${format}`);
    
    try {
      await image
        .toFormat(format, { quality: 80 })
        .toFile(outputPath);
      
      console.log(`Created: ${outputPath} (${format})`);
    } catch (error) {
      console.error(`Failed to convert ${fileName} to ${format}:`, error);
    }
  }
  
  // Also copy the original to assets directory
  const outputOriginal = path.join(assetsDir, fileName);
  fs.copyFileSync(filePath, outputOriginal);
  console.log(`Copied original: ${outputOriginal}`);
}

// Find and process all images in the public directory
async function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip certain directories
      if (file !== 'fonts' && file !== 'rss') {
        await processDirectory(filePath);
      }
    } else if (stat.isFile()) {
      await processImage(filePath);
    }
  }
}

// Start processing
console.log('Starting image optimization...');
processDirectory(publicDir)
  .then(() => {
    console.log('Image optimization complete!');
    console.log(`Optimized images saved to: ${assetsDir}`);
  })
  .catch((error) => {
    console.error('Error during image optimization:', error);
  }); 
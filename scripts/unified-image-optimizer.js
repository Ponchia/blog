#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { program } from 'commander';

// Get directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');
const assetsDir = path.resolve(rootDir, 'src', 'assets', 'images');
const contentDir = path.resolve(rootDir, 'src', 'content');

// Setup CLI options
program
  .name('unified-image-optimizer')
  .description('A unified tool for optimizing images in the Astro blog')
  .version('1.0.0')
  .option('-w, --watch', 'Watch for new images and optimize them')
  .option('-p, --path <path>', 'Target specific directory for optimization')
  .option('-f, --formats <formats>', 'Comma-separated list of formats to generate (default: "webp,avif")')
  .option('-q, --quality <number>', 'Quality setting for optimized images (0-100)', '80')
  .option('--skip-copy', 'Skip copying optimized images to public directory')
  .option('--verbose', 'Show detailed logs');

program.parse();
const options = program.opts();

// Image file extensions to process
const validExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

// Formats to convert to
const targetFormats = options.formats ? options.formats.split(',') : ['webp', 'avif'];

// Quality setting
const quality = parseInt(options.quality, 10);

// Ensure assets directory exists
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
  log(`Created assets directory: ${assetsDir}`, true);
}

// Logging function
function log(message, force = false) {
  if (options.verbose || force) {
    console.log(message);
  }
}

// Process a single image
async function processImage(filePath) {
  const fileName = path.basename(filePath);
  const fileExt = path.extname(fileName).toLowerCase();
  const baseName = path.basename(fileName, fileExt);
  
  if (!validExtensions.includes(fileExt)) {
    return false;
  }
  
  log(`Processing: ${fileName}`);
  
  // Read the image
  const image = sharp(filePath);
  
  // Get image metadata
  const metadata = await image.metadata();
  
  // Convert to each target format
  for (const format of targetFormats) {
    const outputPath = path.join(assetsDir, `${baseName}.${format}`);
    
    try {
      await image
        .toFormat(format, { quality })
        .toFile(outputPath);
      
      log(`Created: ${outputPath} (${format})`);
    } catch (error) {
      console.error(`Failed to convert ${fileName} to ${format}:`, error);
    }
  }
  
  // Also copy the original to assets directory
  const outputOriginal = path.join(assetsDir, fileName);
  fs.copyFileSync(filePath, outputOriginal);
  log(`Copied original: ${outputOriginal}`);
  
  return true;
}

// Find and process all images in a directory
async function processDirectory(directory) {
  log(`Scanning directory: ${directory}`);
  
  const files = fs.readdirSync(directory);
  let processedCount = 0;
  
  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip certain directories
      if (file !== 'fonts' && file !== 'rss' && !file.startsWith('.')) {
        processedCount += await processDirectory(filePath);
      }
    } else if (stat.isFile()) {
      const wasProcessed = await processImage(filePath);
      if (wasProcessed) processedCount++;
    }
  }
  
  return processedCount;
}

// Copy optimized images to public directory
async function copyToPublic() {
  log('Copying optimized images to public directory...');

  let filesCopied = 0;
  const optimizedExtensions = targetFormats.map(format => `.${format}`);

  fs.readdirSync(assetsDir).forEach(file => {
    const ext = path.extname(file).toLowerCase();
    
    if (optimizedExtensions.includes(ext)) {
      const sourcePath = path.join(assetsDir, file);
      const destPath = path.join(publicDir, file);
      
      try {
        fs.copyFileSync(sourcePath, destPath);
        filesCopied++;
        log(`Copied: ${file}`);
      } catch (error) {
        console.error(`Error copying ${file}: ${error.message}`);
      }
    }
  });

  log(`Copied ${filesCopied} optimized image files to public directory.`, true);
  return filesCopied;
}

// Watch for new images
async function watchDirectories() {
  const directoriesToWatch = [publicDir];
  
  // Add content directory to watch for images in MDX files
  directoriesToWatch.push(contentDir);
  
  log('Watching for new images...', true);
  
  for (const dir of directoriesToWatch) {
    fs.watch(dir, { recursive: true }, async (eventType, filename) => {
      if (!filename) return;
      
      const filePath = path.join(dir, filename);
      
      // Only process if it's a file and has a valid extension
      try {
        const stat = fs.statSync(filePath);
        if (stat.isFile() && validExtensions.includes(path.extname(filename).toLowerCase())) {
          log(`Change detected: ${filename}`);
          await processImage(filePath);
          
          if (!options.skipCopy) {
            await copyToPublic();
          }
        }
      } catch (error) {
        // File might not exist anymore, ignore
      }
    });
  }
}

// Main function
async function main() {
  console.log('🖼️  Unified Image Optimizer');
  console.log('==========================');
  
  // Determine which directory to process
  const targetDir = options.path ? path.resolve(rootDir, options.path) : publicDir;
  
  if (!fs.existsSync(targetDir)) {
    console.error(`Error: Directory does not exist: ${targetDir}`);
    process.exit(1);
  }
  
  console.log(`Target directory: ${targetDir}`);
  console.log(`Output directory: ${assetsDir}`);
  console.log(`Target formats: ${targetFormats.join(', ')}`);
  console.log(`Quality setting: ${quality}`);
  console.log('---------------------------');
  
  // Process images
  const processedCount = await processDirectory(targetDir);
  console.log(`Processed ${processedCount} images.`);
  
  // Copy to public if needed
  if (!options.skipCopy) {
    const copiedCount = await copyToPublic();
    console.log(`Copied ${copiedCount} optimized images to public directory.`);
  }
  
  // Watch mode
  if (options.watch) {
    await watchDirectories();
  } else {
    console.log('Done! 🎉');
  }
}

// Run the main function
main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
#!/usr/bin/env node

/**
 * Convert images in the public directory to WebP format
 * 
 * This script:
 * 1. Finds all PNG, JPG, and JPEG files in the public directory
 * 2. Converts them to WebP format with optimized quality
 * 3. Optionally resizes them to a maximum width/height
 * 
 * Usage: node scripts/convert-to-webp.mjs
 */

import { promises as fs } from 'fs';
import { join, dirname, parse } from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

// Image configuration
const config = {
  quality: 80,
  maxWidth: 1200,
  maxHeight: 800,
  skipExisting: true, // Skip if WebP already exists
};

/**
 * Recursively find all files in a directory
 */
async function findFiles(dir, extensions) {
  const files = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findFiles(path, extensions)));
    } else if (
      entry.isFile() &&
      extensions.some(ext => entry.name.toLowerCase().endsWith(ext))
    ) {
      files.push(path);
    }
  }

  return files;
}

/**
 * Convert an image to WebP format
 */
async function convertToWebP(imagePath) {
  const { dir, name } = parse(imagePath);
  const webpPath = join(dir, `${name}.webp`);

  // Skip if WebP already exists and skipExisting is true
  try {
    if (config.skipExisting) {
      await fs.access(webpPath);
      console.log(`Skipping ${imagePath} - WebP already exists`);
      return;
    }
  } catch (error) {
    // File doesn't exist, continue with conversion
  }

  try {
    // Load the image
    let image = sharp(imagePath);

    // Get image metadata
    const metadata = await image.metadata();
    
    // Resize if needed
    if (metadata.width > config.maxWidth || metadata.height > config.maxHeight) {
      image = image.resize({
        width: Math.min(metadata.width, config.maxWidth),
        height: Math.min(metadata.height, config.maxHeight),
        fit: 'inside',
        withoutEnlargement: true
      });
    }

    // Convert to WebP and save
    await image
      .webp({ quality: config.quality })
      .toFile(webpPath);

    console.log(`Converted ${imagePath} to WebP`);
  } catch (error) {
    console.error(`Error converting ${imagePath}:`, error);
  }
}

async function main() {
  // Find all image files
  console.log('Finding images...');
  const extensions = ['.png', '.jpg', '.jpeg'];
  const imageFiles = await findFiles(publicDir, extensions);
  
  if (imageFiles.length === 0) {
    console.log('No images found in public directory.');
    return;
  }
  
  console.log(`Found ${imageFiles.length} images to convert.`);
  
  // Convert all images to WebP
  for (const file of imageFiles) {
    await convertToWebP(file);
  }
  
  console.log('Image conversion complete!');
}

main().catch(console.error); 
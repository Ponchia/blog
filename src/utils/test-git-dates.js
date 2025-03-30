#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

/**
 * This script tests the Git date functionality by retrieving Git creation 
 * and modification dates for blog post files and displaying them.
 * 
 * Run with: node src/utils/test-git-dates.js
 */

// Path to blog content directory
const BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog');

console.log('Testing Git date functionality for blog posts...\n');

// Get all Markdown and MDX files in the blog directory
const blogFiles = fs.readdirSync(BLOG_DIR)
  .filter(file => file.endsWith('.md') || file.endsWith('.mdx'));

blogFiles.forEach(file => {
  const filePath = path.join(BLOG_DIR, file);
  
  console.log(`\n=== ${file} ===`);
  
  // Get first commit date (creation date)
  try {
    const firstCommitCmd = `git log --follow --format="%at" --reverse "${filePath}" | head -1`;
    const firstCommitTimestamp = execSync(firstCommitCmd).toString().trim();
    
    if (firstCommitTimestamp) {
      const firstCommitDate = new Date(parseInt(firstCommitTimestamp) * 1000);
      console.log(`Creation date: ${firstCommitDate.toISOString()}`);
    } else {
      console.log('Creation date: Not found in Git history');
    }
  } catch (error) {
    console.error('Error getting creation date:', error.message);
  }
  
  // Get last commit date (modification date)
  try {
    const lastCommitCmd = `git log -1 --format="%at" "${filePath}"`;
    const lastCommitTimestamp = execSync(lastCommitCmd).toString().trim();
    
    if (lastCommitTimestamp) {
      const lastCommitDate = new Date(parseInt(lastCommitTimestamp) * 1000);
      console.log(`Last modified: ${lastCommitDate.toISOString()}`);
    } else {
      console.log('Last modified: Not found in Git history');
    }
  } catch (error) {
    console.error('Error getting last modified date:', error.message);
  }
  
  // Read file frontmatter to show manual dates if present
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const frontmatterMatch = content.match(/^---\s+([\s\S]*?)\s+---/);
    
    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1];
      
      const pubDateMatch = frontmatter.match(/pubDate:\s*['"]?(.*?)['"]?\s*$/m);
      if (pubDateMatch) {
        console.log(`Manual pubDate: ${pubDateMatch[1]}`);
      } else {
        console.log('Manual pubDate: Not specified');
      }
      
      const updatedDateMatch = frontmatter.match(/updatedDate:\s*['"]?(.*?)['"]?\s*$/m);
      if (updatedDateMatch) {
        console.log(`Manual updatedDate: ${updatedDateMatch[1]}`);
      } else {
        console.log('Manual updatedDate: Not specified');
      }
    }
  } catch (error) {
    console.error('Error reading file frontmatter:', error.message);
  }
}); 
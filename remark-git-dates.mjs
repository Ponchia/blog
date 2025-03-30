import { execSync } from 'child_process';

/**
 * A remark plugin that extracts Git creation and modification dates
 * for Markdown and MDX files and adds them to the frontmatter.
 */
export function remarkGitDates() {
  return function (tree, file) {
    try {
      const filepath = file.history[0];
      
      // Get the first commit date (creation date)
      let firstCommitDate = null;
      try {
        firstCommitDate = execSync(
          `git log --follow --format="%at" --reverse "${filepath}" | head -1`
        ).toString().trim();
        
        // Convert Unix timestamp to ISO date
        if (firstCommitDate) {
          firstCommitDate = new Date(parseInt(firstCommitDate) * 1000).toISOString();
        }
      } catch (e) {
        console.warn(`Could not get first commit date for ${filepath}:`, e.message);
      }
      
      // Get the last commit date (modification date)
      let lastModifiedDate = null;
      try {
        lastModifiedDate = execSync(
          `git log -1 --format="%at" "${filepath}"`
        ).toString().trim();
        
        // Convert Unix timestamp to ISO date
        if (lastModifiedDate) {
          lastModifiedDate = new Date(parseInt(lastModifiedDate) * 1000).toISOString();
        }
      } catch (e) {
        console.warn(`Could not get last modified date for ${filepath}:`, e.message);
      }
      
      // Add to frontmatter
      if (firstCommitDate) {
        file.data.astro.frontmatter.gitCreatedDate = firstCommitDate;
      }
      
      if (lastModifiedDate) {
        file.data.astro.frontmatter.gitLastModified = lastModifiedDate;
      }
    } catch (error) {
      console.error('Error in remarkGitDates plugin:', error);
    }
  };
} 
import { execSync } from 'child_process';

/**
 * A remark plugin that extracts Git creation and modification dates
 * for Markdown and MDX files and adds them to the frontmatter.
 */
export function remarkGitDates() {
  return function (tree, file) {
    try {
      const filepath = file.history[0];
      const currentDate = new Date();

      // Get the first commit date (creation date)
      let firstCommitDate = null;
      try {
        firstCommitDate = execSync(
          `git log --follow --format="%at" --reverse "${filepath}" | head -1`
        )
          .toString()
          .trim();

        // Convert Unix timestamp to ISO date
        if (firstCommitDate) {
          const parsedDate = new Date(parseInt(firstCommitDate) * 1000);

          // Validate the date isn't in the future before using it
          if (parsedDate <= currentDate) {
            firstCommitDate = parsedDate.toISOString();
          } else {
            console.warn(
              `Future date detected for first commit of ${filepath}, using current date instead`
            );
            firstCommitDate = currentDate.toISOString();
          }
        }
      } catch (e) {
        console.warn(`Could not get first commit date for ${filepath}:`, e.message);
      }

      // Get the last commit date (modification date)
      let lastModifiedDate = null;
      try {
        lastModifiedDate = execSync(`git log -1 --format="%at" "${filepath}"`).toString().trim();

        // Convert Unix timestamp to ISO date
        if (lastModifiedDate) {
          const parsedDate = new Date(parseInt(lastModifiedDate) * 1000);

          // Validate the date isn't in the future before using it
          if (parsedDate <= currentDate) {
            lastModifiedDate = parsedDate.toISOString();
          } else {
            console.warn(
              `Future date detected for last modification of ${filepath}, using current date instead`
            );
            lastModifiedDate = currentDate.toISOString();
          }
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

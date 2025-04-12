# Git-Based Dates for Astro Blog

This document explains the implementation of Git-based dates for blog posts in this Astro blog. Instead of manually setting publication dates for each blog post, the system now automatically uses Git commit history to determine when a post was created and last updated.

## Implementation Overview

We implemented a solution that:

1. Extracts Git commit history for each blog file
2. Automatically adds this data to each post's frontmatter
3. Uses manual dates when available (as an override)
4. Displays an indicator when dates come from Git

## Components Created/Modified

### 1. Remark Plugin (`remark-git-dates.mjs`)

This plugin runs during the Markdown processing phase and:

- Gets the first commit date for each file (creation date)
- Gets the last commit date for each file (modification date)
- Adds these to the frontmatter as `gitCreatedDate` and `gitLastModified`

```javascript
import { execSync } from 'child_process';

export function remarkGitDates() {
  return function (tree, file) {
    try {
      const filepath = file.history[0];

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
          firstCommitDate = new Date(parseInt(firstCommitDate) * 1000).toISOString();
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
```

### 2. Content Schema Update (`src/content.config.ts`)

The content schema was updated to:

- Make `pubDate` optional (since we can use Git dates as a fallback)
- Add fields for Git-based dates

```typescript
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // Now optional since we have Git dates as fallback
      pubDate: z.coerce.date().optional(),
      updatedDate: z.coerce.date().optional(),
      // Git-based dates
      gitCreatedDate: z.coerce.date().optional(),
      gitLastModified: z.coerce.date().optional(),
      // ... other fields
    }),
});
```

### 3. Layout Updates

The blog post layout (`BlogPost.astro`) was updated to:

- Use Git dates when manual dates aren't provided
- Show an indicator when dates come from Git
- Gracefully handle missing dates

```astro
---
// Use manual pubDate if available, otherwise use Git created date
const displayPubDate = pubDate || gitCreatedDate;
// Use manual updatedDate if available, otherwise use Git last modified date
const displayUpdatedDate = updatedDate || gitLastModified;
---

<div class="post-meta">
  {
    displayPubDate && (
      <div>
        <FormattedDate date={displayPubDate} />
        {!pubDate && gitCreatedDate && <span class="date-source">(from git)</span>}
      </div>
    )
  }
  <!-- ... other meta info ... -->
</div>
```

### 4. Utility Functions

A new utility function was added to safely format dates:

```typescript
export function safeFormatDate(date: Date | undefined | null, format = 'short'): string {
  if (!date) return '';

  // Convert string to Date if needed
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  // Ensure it's a valid date
  if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
    return '';
  }

  try {
    if (format === 'short') {
      return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } else {
      return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
  } catch (e) {
    console.error('Error formatting date:', e);
    return '';
  }
}
```

### 5. GitHub Actions Updates

The GitHub Actions workflow was updated to fetch full Git history:

```yaml
- name: Checkout repository with full history
  uses: actions/checkout@v4
  with:
    fetch-depth: 0 # Fetch all history for Git dates in blog posts
```

## Testing

To test the Git-based dates functionality, we created a test script (`src/utils/test-git-dates.js`) and a test blog post with no manual dates.

## Benefits

1. **Automation**: No need to manually enter dates for each blog post
2. **Accuracy**: Dates reflect the actual creation and modification times
3. **Flexibility**: Manual dates still take precedence when specified
4. **Transparency**: Clear indication when dates come from Git history

## Usage

### Creating a Post with Git Dates

To create a post that uses Git dates, simply omit the `pubDate` field:

```markdown
---
title: 'New Post'
description: 'A post that uses Git dates'
heroImage: 'blog-placeholder-5.jpg'
tags: ['example']
---
```

The system will automatically use the Git creation date as the publication date.

### Overriding Git Dates

To override the Git dates, simply specify the manual dates in frontmatter:

```markdown
---
title: 'New Post'
description: 'A post with manual dates'
pubDate: 'Apr 01 2024'
updatedDate: 'Apr 15 2024'
heroImage: 'blog-placeholder-5.jpg'
tags: ['example']
---
```

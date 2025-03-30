---
title: 'Git Date Test'
description: 'A test post to verify Git-based dating functionality'
heroImage: 'blog-placeholder-5.jpg'
tags: ['testing', 'git']
---

This is a test post to verify that our Git-based dating functionality works correctly.

Since this post has no manual `pubDate` or `updatedDate` in the frontmatter, the blog should use the Git creation date for this file as the publication date.

You should see "(from git)" next to the date at the top of this post, indicating that the displayed date comes from Git history rather than being manually specified.

## What we implemented

1. A Remark plugin that extracts Git dates for each content file:
   - Creation date (from first commit)
   - Last modified date (from most recent commit)

2. Updated content schema to support Git-based dates

3. Modified blog templates to:
   - Use Git dates when manual dates aren't available
   - Indicate when dates come from Git
   - Sort posts correctly with either source of dates

4. Updated GitHub Actions workflow to fetch complete Git history

This approach gives you the best of both worlds:
- Automatic dates from Git history when available
- The ability to override with manual dates when needed

## Benefits

- Reduced maintenance - no need to manually update dates
- Historical accuracy - dates reflect actual work timeline
- Flexibility - manual dates still take precedence when needed 
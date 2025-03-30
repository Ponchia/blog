---
title: 'Git-Based Dates Demo'
description: 'Testing automatic date generation from Git commit history'
heroImage: 'blog-placeholder-3.jpg'
tags: ['demo', 'git-dates']
---

## Testing Git-Based Dates

This post was created specifically to demonstrate the Git-based dates functionality. Since I've deliberately omitted the `pubDate` and `updatedDate` fields from the frontmatter, the blog should automatically use:

- The first Git commit date as the publication date
- The most recent Git commit date as the last modified date

You should see "(from git)" displayed next to the dates at the top of this post.

## How It Works

The Git-based dates system uses:

1. A custom remark plugin that extracts commit history for each file
2. Automatic fallback to Git dates when manual dates aren't specified
3. Visual indicators showing which dates come from Git

## Benefits

- **Automation**: No need to manually set dates
- **Historical accuracy**: Dates reflect actual file history
- **Flexibility**: Manual dates still take precedence when needed 
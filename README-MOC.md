# Map of Content (MOC) Implementation for Astro Blog

This document provides an overview of the Map of Content (MOC) implementation for an Astro blog. The implementation includes utilities for organizing content, a map view showing MOC hierarchy, and a graph visualization for exploring connections between content.

## Overview

A Map of Content (MOC) is an organizational structure that helps connect related content in a way that goes beyond traditional hierarchies. It's inspired by Personal Knowledge Management (PKM) systems like Zettelkasten and provides a way to discover connections between ideas and content.

This implementation includes:

1. **Content Organization System** - Schema and utilities for organizing content with MOCs
2. **Map View** - A hierarchical view of MOCs and associated content
3. **Graph Visualization** - Interactive graph visualization showing relationships between content
4. **Navigation System** - Integration with the blog to enable navigation through MOCs and related content

## File Structure

```
src/
├── components/
│   └── GraphView.jsx       # React component for graph visualization
├── pages/
│   ├── map.astro           # Map view page showing MOC hierarchy
│   ├── graph.astro         # Graph visualization page
│   ├── mocs/
│   │   └── [slug].astro    # Dynamic route for individual MOC pages
│   └── tags/
│       └── [tag].astro     # Dynamic route for tag pages
└── utils/
    ├── moc-utils.ts        # Utility functions for working with MOCs
    └── graph-data.ts       # Utility functions for generating graph data
```

## Content Schema

The implementation extends the blog post schema with the following fields:

- `mocs`: Array of MOC names this post belongs to
- `related`: Array of related post slugs
- `tags`: Array of tags for categorization
- `status`: Status of the post (e.g., 'evergreen', 'fleeting')

## Using MOCs in Your Content

To add a post to a MOC, include the `mocs` field in your post frontmatter:

```markdown
---
title: 'Getting Started with Astro'
pubDate: 2022-07-01
description: 'A guide to getting started with Astro'
mocs: ['Getting Started', 'Tutorials']
related: ['second-post']
tags: ['astro', 'blogging']
status: 'evergreen'
---
```

## Features

### Map View

The map view (`/map`) shows a hierarchical representation of all MOCs and their associated posts. MOCs are sorted by post count to highlight the most active topics.

### Graph Visualization

The graph view (`/graph`) provides an interactive visualization of the connections between posts, MOCs, and tags. It uses the Force Graph library to create a force-directed graph where:

- **Nodes** represent posts, MOCs, and tags
- **Links** represent relationships between nodes (belongs to MOC, related to post, has tag)

Node colors indicate type:

- Blue: Posts
- Green: MOCs
- Orange: Tags

Node sizes vary based on importance (number of connections).

### MOC Pages

Each MOC has a dedicated page (`/mocs/[slug]`) that lists all posts within that MOC and provides navigation options.

### Tag Pages

Each tag has a dedicated page (`/tags/[tag]`) that lists all posts with that tag and provides navigation options.

## Implementation Notes

- The graph visualization is implemented as a client-side React component using the Force Graph library.
- MOC and tag data is generated at build time using Astro's static site generation.
- For demonstration purposes, the implementation includes mock data for MOCs, tags, and related posts.

## Future Enhancements

- **Search functionality** - Add search to find content across MOCs and tags
- **Filter options** - Add filters to the graph visualization to focus on specific node types
- **Enhanced analytics** - Add metrics to identify central content nodes and clusters
- **User-defined collections** - Allow users to create their own collections of content

## Getting Started

1. Navigate to `/map` to see the MOC hierarchy
2. Click on a MOC to see associated posts
3. Navigate to `/graph` to explore the content graph
4. Interact with the graph to discover connections between content

## Dependencies

- Astro
- React (for the graph visualization component)
- Force Graph library

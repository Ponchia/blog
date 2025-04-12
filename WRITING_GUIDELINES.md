# Writing Guidelines for Blog Articles

This document outlines the guidelines and best practices for writing articles on this technical blog. These guidelines are designed to maintain consistency, quality, and privacy while building a valuable knowledge base.

## Core Principles

### 1. Privacy and Anonymity

- Never include personal identifying information in articles
- Avoid references to specific companies, clients, or projects that could identify you
- When discussing work experiences, generalize and anonymize the context
- Use neutral pronouns and avoid personal anecdotes that could reveal identity
- Strip metadata from any included images or files

### 2. Technical Accuracy

- Focus on technical accuracy and verifiable information
- Include code examples that are tested and working
- Document any prerequisites or dependencies clearly
- Version information should be explicit (e.g., "React 18.2.0" not just "React")
- Link to official documentation and reliable sources

### 3. Knowledge Base Structure

- Articles should be self-contained but interconnected
- Use frontmatter tags and MOCs (Maps of Content) for organization
- Link related articles using the `related` frontmatter field
- Maintain evergreen content when possible, clearly date temporal content
- Build on previous articles to create a cohesive knowledge network

## Article Structure

### Frontmatter

```yaml
---
title: 'Descriptive Title'
description: 'Clear, concise description of the article content'
pubDate: 'MMM DD YYYY'
heroImage: '/blog/path-to-image.jpg' # Optional
mocs: ['Category1', 'Category2'] # Optional
tags: ['tag1', 'tag2', 'tag3'] # Required
status: 'evergreen' # Optional: 'evergreen' or 'temporal'
related: ['article-slug-1'] # Optional
---
```

### Content Sections

1. **Introduction**

   - Clear problem statement or topic introduction
   - Why this is important/relevant
   - What the reader will learn

2. **Prerequisites** (if applicable)

   - Required knowledge
   - Required tools/software
   - Version information

3. **Main Content**

   - Logical progression of concepts
   - Code examples with explanations
   - Visual aids (diagrams, charts) when helpful
   - Step-by-step instructions where appropriate

4. **Conclusion**
   - Summary of key points
   - Next steps or related topics
   - References and further reading

## Writing Style

### Voice and Tone

- Keep the content professional but approachable
- Use a conversational tone when appropriate
- Include relevant analogies to explain complex concepts
- Add thoughtful humor where it enhances understanding
- Share genuine enthusiasm for technical topics

Examples of engaging writing:

✅ Good:

```
Ever tried to debug a race condition? It's like trying to catch a butterfly while
riding a unicycle - tricky, unpredictable, and slightly amusing when things go wrong.
But fear not! Let's explore some practical techniques to tame these elusive bugs...
```

❌ Too formal:

```
This article will discuss the methodologies for identifying and resolving race
conditions in concurrent systems...
```

❌ Too casual:

```
OMG race conditions are the worst! They make me want to throw my keyboard out
the window! 😭 Let's fix this mess...
```

### Making Technical Content Engaging

1. **Use Relatable Metaphors**

   - Compare complex concepts to everyday experiences
   - Use visual analogies that readers can easily grasp
   - Keep metaphors culturally neutral and technically accurate

2. **Tell a Story**

   - Frame problems as journey of discovery
   - Share the thought process behind solutions
   - Include "aha!" moments that led to understanding

3. **Add Personality Without Compromising Professionalism**

   - Use occasional witty comments in code comments
   - Include relevant cultural references when they help explain concepts
   - Share genuine excitement about elegant solutions

4. **Break Up Heavy Content**

   - Insert relevant memes or technical humor where appropriate
   - Use emojis sparingly and purposefully
   - Include interesting asides in blockquotes

5. **Keep Readers Engaged**
   - Ask thought-provoking questions
   - Challenge readers to think about alternative approaches
   - Include "What would you do?" scenarios

### Examples of Engaging Elements

```typescript
// Instead of:
function processData(data: any[]) {
  // Implementation here
}

// Try:
function processData(data: any[]) {
  // Buckle up! We're about to transform this data faster
  // than you can say "O(n log n)"
  // Pro tip: Keep a cup of coffee nearby, we'll need it...
}
```

> 💡 Pro tip: Sometimes the most elegant solution isn't the most practical.
> Just like how a perfect single-page application sounds great until you
> realize your users are still waiting for that 5MB JavaScript bundle to load!

### Interactive Components

When creating interactive content:

1. **React Components**
   - Prefer React components for interactive features
   - Use client directives appropriately (`client:load`, `client:visible`)
   - Consider code splitting for better performance
   - Implement proper error boundaries

```tsx
// Example of an interactive component
import { useState } from 'react';

function InteractiveDemo({ initialData }) {
  const [data, setData] = useState(initialData);

  // Add error boundary wrapper in actual implementation
  return <div className="demo-container">{/* Your interactive content */}</div>;
}
```

2. **Visualization Components**

   - Use web-native libraries (D3.js, Chart.js, etc.)
   - Ensure responsive design for all screen sizes
   - Provide fallback static images
   - Consider accessibility (aria labels, keyboard navigation)

3. **Performance Considerations**
   - Lazy load heavy components
   - Implement loading states
   - Consider server-side rendering where appropriate
   - Monitor bundle size impact

Example of a well-structured interactive component:

```tsx
import { Suspense, lazy } from 'react';
import LoadingSpinner from './LoadingSpinner';

const HeavyVisualization = lazy(() => import('./HeavyVisualization'));

function VisualizationWrapper() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HeavyVisualization />
    </Suspense>
  );
}
```

4. **Testing Interactive Features**
   - Test across different browsers and devices
   - Verify performance on slower connections
   - Ensure graceful degradation
   - Test with keyboard navigation

For specialized use cases (like Python with PyScript), include additional setup instructions and performance considerations as needed, but prefer web-native solutions when possible.

## Privacy-Conscious Content

### Do's

- Use generic examples
- Focus on technical concepts
- Reference public documentation
- Use sample data and placeholder names

### Don'ts

- Include real user data
- Reference internal systems
- Share proprietary code
- Include screenshots with sensitive info

## SEO and Discoverability

- Use descriptive titles that include key technical terms
- Write meaningful descriptions for search engines
- Use appropriate tags for categorization
- Include relevant code keywords
- Structure content with proper headings (h1, h2, etc.)

## Maintenance

- Review and update articles periodically
- Mark outdated content clearly
- Update version information when necessary
- Fix broken links and outdated references
- Maintain consistent formatting across articles

## Tools and Resources

### Recommended Tools

- Markdown editor with preview
- Code formatter for snippets
- Image optimization tools
- Diagram creation tools (Mermaid)

### Useful Resources

- [Astro Documentation](https://docs.astro.build/)
- [MDX Documentation](https://mdxjs.com/)
- [PyScript Documentation](https://docs.pyscript.net/)

## Quality Checklist

Before publishing, ensure your article:

- [ ] Follows privacy guidelines
- [ ] Contains tested, working code examples
- [ ] Includes appropriate tags and MOCs
- [ ] Has clear structure and formatting
- [ ] Links to related articles
- [ ] Includes references where appropriate
- [ ] Has been spell-checked and proofread
- [ ] Works correctly with the blog's base path
- [ ] Renders correctly in both light and dark themes

## Contribution Process

1. Create new article in `src/content/blog/`
2. Follow frontmatter template
3. Write content following these guidelines
4. Test locally using `npm run dev`
5. Build and preview using `npm run build` and `npm run preview`
6. Commit using conventional commit format
7. Deploy when ready

Remember: This blog serves as both a personal knowledge base and a resource for others. Each article should provide clear value and maintain high technical standards while preserving anonymity.

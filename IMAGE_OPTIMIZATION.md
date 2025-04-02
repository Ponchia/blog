# Image Optimization Guide

This document explains how image optimization works in this Astro blog project and how to use it effectively.

## Overview

This blog uses Astro's built-in image optimization capabilities and the Sharp library to:
- Convert images to modern formats (WebP, AVIF)
- Reduce image file sizes while maintaining quality
- Improve page load times and performance

## Using the OptimizedImage Component

For optimal image performance, use the `OptimizedImage` component in your Astro and MDX files:

```jsx
import OptimizedImage from '../components/OptimizedImage.astro';

<OptimizedImage 
  src="/path/to/image.jpg"
  alt="Description of image"
  width={800}
  height={600} 
  format="webp"
  class="your-custom-classes"
/>
```

### Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` or `ImageMetadata` | (required) | Path to image or imported image asset |
| `alt` | `string` | (required) | Alt text for accessibility |
| `width` | `number` | original | Width in pixels |
| `height` | `number` | original | Height in pixels |
| `format` | `"webp"`, `"avif"`, `"png"`, `"jpeg"` | `"webp"` | Output format |
| `class` | `string` | `""` | CSS classes |
| `loading` | `"lazy"`, `"eager"` | `"lazy"` | Image loading strategy |
| `decoding` | `"async"`, `"sync"`, `"auto"` | `"async"` | Image decoding strategy |

## Image Assets

### Option 1: Public Directory Images

Images in the `public` directory are served directly and can be referenced with a forward slash:

```jsx
<OptimizedImage 
  src="/blog-placeholder-1.jpg" 
  alt="Example image" 
/>
```

### Option 2: Imported Images (Recommended)

For better optimization, import images from the `src/assets` directory:

```jsx
import myImage from '../assets/images/my-image.jpg';

<OptimizedImage 
  src={myImage} 
  alt="Example image" 
/>
```

This method lets Astro handle the optimization and includes the image in the build process.

## Batch Image Optimization

To convert your existing images to WebP and AVIF formats:

```bash
npm run optimize-images
```

This script:
1. Scans the `public` directory for image files
2. Converts them to WebP and AVIF formats
3. Preserves the original files
4. Saves all versions to `src/assets/images`

After running the script, update your image imports to use the new optimized versions from the assets directory.

## Configuration

Image optimization is configured in `astro.config.mjs`:

```javascript
// astro.config.mjs
export default defineConfig({
  // ...other config
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        quality: 80,
        format: ['webp', 'avif', 'png', 'jpeg'],
        gif: { lossless: false },
        svg: { optimization: true }
      }
    },
  },
});
```

You can adjust these settings to balance quality and file size according to your needs.

## Performance Benefits

Using optimized images provides several benefits:

- **Smaller file sizes**: WebP is typically 25-34% smaller than JPEG, AVIF up to 50% smaller
- **Faster page loads**: Reduced file sizes mean faster downloads
- **Better SEO**: Page speed is a ranking factor for search engines
- **Lower bandwidth consumption**: Save your users' data

## Browser Support

- WebP: ~95% of browsers (all modern browsers)
- AVIF: ~70% of browsers (Chrome, Firefox, Opera)

The OptimizedImage component serves the most optimal format supported by the user's browser.

## Best Practices

1. **Always provide width and height**: This prevents layout shifts during loading
2. **Use appropriate image sizes**: Don't serve large images for small displays
3. **Use descriptive alt text**: Important for accessibility
4. **Consider lazy loading**: Use `loading="lazy"` for below-the-fold images
5. **Update image references**: After batch optimization, update references to use assets

## Troubleshooting

If you encounter issues:

1. **Check Sharp installation**: Make sure Sharp is properly installed (`npm install sharp`)
2. **Verify file paths**: Ensure image paths are correct
3. **Check for errors**: Look for console errors during development or build
4. **Image format support**: Some browsers may not support AVIF

## Contributing

When adding new images to the blog:

1. Consider optimizing them before adding to the repo
2. Place them in `src/assets/images` rather than `public`
3. Use descriptive filenames
4. Document any new image optimization techniques you discover 
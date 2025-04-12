/**
 * remark-optimize-images.mjs
 * A remark plugin that transforms standard Markdown image syntax into OptimizedImage components
 */

import { visit } from 'unist-util-visit';
import { toJs } from 'estree-util-to-js';
import { fromJs } from 'esast-util-from-js';

/**
 * Transforms standard Markdown image syntax into OptimizedImage components
 * @returns {function} The transformer function
 */
export function remarkOptimizeImages() {
  return (tree, file) => {
    // Track if we need to add the import
    let needsImport = false;

    // Transform image nodes to OptimizedImage components
    visit(tree, 'image', (node, index, parent) => {
      needsImport = true;

      // Extract image properties
      const { url: src, alt = '' } = node;

      // Create JSX attributes
      const attributes = [
        { type: 'mdxJsxAttribute', name: 'src', value: src },
        { type: 'mdxJsxAttribute', name: 'alt', value: alt },
        // Add default optimization attributes
        { type: 'mdxJsxAttribute', name: 'format', value: 'webp' },
        { type: 'mdxJsxAttribute', name: 'loading', value: 'lazy' },
      ];

      // Create the JSX element
      const jsxElement = {
        type: 'mdxJsxFlowElement',
        name: 'OptimizedImage',
        attributes,
        children: [],
        data: { _mdxExplicitJsx: true },
      };

      // Replace the image node with the JSX element
      parent.children.splice(index, 1, jsxElement);
    });

    // Add import statement if needed
    if (needsImport && tree.type === 'root') {
      // Create import statement
      const importCode = "import OptimizedImage from '../components/EnhancedOptimizedImage.astro';";
      const importAst = fromJs(importCode, { module: true });

      // Add to the beginning of the document
      tree.children.unshift({
        type: 'mdxjsEsm',
        value: importCode,
        data: { estree: importAst },
      });
    }
  };
}

import React from 'react';
import Giscus from '@giscus/react';

export default function Comments() {
  return (
    <div className="comments-wrapper">
      <h2>Comments</h2>
      <Giscus
        id="comments"
        repo="Ponchia/blog"
        repoId="R_kgDOORDwSQ"
        category="Blog Post Comments"
        categoryId="DIC_kwDOORDwSc4ComQN"
        mapping="url"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme="gruvbox_dark"
        lang="en"
        loading="lazy"
      />
    </div>
  );
} 
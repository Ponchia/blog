<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title><xsl:value-of select="/rss/channel/title"/> RSS Feed</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
            line-height: 1.5;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem 1rem;
          }
          h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
          }
          h2 {
            font-size: 1.75rem;
            margin: 2rem 0 1rem;
          }
          a {
            color: #1E88E5;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          .description {
            margin: 1rem 0 2rem;
            color: #666;
            font-style: italic;
          }
          .item {
            margin-bottom: 3rem;
            padding-bottom: 2rem;
            border-bottom: 1px solid #eee;
          }
          .item-title {
            font-size: 1.5rem;
            margin: 0 0 0.5rem;
          }
          .item-date {
            color: #666;
            margin-bottom: 1rem;
            font-size: 0.9rem;
          }
          .categories {
            margin-top: 1rem;
          }
          .category {
            display: inline-block;
            background: #f0f0f0;
            padding: 0.25rem 0.75rem;
            border-radius: 3px;
            margin-right: 0.5rem;
            margin-bottom: 0.5rem;
            font-size: 0.85rem;
          }
          .footer {
            margin-top: 2rem;
            font-size: 0.85rem;
            color: #666;
          }
          @media (prefers-color-scheme: dark) {
            body {
              background-color: #121212;
              color: #e0e0e0;
            }
            a {
              color: #64B5F6;
            }
            .description, .item-date, .footer {
              color: #aaa;
            }
            .category {
              background: #2d2d2d;
            }
            .item {
              border-bottom-color: #333;
            }
          }
        </style>
      </head>
      <body>
        <h1><xsl:value-of select="/rss/channel/title"/></h1>
        <p class="description">
          <xsl:value-of select="/rss/channel/description"/>
        </p>
        <p>
          This is an RSS feed. To subscribe to it, copy the URL from your browser's address bar and paste it into your RSS reader.
        </p>
        
        <h2>Recent Items</h2>
        <xsl:for-each select="/rss/channel/item">
          <div class="item">
            <h3 class="item-title">
              <a target="_blank">
                <xsl:attribute name="href">
                  <xsl:value-of select="link" />
                </xsl:attribute>
                <xsl:value-of select="title" />
              </a>
            </h3>
            <p class="item-date">
              <xsl:value-of select="pubDate" />
            </p>
            <div>
              <xsl:value-of select="description" />
            </div>
            
            <xsl:if test="category">
              <div class="categories">
                <xsl:for-each select="category">
                  <span class="category">
                    <xsl:value-of select="." />
                  </span>
                </xsl:for-each>
              </div>
            </xsl:if>
          </div>
        </xsl:for-each>
        
        <div class="footer">
          <p>
            RSS feed for <a>
              <xsl:attribute name="href">
                <xsl:value-of select="/rss/channel/link" />
              </xsl:attribute>
              <xsl:value-of select="/rss/channel/title" />
            </a>.
          </p>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet> 
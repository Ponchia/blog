declare module '@pagefind/default-ui' {
  interface SearchResult {
    id: string;
    url: string;
    title: string;
    excerpt: string;
    content: string;
    meta?: Record<string, string>;
  }

  export class PagefindUI {
    constructor(options: {
      element: string;
      bundlePath?: string;
      showImages?: boolean;
      resetStyles?: boolean;
      showSubResults?: boolean;
      autofocus?: boolean;
      sorts?: Record<string, (a: SearchResult, b: SearchResult) => number>;
      processTerm?: (term: string) => string;
      processResult?: (result: SearchResult) => SearchResult;
      debounceTimeoutMs?: number;
      translations?: Record<string, string>;
    });
  }
}

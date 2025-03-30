declare module '@pagefind/default-ui' {
  export class PagefindUI {
    constructor(options: {
      element: string;
      bundlePath?: string;
      showImages?: boolean;
      resetStyles?: boolean;
      showSubResults?: boolean;
      autofocus?: boolean;
      sorts?: Record<string, (a: any, b: any) => number>;
      processTerm?: (term: string) => string;
      processResult?: (result: any) => any;
      debounceTimeoutMs?: number;
      translations?: Record<string, string>;
    });
  }
} 
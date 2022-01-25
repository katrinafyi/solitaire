/// <reference types="svelte" />

import type { Card } from "./logic/store";

declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
      oncardsend?: (event: CustomEvent<Card[]> & { target: EventTarget & T }) => any;
      oncardreceive?: (event: CustomEvent<Card[]> & { target: EventTarget & T }) => any;
  }
}

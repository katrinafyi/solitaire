/// <reference types="svelte" />

import type { Card } from "./logic/store";

declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
      oncarddrop?: (event: CustomEvent<Card[]> & { target: EventTarget & T }) => any;
  }
}

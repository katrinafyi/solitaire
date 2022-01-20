<script context="module" lang="ts">
  import { crossfade } from "svelte/transition";
  import { quintOut } from 'svelte/easing';

  const [send, receive] = crossfade({
    duration: 500,

    fallback(node, params) {
      const style = getComputedStyle(node);
      const transform = style.transform === 'none' ? '' : style.transform;

      return {
        duration: 600,
        easing: quintOut,
        css: t => `
          transform: ${transform} scale(${t});
          opacity: ${t}
        `
      };
    }
  });
</script>

<script lang="ts">
  import type { Rank, Suit } from "../logic/store";

  export let suit: Suit = 'clubs';
  export let rank: Rank = 'A';
  export let blank: boolean = false;

  let _rank: string | number;
  $: _rank = typeof rank == 'number' && rank < 10 ? '0' + rank : rank;

  let key: string;
  $: key = suit + '_' + rank;
</script>

<div
  class="card"
  in:receive="{{key: key}}"
  out:send="{{key: key}}"
>
  {#if !blank}
    <img src="cards/crop/card_{suit}_{_rank}.png" alt="card">
  {/if}
</div>

<style>
  .card {
    height: 33px;
    width: 84px;
  }

  img {
    image-rendering: -moz-crisp-edges;
    image-rendering: -o-crisp-edges;
    image-rendering: pixelated;
    -ms-interpolation-mode: nearest-neighbor;

    height: 120px;
    display: block;
  }
</style>

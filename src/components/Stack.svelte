<script context="module" lang="ts">
  import { crossfade } from "./crossfade";
  import { quintOut } from 'svelte/easing';

  const [send, receive] = crossfade({
    duration: 500,
  });

  function cardKey(card: CardType | undefined): string {
    if (!card) {
      return '(null)';
    }
    const { rank, suit } = card;
    const rank2 = typeof rank == 'number' && rank < 10 ? '0' + rank : rank;
    return suit + '_' + rank2;
  }
</script>

<script lang="ts">
  import type { Card as CardType } from '../logic/store';

  export let cards: CardType[];
  export let index: number = 0;

  $: console.assert(0 <= index && index <= cards.length);

  let key: string;
  $: key = cardKey(cards[index]);

  let prev: string;
  $: prev = cardKey(cards[index-1]);
</script>

<div
  class="stack"
>
  {#if index < cards.length}
  <div
    class="card"
    in:receive="{{key: key}}"
    out:send="{{key: prev}}"
  >
    <img src="cards/crop/card_{key}.png" alt="card">
  </div>
  <svelte:self {cards} index={index+1}></svelte:self>
  {/if}
</div>

<style>
  .stack {
    background-color: green;
    width: 84px;
    height: fit-content;
  }

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

<script context="module" lang="ts">
  import { crossfade } from "./crossfade";
  import { dragMoveListener } from "../logic/drag";
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

  interact('.stack.notBottom').draggable({
    inertia: true,
    autoScroll: true,
    listeners: {
      start: (event) => {
        // console.log(event.type, event.target)
      },
      move: dragMoveListener,
      // end: (event) => {
      //   const el = event.target;
      //   el.style.zIndex = null;
      //   el.style.transform = null;

      //   delete el.dataset.shift;
      // }
    }
  });

  interact('.stack.bottom').dropzone({
    ondrop: (event) => {
      const dragged = event.relatedTarget;
      const el = event.target;
      console.log('drop', dragged, 'onto', el);
    }
  })
</script>

<script lang="ts">
  import type { Card as CardType } from '../logic/store';
  import { onMount } from "svelte";
  import interact from 'interactjs';

  export let cards: CardType[];
  export let index: number = 0;

  $: console.assert(0 <= index && index <= cards.length);

  let isBot: boolean;
  $: isBot = index == cards.length;

  let key: string;
  $: key = cardKey(cards[index]);

  let prev: string;
  $: prev = cardKey(cards[index-1]);

  let data: string;
  $: data = JSON.stringify(cards.slice(index));
</script>

<div
  class="stack"
  class:notBottom={!isBot}
  class:bottom={isBot}
  data-cards={data}
>
  {#if !isBot}
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

    touch-action: none;
    user-select: none;
  }

  .stack.bottom {
    height: calc(120px - 33px);
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

<script context="module" lang="ts">
  import interact from 'interactjs';

  import { crossfade } from "./crossfade";
  import { dragMoveListener, dragMoveReset } from "../logic/drag";

  const [send, receive] = crossfade({
    duration: 500,
  });

  function cardKey(card: Card | undefined): string {
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
      move: dragMoveListener,
      end: (e: Interact.InteractEvent) => {
        dragMoveReset(e);

        if (e.dropzone) {
          e.target.dispatchEvent(
            new CustomEvent('cardsend', { detail: JSON.parse(e.target.dataset.cards!) }));
        }
      },
    }
  });

  interact('.stack.bottom').dropzone({
    ondrop: (event) => {
      const dragged = event.relatedTarget;
      const el = event.target;
      console.log('drop', dragged, 'onto', el);

      const detail = JSON.parse(dragged.dataset.cards);
      setTimeout(
        () => el.dispatchEvent(
          new CustomEvent('cardreceive', { detail })),
        0);
    }
  })
</script>

<script lang="ts">
  import '../logic/drag';
  import type { Card } from '../logic/store';


  export let index: number = 0;
  export let cards: Card[];
  export let set: (f: (cards: Card[]) => Card[]) => void = () => null;

  $: console.assert(0 <= index && index <= cards.length, index, cards);

  let isBot: boolean;
  $: isBot = index >= cards.length;

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
  on:cardsend={(e) => {
    console.log("cardsend", e);
    set(cs => cs.slice(0, -e.detail.length));
  }}
  on:cardreceive={(e) => {
    console.log("oncarddrop", e);
    set(cs => [...cs, ...e.detail]);
  }}
>
  {#if !isBot}
  <div
    class="card"
    in:receive="{{key: key}}"
    out:send="{{key: key}}"
  >
    <!--  -->
    <img src="cards/crop/card_{key}.png" alt="card">
  </div>
  <svelte:self {cards} {set} index={index+1}></svelte:self>
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

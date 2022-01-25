<script context="module" lang="ts">
  import interact from 'interactjs';

  import { crossfade } from "./crossfade";
  import { dragMoveListener } from "../logic/drag";

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
      end: (event) => {
        const el = event.target;
        el.style.zIndex = null;
        el.style.transform = null;

        delete el.dataset.shift;
      }
    }
  });

  interact('.stack.bottom').dropzone({
    ondrop: (event) => {
      const dragged = event.relatedTarget;
      const el = event.target;
      console.log('drop', dragged, 'onto', el);

      el.dispatchEvent(new CustomEvent('carddrop', { detail: JSON.parse(dragged.dataset.cards) }));
    }
  })
</script>

<script lang="ts">
  import type { Lens } from 'monocle-ts/lib/Lens';

  import '../logic/drag';
  import { Card as CardType, GameState, store } from '../logic/store';


  export let index: number = 0;
  export let lens: Lens<GameState, CardType[]>;

  let cards: CardType[];
  $: cards = lens.get($store);

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
  on:carddrop={(e) => {
    console.log("oncarddrop", e);
    cards = [...cards, e.detail]
  }}
>
  {#if !isBot}
  <div
    class="card"
    in:receive="{{key: key}}"
    out:send="{{key: prev}}"
  >
    <img src="cards/crop/card_{key}.png" alt="card">
  </div>
  <svelte:self {lens} index={index+1}></svelte:self>
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

<script lang="ts">
  import Stack from "./Stack.svelte";
  import { Card, GameState, store, Tuple9, Tuple9Index } from '../logic/store';
  import { forceOptional } from '../logic/lens';

  import { Lens as L } from "monocle-ts";
  import { component, index } from 'monocle-ts/Lens';
  import { indexArray } from 'monocle-ts/Index/Array';

  $: {
    if ($store.deck.length > 0) {
      setTimeout(store.dealOne, 100);
    }
  }

  const deck_ = L.fromProp<GameState>()('deck');
  const stacks_ = L.fromProp<GameState>()('stacks');
  const stack_ = (n: number) =>
    component<Tuple9<Card[]>, Tuple9Index>(n as Tuple9Index)(stacks_);
</script>

<div id="game">
  Solitaire
  <div id="board">
    {#each $store.stacks as stack, i}
      <div class="stackContainer">
        <Stack index={0} lens={stack_(i)}></Stack>
      </div>
    {/each}
  </div>

  <Stack lens={deck_}></Stack>
</div>

<style>
  #game {
    background-color: blue;
  }

  #board {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  .stackContainer {
    margin: 10px;
  }
</style>

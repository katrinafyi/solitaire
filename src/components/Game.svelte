<script lang="ts">
  import Stack from "./Stack.svelte";
  import { store } from '../logic/store';

  $: {
    if ($store.deck.length > 0) {
      setTimeout(store.dealOne, 200);
    }
  }
</script>

<div id="game">
  Solitaire
  <div id="board">
    {#each $store.stacks as stack}
      <Stack cards={stack} index={0}></Stack>
    {/each}
  </div>

  <Stack cards={$store.deck}></Stack>
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
</style>

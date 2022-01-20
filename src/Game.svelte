<script lang="ts">
import Stack from "./Stack.svelte";

  let stacks: number[] = [1,2,3,4,5,6,7,8,9];
</script>

<div id="game">
  Solitaire
  <div id="board">
    {#each stacks as stack}
      <Stack></Stack>
    {/each}
  </div>
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

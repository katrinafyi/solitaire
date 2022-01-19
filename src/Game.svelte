<script lang="ts">
import Card from "./Card.svelte";

  let stacks: number[] = [1,2,3,4,5,6,7,8,9,10];
</script>

<div id="game">
  Solitaire
  <div id="board">
    {#each stacks as stack}
      <div class="stack">
        <Card></Card>
      </div>
    {/each}
  </div>
</div>

<style>
  #game {
    background-color: red;
  }

  #board {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  .stack {
    /* margin: 10px; */
    background-color: green;
  }
</style>

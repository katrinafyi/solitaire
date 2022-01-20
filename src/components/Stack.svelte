<script lang="ts">
  import Card from './Card.svelte';

  import type { Card as CardType } from '../logic/store';

  export let cards: CardType[];
</script>

<div class="stack">
  {#each cards as { suit, rank }}
    <Card rank={rank} suit={suit}></Card>
  {/each}
  <Card blank={true}></Card>
</div>

<style>
  .stack {
    margin: 10px;
    background-color: green;

    height: fit-content;
  }
</style>

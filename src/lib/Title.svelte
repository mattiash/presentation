<script>
  export let title = "";
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<div class="title">
  <div class="spacer" />
  <h1>{title}</h1>
  <slot />
  <div class="spacer" />
</div>

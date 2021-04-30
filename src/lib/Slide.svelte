<script>
  export let n;
  import { activeSlide, overview, animate } from "./stores.js";
  let num;
  let translateX;
  let translateY;
  let transform;
  let slideElem;

  $: {
    num = parseInt(n);
    const f = 111.111
    translateX = 11.111/2 + [0, f, 2*f][(num - 1) % 3];
    translateY = 11.111 + f * Math.floor((num - 1) / 3);
    transform = `scale(0.3) translate(${translateX}%, ${translateY}%)`;
  }

  function click() {
    activeSlide.update(() => parseInt(num));
    overview.update(() => false);
  }

  overview.subscribe( v => {
    if(v && num === $activeSlide) {
      setTimeout( () => slideElem.scrollIntoView({behavior: 'smooth', block: 'center'}), 450)
    }
  })

  activeSlide.subscribe( v => {
    if($overview && num === v) {
      slideElem.scrollIntoView({behavior: 'smooth', block: 'center'})
    }

  })
</script>

<style>
  .slide-container {
    transform-origin: left top;
  }
</style>

<div
  class="slide-container"
  class:left={!$overview && $activeSlide > num}
  class:right={!$overview && $activeSlide < num}
  class:visible={!$overview && $activeSlide === num}
  class:selected={$overview && $activeSlide === num}
  class:animate={$animate}
  style={$overview ? `transform: ${transform}` : ''}
  on:click={click}
  bind:this={slideElem}
  >
  <div class="slide">
    <slot />
    <div />
  </div>
</div>

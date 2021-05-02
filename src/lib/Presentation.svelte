<script>
  import { browser } from '$app/env'
  export let slides;
  import { activeSlide, overview, comment, animate, initHashUpdate } from "./stores.js";
  import { openFullscreen } from "./fullscreen.js";
  import {onMount} from 'svelte'

  $: numSlides = parseInt(slides);

  // BroadcastChannel does not work on Safari
  let chan
  
  onMount( () => {
    chan = new BroadcastChannel('svelte-deck')
    chan.onmessage = (event) => activeSlide.update(() => event.data)
    const [initSlide, initComment] = window.location.hash.substr(1).split(',');
    activeSlide.update( () => parseInt(initSlide) || 1)
    comment.update( () => initComment === 'true')
    initHashUpdate()

  })

  function handleKeydown(event) {
    if (event.key === "ArrowRight") {
      activeSlide.update(n => Math.min(n + 1, numSlides));
    } else if (event.key === "ArrowLeft") {
      activeSlide.update(n => Math.max(1, n - 1));
    } else if ($overview && event.key === "ArrowDown") {
      activeSlide.update(n => Math.min(n + 3, numSlides));
    } else if ($overview && event.key === "ArrowUp") {
      activeSlide.update(n => Math.max(1, n - 3));
    } else if (event.key === "o") {
      overview.update(v => !v);
    } else if ($overview && event.key === "Enter") {
      overview.update(v => false);
    }
    else if (event.key === 'a' ) {
      animate.update(v => !v)
    }
    else if (event.key === 'c' ) {
      comment.update(v => !v)
    }
    else if (event.key === 'f' ) {
      openFullscreen()
    }
    else {
      return
    }

    event.preventDefault()
  }

  overview.subscribe(v => {
    if (v) {
      browser && document.body.classList.add("overview");
    } else {
      browser && document.body.classList.remove("overview");
    }
  });

  comment.subscribe(v => {
    if (v) {
      browser && document.body.classList.add("comment");
    } else {
      browser && document.body.classList.remove("comment");
    }
  });

  activeSlide.subscribe( v => {
    chan && chan.postMessage(v)
  });

</script>

<svelte:window on:keydown={handleKeydown} />
<slot />

import { browser } from '$app/env';
import { writable } from 'svelte/store';

export const activeSlide = writable(1);
export const overview = writable(false);
export const comment = writable(false);
export const animate = writable(true);

let currComment;
let currSlide;

export function initHashUpdate() {
	comment.subscribe((v) => {
		currComment = v;
		updateLocationParams();
	});

	activeSlide.subscribe((v) => {
		currSlide = v;
		updateLocationParams();
	});
}

function updateLocationParams() {
	if (browser) {
		window.location.hash = `${currSlide},${currComment}`;
	}
}

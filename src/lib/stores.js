import { writable } from 'svelte/store';

// const [initSlide, initComment] = window.location.hash.substr(1).split(',');
const initSlide = '1';
let initComment = 'false';

export const activeSlide = writable(parseInt(initSlide) || 1);
export const overview = writable(false);
export const comment = writable(initComment === 'true');
export const animate = writable(true);

let currComment;
let currSlide;

function updateLocationParams() {
	// if (window) {
	// 	window.location.hash = `${currSlide},${currComment}`;
	// }
}

comment.subscribe((v) => {
	currComment = v;
	updateLocationParams();
});

activeSlide.subscribe((v) => {
	currSlide = v;
	updateLocationParams();
});

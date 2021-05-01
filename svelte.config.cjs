const preprocess = require('svelte-preprocess');
const { logger, mdsvDeck } = require('./util/mdsv-processor.cjs');

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	extensions: ['.svelte', '.md'],
	preprocess: [
		mdsvDeck(),
		// logger(),
		preprocess({
			postcss: true
		})
	],

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
		// ssr: false
	}
};

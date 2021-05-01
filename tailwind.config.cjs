module.exports = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			screens: {
				print: { raw: 'print' },
				screen: { raw: 'screen' }
			}
		}
	},
	plugins: []
};

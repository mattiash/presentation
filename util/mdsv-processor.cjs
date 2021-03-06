const { markdown, Renderer } = require('svelte-preprocess-markdown');
const renderer = Renderer();

const imports = `
import Presentation from "$lib/Presentation.svelte";
import Slide from "$lib/Slide.svelte";
import Image from "$lib/Image.svelte";
import Title from "$lib/Title.svelte";
import Section from "$lib/Section.svelte";
`;

let slide = 0;

// Wrap tables in an extra div to avoid them
// using full page width.
renderer.tableOrg = renderer.table;
renderer.table = (head, body) => '<div class="table">' + renderer.tableOrg(head, body) + '</div>';

// Wrap code in {`...`} to avoid svelte trying to parse it as code
renderer.codeOrg = renderer.code;
renderer.code = (code, infostring, escaped) => {
	const org = renderer.codeOrg(code, infostring, escaped);
	// Log org here if you ever want to change this...
	return org.replace('<code>', '<code>{`').replace('</code>', '`}</code>');
};
renderer.hr = () => `</Slide>\n<Slide n="${slide++}">`;
renderer.image = (href, title, text) => `<Image href="${href}" text="${text}"></Image>`;
renderer.heading = (text, number) => {
	switch (number) {
		case 1:
			return `<Title title="${text}">`;
		case 2:
			let className = '';
			let titleText = text;
			if (text.startsWith('!')) {
				[, className, titleText] = text.match(/^!(\S+) (.*)/);
			}
			return `<Section class="${className}">${titleText}</Section>`;
		default:
			return `<h${number}>${text}</h${number}>`;
	}
};

renderer.paragraph = (text) => {
	if (text.startsWith('::')) {
		const comment = text.slice(2);
		return comment
			.split('\n')
			.map((t) => `<p class="comment">${t}</p>`)
			.join('');
	} else {
		return `<p>${text}</p>`;
	}
};

function logger(prefix) {
	return {
		markup: ({ content, filename }) => {
			if (filename.endsWith('.md')) {
				console.log(`=== ${prefix} markup ${filename}\n${content}\n`);
				return {
					code: content
				};
			}
		}
		// script: ({ content }) => {
		//     console.log(`=== ${prefix} script\n${content}\n`)
		//     return {
		//         code: content
		//     };
		// },
		// style: ({ content }) => {
		//     console.log(`=== ${prefix} style\n${content}\n`)
		//     return {
		//         code: content
		//     };
		// }
	};
}

function mdsvDeck() {
	const md = markdown({ renderer });
	return {
		markup: ({ content, filename }) => {
			if (filename.endsWith('.md')) {
				slide = 2;
				const mdresult = md.markup({ content, filename });
				let mdHtml = mdresult.code;

				// Make Image a direct child of Slide
				mdHtml = mdHtml.replace(/<p><Image/g, '<Image');
				mdHtml = mdHtml.replace(/<\/Image><\/p>/g, '</Image>');

				mdHtml = mdHtml.replace(/<script/, '</Slide>\n</Presentation><script');

				// Close Title tags at end of slide
				mdHtml = mdHtml.replace(/(<Title.*?)<\/Slide/gs, '$1</Title></Slide');

				let html = `<Presentation slides="${slide - 1}">\n<Slide n="1">` + mdHtml;

				if (html.match(/<script>/)) {
					// There is already an instance-level script. Amend it.
					html = html.replace(/<script>/, `<script>${imports}`);
				} else {
					// There is no instance-level script. Add one.
					html = html + `<script>${imports}</script>`;
				}
				return {
					code: html
				};
			} else {
				return {
					code: content
					// More properties?
				};
			}
		}
	};
}

module.exports = { logger, mdsvDeck };

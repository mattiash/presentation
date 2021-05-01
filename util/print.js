import puppeteer from 'puppeteer';

console.log();

async function run() {
	const paths = import.meta.url.split('/');
	const pres = paths[paths.length - 3];
	console.log(pres);
	const today = new Date().toISOString().substr(0, 10);

	const output = new URL(`../${pres}_${today}.pdf`, import.meta.url);
	console.log(`Generating ${output.pathname}`);
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
	await page.pdf({
		path: output.pathname,
		format: 'A4',
		// headerTemplate: '',
		// footerTemplate: '',
		landscape: true,
		printBackground: true
		// scale: 0.5
	});

	await browser.close();
}

run();

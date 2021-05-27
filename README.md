# presentation template

## Usage

npx degit @mattiash/presentation my-presentation
npm install
npm run dev

Now edit src/routes/index.md

## Generate pdf

With `npm run dev` running, run `node util/print.js`.
Or simply print the presentation from the browser,
but remember to print backgrounds but not header/footer.

## Images

Place images in `static/images`. Reference them as `images/...`.

By default, images take up all available space.
To make images smaller, add a class s-1/2, s-1/3, s-1/4 as the text for the image:

```
![s-1/2](images/test.png)
```

## Drawio

Run `npm run drawio-watch` to generate svgs from each tab in a file named `$npm_package_name.drawio`.
The images can be referenced as `drawio/(name of tab).svg`.

## Keyboard

- f - Enter fullscreen
- Arrow left / right - Previous / Next slide
- Home / End - First / Last slide
- o - Overview mode
- c - Toggle Comments (Speaker notes)
- a - Toggle animations (slide transitions) on/off

## Speaker notes

Prefix text paragraph with `::` to turn it into a comment for speaker notes

If you open several browser windows with the same presentation,
slide selection will be synchronized across windows.

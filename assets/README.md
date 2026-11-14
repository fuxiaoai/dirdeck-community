# Product artwork and screenshot provenance

The bilingual community homepage follows the reviewed website narrative and canonical screenshots at [`dirdeck-web@9d8faa1`](https://github.com/fuxiaoai/dirdeck-web/commit/9d8faa17ac5c7d86dbd2c5db147d699112d35f45). It presents product tasks, not a release announcement. The application source is not hosted here.

## Screenshots

`sources.json` records the exact website commit, original paths and SHA-256 hashes for source and output files. Images are extracted from Git, proportionally resized to at most 1800 pixels wide, and encoded as WebP at quality 82. They are never cropped, retouched or reconstructed. The selected current website captures use the Chinese interface, including their English-directory counterparts; the English README labels this explicitly. Replaced homepage illustrations that are no longer referenced have been removed.

Ten screenshots appear in each README, seven immediately and three in two expandable sections. The same set and order are used in both languages. They show the demonstration workspace and owner-supplied redactions. Do not replace them with private user data. Both title variants plus all referenced screenshots must remain below 2 MB per README; collapsed sections are included in that budget because browsers can still load their images.

## Title artwork

`scripts/hero.html` is the editable source for the Chinese and English title, with light and dark variants. The blue gradient and curved reflection follow the owner's website lettering direction. Only the title is rendered artwork; product interfaces remain the original screenshots. The README supplies descriptive alternative text and keeps the product explanation, navigation and actions as real text. GitHub's supported `<picture>` media sources select the dark title when the browser prefers dark colors.

To reproduce on a Mac with Avenir Next and PingFang SC, a locally installed `playwright-cli`, and the website's installed `sharp` dependency:

1. Run `python3 -m http.server 8769 --bind 127.0.0.1` from this repository.
2. Open a headless browser with `playwright-cli -s=dirdeck-art open http://127.0.0.1:8769/scripts/hero.html`.
3. Run `playwright-cli -s=dirdeck-art run-code --filename=scripts/render-heroes.js` to render four PNGs to `/tmp`.
4. Run `node scripts/build-assets.mjs /path/to/dirdeck-web /tmp` to extract the fixed source images and encode all artwork.
5. Run `python3 scripts/check.py`. Review the branch on GitHub at desktop and narrow widths in both color schemes, checking image load, anchors and language switching.
6. Close the task browser and stop the local server. Keep acceptance captures outside the repository.

DirDeck's name, icon and screenshots belong to their respective rights holders. Public display does not grant an open-source license to the app or artwork. The icon was already present in this community repository.

# Product icon and screenshot provenance

The bilingual community homepage follows the reviewed website narrative and canonical screenshots at [`dirdeck-web@9d8faa1`](https://github.com/fuxiaoai/dirdeck-web/commit/9d8faa17ac5c7d86dbd2c5db147d699112d35f45). It presents product tasks, not a release announcement. The application source is not hosted here.

`sources.json` records the exact website commit, original paths and SHA-256 hashes for source and output files. Images are extracted from Git, proportionally resized to at most 1800 pixels wide, and encoded as WebP at quality 82. They are never cropped, retouched or reconstructed. The selected current website captures use the Chinese interface, including their English-directory counterparts; the English README labels this explicitly.

Both pages use a single Markdown heading row: a 40-pixel product icon, the text title, then compact language links. Ten screenshots appear in the same order in each language, all visible without expanding any controls. PDF extraction and batch renaming share a two-column Markdown image table. Readers can open a screenshot for full-size detail. Do not replace demonstration captures with private user data. All referenced images, including the icon, must remain below 2 MB per README.

## Reproduce and check

1. With the website's `sharp` dependency installed locally, run `node scripts/build-assets.mjs /path/to/dirdeck-web` to extract and encode the pinned original screenshots. The existing `assets/icon.png` is retained.
2. Run `python3 scripts/check.py` to validate links, bilingual image parity, native headings, the absence of disclosure controls, the two-image row, size budget and screenshot hashes.
3. From this repository, open a headless browser with `playwright-cli -s=dirdeck-review open https://github.com/fuxiaoai/dirdeck-community/tree/<ref>`.
4. Run `playwright-cli -s=dirdeck-review run-code --filename=scripts/check-github.js` for the 12-case live GitHub rendering matrix. It checks light/dark themes, desktop/narrow widths, image visibility, headings, anchors and table overflow. Captures go to `/tmp`; inspect them before merging.
5. Close the task browser. Keep acceptance captures outside the repository.

DirDeck's name, icon and screenshots belong to their respective rights holders. Public display does not grant an open-source license to the app or artwork. The icon was already present in this community repository.

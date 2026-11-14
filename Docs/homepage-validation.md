# Community homepage acceptance — 2026-11-14

Scope: the product community homepage in `fuxiaoai/dirdeck-community`, published through [PR #46](https://github.com/fuxiaoai/dirdeck-community/pull/46). No website deployment, App Store release or application download upload is part of this change.

## Sources and revision

- Website `origin/main` was fetched and confirmed at `9d8faa17ac5c7d86dbd2c5db147d699112d35f45` before work. Its checkout was fast-forwarded without changing website content or existing untracked output.
- Community base: `d3cfa10ed31b85c037fa3ecd41c969c187636a13`.
- Visually verified content revision: `bcf332f9881b70d4115f68e320fe9d9d11e75b76`. Later acceptance-document and reusable-check additions do not change the rendered pages.
- Image provenance, conversion settings and hashes are in `assets/sources.json`.

## Completed checks

- `python3 scripts/check.py` and `git diff --check` passed.
- Real GitHub branch rendering passed for Chinese and English, at 1440, 390 and 320 CSS pixels, in light and dark themes: 12 cases. Every page loaded its 11 rendered images (one selected title and ten screenshots); alternate text was present. No page or README horizontal overflow, missing section anchor or wrong responsive/theme title was found.
- GitHub's own theme styling was tested in a headless Chromium session with the browser color preference and GitHub theme aligned. Both expandable sections were opened to validate their images, then closed for the visual captures.
- Manual review of desktop and narrow captures led to dedicated mobile title artwork with larger lettering. The full matrix passed again after that change.
- Both language-switch directions, an in-page search link and a disclosure click were exercised on GitHub.
- Both languages have the same seven task anchors and the same ten screenshots in the same order. English explains that the current real screenshots show Chinese UI. The contribution guide includes equivalent English guidance.
- Total referenced image bytes, conservatively counting all four alternative title assets and collapsed images: Chinese **1,007,254**, English **1,004,636**. A browser normally selects just one of the title alternatives.
- Public Chinese and English home, changelog, support, privacy and terms routes returned HTTP 200. The exact `/cn/app/dirdeck/id6794571378?mt=12` App Store destination returned HTTP 200 and the DirDeck product. Regionless and US URLs redirected to an unrelated storefront landing page in this environment, so both CTAs use the confirmed product URL.
- Issue listing returned HTTP 200. Issue creation routes correctly redirect anonymous users to sign in while retaining their template destination. Both referenced bilingual template files exist; no issue or support message was submitted.

## Boundaries

Screenshots demonstrate product capabilities, not a claim that a new release has shipped. The pages contain no new version announcement, direct installer, unpublished feed or unsupported performance benchmark. Price, payment completion and release availability were not tested; purchase terms defer to the App Store. The repository explicitly remains a community and feedback project, not open-source application code.

A GitHub account theme manually set against the browser's color preference can select different chrome and title themes. The artwork remains readable on its own background. Mobile screenshots preserve the whole app interface; readers can open the image for full-size detail rather than relying on tiny UI text.

To repeat the browser matrix, open the intended GitHub `/tree/<ref>` URL and run `scripts/check-github.js` via `playwright-cli run-code`. The script uses `main` when the starting URL has no `/tree/` ref. Render captures remain local under `/tmp`, outside the source repository.

## Public main verification

After PR #46 merged as `739bfcff1a10093ae74cd0ea9798a84fa34538cf`, the complete 12-case matrix passed against public `main`. The reusable runner was corrected to read the pathname inside the browser context (the CLI sandbox has no global `URL`) and to wait for the expected responsive image source as well as image completion after resizing. These checks change no product content. The community checkout was synchronized to remote main, and merged work branches were removed.

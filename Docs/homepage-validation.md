# Community homepage acceptance — 2026-11-14

## Current revision: native headings and fully visible content

This revision supersedes the title-artwork and disclosure layout introduced in PR #46 and audited in PR #47. It implements the owner's request for native Markdown titles, an inline product icon and content that never requires expanding a control.

- Base: `cd01449b2f9a92c1eb7a73e566d2e305b02e56ec`.
- Verified content revision: `07c7697` on `feature/community-readable-layout`.
- Both READMEs use a Markdown H1 containing a 40-pixel icon, the text title and compact language links. The title image variants and their unused rendering pipeline were removed.
- All `details` and `summary` elements were removed in both languages, retaining every screenshot. The tab-group/favorites screenshot is directly visible. PDF extraction and batch renaming share a two-column Markdown image table with readable labels.
- Screenshot content, product capabilities, download destinations and community feedback routes are unchanged. The website and native application were not modified or released.

## Validation

- Updated offline checks failed against the previous layout, then passed after the changes. They require native headings, no title artwork, no disclosure controls, a two-image tool row, equivalent image order and anchors, valid local links and correct source hashes.
- `node scripts/build-assets.mjs /path/to/dirdeck-web` succeeded with the simplified screenshot-only pipeline and reproduced the existing screenshots.
- `python3 scripts/check.py` and `git diff --check` passed.
- Real GitHub branch rendering passed all 12 combinations: Chinese/English × light/dark × 1440/390/320 CSS pixels.
- All 11 images (icon plus ten screenshots) loaded with alternative text and visible layout boxes without changing disclosure state. The H1 is text, no disclosure elements remain, all chapter anchors resolve, and the two-image table renders on one row. No page, README or table horizontal overflow was found.
- Desktop tool-table and narrow-screen title captures were visually inspected. Product screenshot proportions remain unchanged; readers may open the images for full-size details.
- Both pages reference **961,796 bytes** of image assets, below the 2 MB budget.

Run the live matrix by opening the intended GitHub `/tree/<ref>` page with a headless `playwright-cli` session started from the repository, then executing `scripts/check-github.js`. The script audits `main` when the starting URL has no `/tree/` ref. Screenshots go to `/tmp`, outside the repository.

## Provenance and scope

Canonical screenshot source remains website commit `9d8faa17ac5c7d86dbd2c5db147d699112d35f45`; paths, conversion settings and hashes are recorded in `assets/sources.json`. These real screenshots show the Chinese interface, explicitly noted in the English README.

This is the product community and feedback repository, not application source. No new release announcement, direct installer, payment-flow claim or website deployment is included. Download and support links remain those verified during the preceding homepage acceptance.

After PR #48 merged as `e9343443064bf4aa5ebc8ff35cb101b95c8f0f1f`, all 12 cases also passed against public `main`. The browser runner now brings the article into view and waits for image layout boxes after resizing, avoiding a transient GitHub responsive-layout state being reported as hidden content. No page content changes were needed for this follow-up.


## Inline header adjustment

Starting from `83faaa1`, revision `492f2fc` puts the logo, native text title and language switch in that order within one Markdown H1. Both languages pass the 12-case GitHub matrix; desktop checks additionally require the logo and language links to share the same line. Narrow screens wrap naturally without horizontal overflow. Both language links were clicked successfully, and the desktop header was visually inspected. Existing screenshots, expanded sections and tool grids remain unchanged.

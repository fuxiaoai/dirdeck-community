"""Offline checks for README navigation, bilingual parity, assets and provenance."""
import hashlib
import json
import re
from pathlib import Path

root = Path(__file__).resolve().parent.parent
pages = [root / 'README.md', root / 'README.en.md']
anchor_sets = []
for page in pages:
    text = page.read_text()
    anchors = set(re.findall(r'<a id="([^"]+)"', text))
    anchor_sets.append(anchors)
    images = set(re.findall(r'(?:src|srcset)="([^"]+)"|!\[[^\]]*\]\(([^)]+)\)', text))
    images = {a or b for a, b in images}
    assert len(images) == 14, (page, len(images))
    assert sum((root / p).stat().st_size for p in images) < 2_000_000, page
    for target in re.findall(r'\]\(([^)]+)\)|(?:href|src|srcset)="([^"]+)"', text):
        target = target[0] or target[1]
        if target.startswith(('https://', 'mailto:')):
            continue
        path, _, fragment = target.partition('#')
        if path:
            linked = root / path
            assert linked.is_file(), (page, target)
            if fragment:
                assert f'id="{fragment}"' in linked.read_text(), (page, target)
        else:
            assert fragment in anchors, (page, target)
    assert text.count('<details>') == text.count('</details>') == 2
    assert not re.search(r'https?://[^\s"<>)]*\.(?:dmg|zip)', text)
    assert 'issues/new?template=bug_report.yml' in text
    assert 'issues/new?template=feature_request.yml' in text
    assert 'mailto:fxapps@163.com' in text
assert anchor_sets[0] == anchor_sets[1]
assert re.findall(r'assets/screenshots/[^)]+', pages[0].read_text()) == re.findall(r'assets/screenshots/[^)]+', pages[1].read_text())
manifest = json.loads((root / 'assets/sources.json').read_text())
assert re.fullmatch('[0-9a-f]{40}', manifest['sourceCommit'])
for asset in manifest['screenshots'] + manifest['titles']:
    data = (root / asset['output']).read_bytes()
    assert hashlib.sha256(data).hexdigest() == asset['outputSha256'], asset['output']
assert '应用源代码' in pages[0].read_text()
assert "does not contain the application's source code" in pages[1].read_text()
print('PASS: bilingual anchors, links, image parity, <2 MB/page, publication boundaries and asset hashes')

// Checks every text/background pair in src/styles/tokens.css against WCAG AA,
// in both themes. Run with: npm run check:contrast
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { contrastRatio, mixHex } from '../src/lib/contrast.mjs';

const css = readFileSync(new URL('../src/styles/tokens.css', import.meta.url), 'utf8');

function readBlock(selector) {
  const start = css.indexOf(`${selector} {`);
  assert.notEqual(start, -1, `tokens.css is missing the "${selector}" block`);
  const body = css.slice(start, css.indexOf('}', start));
  const tokens = {};
  for (const [, name, value] of body.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})\b/g)) {
    tokens[name] = value;
  }
  return tokens;
}

// Tag chips paint the accent at this strength over the page background.
// Keep in sync with --tag-tint in tokens.css.
const TAG_TINT = 0.14;

const themes = {
  dark: readBlock(':root'),
  light: readBlock(':root[data-theme="light"]'),
};

for (const [theme, t] of Object.entries(themes)) {
  const pairs = [
    ['text on bg', t.text, t.bg, 4.5],
    ['text on surface', t.text, t.surface, 4.5],
    ['muted on bg', t.muted, t.bg, 4.5],
    ['muted on surface', t.muted, t.surface, 4.5],
    ['accent on bg', t.accent, t.bg, 4.5],
    ['accent on surface', t.accent, t.surface, 4.5],
    ['accent on tag tint', t.accent, mixHex(t.accent, t.bg, TAG_TINT), 4.5],
    ['bg on accent (solid button)', t.bg, t.accent, 4.5],
    ['focus ring (accent) on bg', t.accent, t.bg, 3],
    ['control border on bg', t['line-strong'], t.bg, 3],
  ];

  for (const [name, fg, bg, min] of pairs) {
    test(`${theme}: ${name} is at least ${min}:1`, () => {
      assert.ok(fg && bg, `missing token for "${name}" in ${theme} theme`);
      const ratio = contrastRatio(fg, bg);
      assert.ok(ratio >= min, `${fg} on ${bg} is ${ratio.toFixed(2)}:1, needs ${min}:1`);
    });
  }
}

// Nusantara in Numbers — the hand-in program (Node 22, standard library only).
//
// The entry is the static site in app/ next to this file: plain HTML, CSS and
// ES modules that a browser opens at app/index.html with no network access.
// This program's whole job is to hand that site in:
//
//   1. copy app/ and screenshots/ into the output directory
//      (/output in the grader, $MAKEFUN_OUTPUT_DIR anywhere else), and
//   2. write dossier.json there, built by buildDossier from the vendored
//      make.fun library, so the judge can read the site's screenshots, its
//      first-load files and bytes, and its source.
//
// The caps passed to buildDossier mirror the scorer's own limits (at most 4
// screenshots of 256 KiB each; app/ at most 993 entries and 16 MiB; dossier
// text capped at 160 KiB). vendor/makefun-frontend.ts must stay byte for
// byte the kit's copy: the scorer rebuilds the dossier with its own copy and
// compares the two.
//
// Run it outside the grader with:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

function copyTree(name) {
  const from = join(repoRoot, name);
  const to = join(outputDir, name);
  mkdirSync(to, { recursive: true });
  if (existsSync(from)) cpSync(from, to, { recursive: true });
}

mkdirSync(outputDir, { recursive: true });
copyTree('app');
copyTree('screenshots');

const dossier = buildDossier(outputDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
writeFileSync(join(outputDir, 'dossier.json'), dossier);

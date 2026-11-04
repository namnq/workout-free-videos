#!/usr/bin/env node
// Checks the library is complete and consistent. Zero dependencies (Node 18+).
// Usage: node scripts/validate-library.mjs
import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
const errors = [];
const fail = (msg) => errors.push(msg);

const exercises = read('data/exercises.json');
const muscles = read('data/muscles.json');
const equipment = read('data/equipment.json');
const LOCALES = ['de', 'es', 'fr', 'it', 'ja'];
const LEVELS = ['beginner', 'intermediate', 'advanced'];
const TYPES = ['compound', 'isolation', 'mobility', 'recovery'];

const sums = new Map(readFileSync(join(root, 'media/SHA256SUMS'), 'utf8').trim().split('\n')
  .map((l) => l.split(/\s+/)).map(([h, p]) => [p, h]));

const seen = { id: new Set(), slug: new Set() };
for (const e of exercises) {
  const at = `[${e.id ?? '?'} ${e.slug ?? '?'}]`;
  for (const k of ['id', 'slug']) {
    if (!e[k]) fail(`${at} missing ${k}`);
    else if (seen[k].has(e[k])) fail(`${at} duplicate ${k}`);
    else seen[k].add(e[k]);
  }
  if (!/^[a-z0-9-]+$/.test(e.slug)) fail(`${at} slug must be kebab-case`);
  if (!e.name || !Array.isArray(e.cues) || e.cues.length === 0) fail(`${at} needs name and cues`);
  for (const m of [e.primaryMuscle, ...e.secondaryMuscles]) if (!muscles[m]) fail(`${at} unknown muscle ${m}`);
  for (const q of e.equipment) if (!equipment[q]) fail(`${at} unknown equipment ${q}`);
  if (!LEVELS.includes(e.level)) fail(`${at} bad level ${e.level}`);
  if (!TYPES.includes(e.type)) fail(`${at} bad type ${e.type}`);
  for (const l of LOCALES) {
    const t = e.translations?.[l];
    if (!t?.name || t.cues?.length !== e.cues.length) fail(`${at} incomplete ${l} translation`);
  }
  const f = e.video;
  const abs = join(root, f.path);
  if (f.path !== `media/video/${e.slug}.mp4`) fail(`${at} video path does not match slug`);
  if (!existsSync(abs)) { fail(`${at} missing file ${f.path}`); continue; }
  if (statSync(abs).size !== f.bytes) fail(`${at} ${f.path} size mismatch`);
  const hash = createHash('sha256').update(readFileSync(abs)).digest('hex');
  if (hash !== f.sha256 || hash !== sums.get(f.path)) fail(`${at} ${f.path} checksum mismatch`);
}

// No orphan media files without an exercise entry.
for (const file of readdirSync(join(root, 'media', 'video'))) {
  if (!exercises.some((e) => e.video.path === `media/video/${file}`)) fail(`orphan file media/video/${file}`);
}

if (errors.length) {
  console.error(`✗ ${errors.length} problem(s):\n  ${errors.join('\n  ')}`);
  process.exit(1);
}
console.log(`✓ ${exercises.length} exercises, ${exercises.length} videos, all checksums match`);

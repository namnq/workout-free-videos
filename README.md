<div align="center">

<b>English</b> · <a href="README.vi.md">Tiếng Việt</a>

# 🏋️ Workout Free Videos

**57 free, looping gym exercise videos with structured data — drop them into any fitness app.**

[![License: CC0-1.0](https://img.shields.io/badge/license-CC0_1.0-blue.svg)](LICENSE)
[![Version](https://img.shields.io/github/v/tag/namnq/workout-free-videos?label=version)](https://github.com/namnq/workout-free-videos/tags)
[![Validate](https://github.com/namnq/workout-free-videos/actions/workflows/validate-library.yml/badge.svg)](https://github.com/namnq/workout-free-videos/actions/workflows/validate-library.yml)
![Exercises](https://img.shields.io/badge/exercises-57-orange.svg)
![Video](https://img.shields.io/badge/video-720p_MP4-red.svg)

[**Live demo**](https://galaxy-fitness.com/) ·
[Quick start](#-quick-start) ·
[Data format](#-data-format) ·
[Exercise list](#-exercise-list) ·
[More videos](#-more-videos-coming) ·
[Contributing](#-contributing)

</div>

---

## ✨ Features

- **57 exercises**: strength, mobility and recovery across 22 muscle groups
- **Web-ready video**: 1280×720 H.264 MP4, 4–8 s seamless loops, no audio, `faststart` so playback starts while downloading
- **Structured data**: JSON + CSV with muscles, equipment, level, joint stress and 3 form cues per exercise
- **6 languages**: names and cues in English, German, Spanish, French, Italian and Japanese (muscle and equipment labels also in Vietnamese)
- **Lightweight**: ~28 MB for everything, with SHA-256 checksums
- **Public domain**: use it anywhere, including commercial apps. No credit required

These are the same clips used in the GymPlan workout planner, released for the community.

## 🚀 Quick start

**Hot-link from jsDelivr** (free CDN, no hosting needed). Pin a version tag so files never change under you:

```
https://cdn.jsdelivr.net/gh/namnq/workout-free-videos@v2.0.0/data/exercises.json
https://cdn.jsdelivr.net/gh/namnq/workout-free-videos@v2.0.0/media/video/barbell-back-squat.mp4
```

**Show a clip:**

```html
<video src="media/video/barbell-back-squat.mp4" autoplay muted loop playsinline></video>
```

> [!TIP]
> `muted` + `playsinline` are required for autoplay on iOS and most browsers.

**Query the data (JavaScript):**

```js
const base = 'https://cdn.jsdelivr.net/gh/namnq/workout-free-videos@v2.0.0/';
const exercises = await fetch(base + 'data/exercises.json').then((r) => r.json());

// Beginner home workout: dumbbells, bench or no equipment, nothing hard on the knees
const home = new Set(['dumbbell', 'bench', 'bodyweight']);
const picks = exercises.filter((e) =>
  e.level === 'beginner' && e.equipment.every((q) => home.has(q)) && !e.jointStress.includes('knee'));

picks.forEach((e) => console.log(e.translations.de?.name ?? e.name, base + e.video.path));
```

**Python:**

```python
import json
exercises = json.load(open("data/exercises.json", encoding="utf-8"))
legs = [e["slug"] for e in exercises if e["region"] == "lower"]
```

**Download everything:**

```bash
git clone https://github.com/namnq/workout-free-videos.git
```

> [!NOTE]
> For an app with real traffic, copy the files to your own storage (S3, R2, your server) instead of hot-linking.

## 📁 Project structure

```
data/
  exercises.json         full records (one object per exercise)
  exercises.csv          flat table, English only, lists joined with "|"
  muscles.json           muscle key -> { region, label: { en, vi } }
  equipment.json         equipment key -> { label: { en, vi } }
media/
  video/<slug>.mp4
  SHA256SUMS             checksums for every media file
scripts/
  validate-library.mjs   checks data, files and checksums
index.html               browsable gallery, open locally
```

## 📋 Data format

```jsonc
{
  "id": "c01",                       // stable id, never reused
  "slug": "dumbbell-bench-press",    // file name of the video
  "name": "Dumbbell Bench Press",
  "primaryMuscle": "chest",          // key in muscles.json
  "secondaryMuscles": ["triceps", "shoulders"],
  "region": "upper",                 // upper | core | lower | mobility
  "equipment": ["dumbbell", "bench"],// keys in equipment.json, all required
  "level": "beginner",               // beginner | intermediate | advanced
  "type": "compound",                // compound | isolation | mobility | recovery
  "jointStress": ["shoulder"],       // knee | lowBack | shoulder | wrist: skip if that joint hurts
  "gear": ["equipment.dumbbell", "accessory.gloves"], // helpful products, "<group>.<item>"
  "cues": ["Press from mid-chest ...", "...", "..."],
  "translations": { "de": { "name": "...", "cues": ["..."] }, "es": {}, "fr": {}, "it": {}, "ja": {} },
  "video":  { "path": "media/video/dumbbell-bench-press.mp4", "bytes": 512345, "sha256": "...", "width": 1280, "height": 720, "durationSec": 7.5 }
}
```

## 🗂 Exercise list

<details>
<summary><b>Show all 57 exercises</b></summary>

| Slug | Exercise | Muscle | Equipment | Level | Length |
|---|---|---|---|---|---|
| [`dumbbell-bench-press`](media/video/dumbbell-bench-press.mp4) | Dumbbell Bench Press | Chest | dumbbell, bench | beginner | 7.5s |
| [`incline-bench-press`](media/video/incline-bench-press.mp4) | Incline Bench Press | Chest | barbell, bench | intermediate | 8s |
| [`exercise-ball-dumbbell-bench-press`](media/video/exercise-ball-dumbbell-bench-press.mp4) | Stability Ball Dumbbell Press | Chest | dumbbell, ball | intermediate | 8s |
| [`chest-dip`](media/video/chest-dip.mp4) | Chest Dip | Chest | dipBars | intermediate | 7.7s |
| [`military-press`](media/video/military-press.mp4) | Overhead Press | Shoulders | barbell | intermediate | 8s |
| [`dumbbell-lateral-raise`](media/video/dumbbell-lateral-raise.mp4) | Dumbbell Lateral Raise | Shoulders | dumbbell | beginner | 6.8s |
| [`bent-over-low-pulley-rear-delt-fly`](media/video/bent-over-low-pulley-rear-delt-fly.mp4) | Cable Rear Delt Fly | Shoulders | cable | intermediate | 8s |
| [`close-grip-bench-press`](media/video/close-grip-bench-press.mp4) | Close-Grip Bench Press | Triceps | barbell, bench | intermediate | 8s |
| [`ez-bar-skullcrusher`](media/video/ez-bar-skullcrusher.mp4) | EZ Bar Skullcrusher | Triceps | ezBar, bench | intermediate | 7s |
| [`weighted-tricep-dips`](media/video/weighted-tricep-dips.mp4) | Weighted Tricep Dip | Triceps | dipBars | advanced | 4.7s |
| [`standing-barbell-curl`](media/video/standing-barbell-curl.mp4) | Standing Barbell Curl | Biceps | barbell | beginner | 8s |
| [`incline-dumbbell-curl`](media/video/incline-dumbbell-curl.mp4) | Incline Dumbbell Curl | Biceps | dumbbell, bench | intermediate | 8s |
| [`dumbbell-hammer-preacher-curl`](media/video/dumbbell-hammer-preacher-curl.mp4) | Hammer Preacher Curl | Biceps | dumbbell, bench | intermediate | 7.7s |
| [`seated-barbell-wrist-curl`](media/video/seated-barbell-wrist-curl.mp4) | Seated Wrist Curl | Forearms | barbell, bench | beginner | 8s |
| [`reverse-grip-barbell-curl`](media/video/reverse-grip-barbell-curl.mp4) | Reverse-Grip EZ Curl | Forearms | ezBar | intermediate | 8s |
| [`plate-pinch-carry`](media/video/plate-pinch-carry.mp4) | Plate Pinch Carry | Forearms | plate | beginner | 8s |
| [`barbell-shrug`](media/video/barbell-shrug.mp4) | Barbell Shrug | Traps | barbell | beginner | 6.3s |
| [`dumbbell-shrug`](media/video/dumbbell-shrug.mp4) | Dumbbell Shrug | Traps | dumbbell | beginner | 8s |
| [`barbell-upright-row`](media/video/barbell-upright-row.mp4) | Barbell Upright Row | Traps | barbell | intermediate | 4.3s |
| [`seated-cable-row`](media/video/seated-cable-row.mp4) | Seated Cable Row | Upper back | cable | beginner | 7.3s |
| [`machine-t-bar-row`](media/video/machine-t-bar-row.mp4) | Chest-Supported T-Bar Row | Upper back | machine | beginner | 7.2s |
| [`bent-over-row`](media/video/bent-over-row.mp4) | Barbell Bent-Over Row | Upper back | barbell | intermediate | 8s |
| [`lat-pull-down`](media/video/lat-pull-down.mp4) | Lat Pulldown | Lats | cable | beginner | 8s |
| [`wide-grip-pull-up`](media/video/wide-grip-pull-up.mp4) | Wide-Grip Pull-Up | Lats | pullupBar | intermediate | 5.8s |
| [`straight-arm-lat-pull-down`](media/video/straight-arm-lat-pull-down.mp4) | Straight-Arm Pulldown | Lats | cable | intermediate | 8s |
| [`superman`](media/video/superman.mp4) | Superman | Lower back | bodyweight | beginner | 8s |
| [`sit-up`](media/video/sit-up.mp4) | Sit-Up | Abs | bodyweight | beginner | 5s |
| [`lying-floor-leg-raise`](media/video/lying-floor-leg-raise.mp4) | Lying Leg Raise | Abs | bodyweight | beginner | 8s |
| [`weighted-crunch`](media/video/weighted-crunch.mp4) | Weighted Plate Crunch | Abs | plate | intermediate | 8s |
| [`tall-kneeling-cable-lift`](media/video/tall-kneeling-cable-lift.mp4) | Kneeling Cable Lift | Obliques | cable | beginner | 8s |
| [`tall-kneeling-cable-chop`](media/video/tall-kneeling-cable-chop.mp4) | Kneeling Cable Chop | Obliques | cable | intermediate | 8s |
| [`split-stance-cable-lift`](media/video/split-stance-cable-lift.mp4) | Split-Stance Cable Lift | Obliques | cable | intermediate | 8s |
| [`barbell-hip-thrust`](media/video/barbell-hip-thrust.mp4) | Barbell Hip Thrust | Glutes | barbell, bench | intermediate | 7s |
| [`hyperextension`](media/video/hyperextension.mp4) | Back Extension | Glutes | machine | beginner | 8s |
| [`good-mornings`](media/video/good-mornings.mp4) | Good Morning | Glutes | barbell | advanced | 8s |
| [`barbell-back-squat`](media/video/barbell-back-squat.mp4) | Barbell Back Squat | Quads | barbell | intermediate | 8s |
| [`leg-press`](media/video/leg-press.mp4) | Leg Press | Quads | machine | beginner | 8s |
| [`machine-hack-squat`](media/video/machine-hack-squat.mp4) | Hack Squat | Quads | machine | intermediate | 8s |
| [`exercise-ball-wall-squat`](media/video/exercise-ball-wall-squat.mp4) | Stability Ball Wall Squat | Quads | ball | beginner | 8s |
| [`stiff-leg-deadlift`](media/video/stiff-leg-deadlift.mp4) | Stiff-Leg Deadlift | Hamstrings | barbell | intermediate | 8s |
| [`seated-leg-curl`](media/video/seated-leg-curl.mp4) | Seated Leg Curl | Hamstrings | machine | beginner | 6.8s |
| [`exercise-ball-leg-curl`](media/video/exercise-ball-leg-curl.mp4) | Stability Ball Leg Curl | Hamstrings | ball | beginner | 8s |
| [`nordic-hamstring-curl`](media/video/nordic-hamstring-curl.mp4) | Nordic Hamstring Curl | Hamstrings | bodyweight | advanced | 8s |
| [`standing-machine-calf-raise`](media/video/standing-machine-calf-raise.mp4) | Standing Calf Raise | Calves | machine | beginner | 8s |
| [`seated-calf-raise`](media/video/seated-calf-raise.mp4) | Seated Calf Raise | Calves | machine | beginner | 5.5s |
| [`45-degree-leg-press-calf-raise`](media/video/45-degree-leg-press-calf-raise.mp4) | Leg Press Calf Raise | Calves | machine | beginner | 8s |
| [`hip-adduction-machine`](media/video/hip-adduction-machine.mp4) | Hip Adduction Machine | Adductors | machine | beginner | 8s |
| [`alternating-lateral-lunge-with-overhead-reach`](media/video/alternating-lateral-lunge-with-overhead-reach.mp4) | Lateral Lunge with Reach | Adductors | bodyweight | beginner | 8s |
| [`deep-squat-prying`](media/video/deep-squat-prying.mp4) | Deep Squat Pry | Adductors | bodyweight | beginner | 8s |
| [`cable-hip-abduction`](media/video/cable-hip-abduction.mp4) | Cable Hip Abduction | Abductors | cable | beginner | 8s |
| [`cradle-walk`](media/video/cradle-walk.mp4) | Cradle Walk | Hip flexors | bodyweight | beginner | 8s |
| [`fire-hydrant-circles`](media/video/fire-hydrant-circles.mp4) | Fire Hydrant Circles | Hip flexors | bodyweight | beginner | 6.8s |
| [`kneeling-posterior-hip-capsule-mobilization`](media/video/kneeling-posterior-hip-capsule-mobilization.mp4) | Kneeling Hip Capsule Mobilization | Hip flexors | bodyweight | beginner | 6.5s |
| [`it-band-foam-rolling`](media/video/it-band-foam-rolling.mp4) | IT Band Foam Rolling | IT band | roller | beginner | 8s |
| [`plantar-fascia-lacrosse-ball`](media/video/plantar-fascia-lacrosse-ball.mp4) | Plantar Fascia Release | Feet | lacrosse | beginner | 8s |
| [`palmar-fascia-lacrosse-ball`](media/video/palmar-fascia-lacrosse-ball.mp4) | Palm Release | Hands | lacrosse | beginner | 8s |
| [`neck-tiger-tail`](media/video/neck-tiger-tail.mp4) | Neck Release | Neck | roller | beginner | 8s |

</details>

## ✅ Verify your download

```bash
node scripts/validate-library.mjs      # Node 18+, no install
# or only the checksums:
shasum -a 256 -c media/SHA256SUMS      # macOS
sha256sum -c media/SHA256SUMS          # Linux
```

## 🌱 More videos coming

This is just the start. If the library proves useful to the community, we'll keep filming and add more exercises.

Want that to happen? ⭐ Star the repo and [open an issue](https://github.com/namnq/workout-free-videos/issues/new) naming the exercises you'd like next. The most requested ones get filmed first.

## 🤝 Contributing

Fixes to cues and new translations are welcome:

1. Edit `data/exercises.json`
2. Run `node scripts/validate-library.mjs`
3. Open a pull request

Ids and slugs are stable: don't rename them, add new entries instead. New footage must be your own work and released under CC0 1.0.

## ⚠️ Disclaimer

Cues are short coaching reminders, not medical advice. Anyone with pain or an injury should check with a qualified professional. `jointStress` is a hint for filtering, not a diagnosis.

## 📄 License

Everything in this repo (videos, data and code) is released under [CC0 1.0 Universal](LICENSE) and dedicated to the public domain.
Use it for anything, including commercial apps. Edit it, redistribute it. No credit or permission needed.

<div align="center">
<sub>If this saved you time, a ⭐ helps others find it.</sub>
</div>

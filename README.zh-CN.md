<div align="center">

<a href="README.md">English</a> · <a href="README.vi.md">Tiếng Việt</a> · <b>简体中文</b> · <a href="README.ja.md">日本語</a> · <a href="README.es.md">Español</a>

# 🏋️ Workout Free Videos

**57 个免费的无缝循环健身动作视频，附带结构化数据，可直接用于任何健身 App。**

[![License: CC0-1.0](https://img.shields.io/badge/license-CC0_1.0-blue.svg)](LICENSE)
[![Version](https://img.shields.io/github/v/tag/namnq/workout-free-videos?label=version)](https://github.com/namnq/workout-free-videos/tags)
[![Validate](https://github.com/namnq/workout-free-videos/actions/workflows/validate-library.yml/badge.svg)](https://github.com/namnq/workout-free-videos/actions/workflows/validate-library.yml)
![Exercises](https://img.shields.io/badge/exercises-57-orange.svg)
![Video](https://img.shields.io/badge/video-720p_MP4-red.svg)

[**在线演示**](https://galaxy-fitness.com/) ·
[快速上手](#-快速上手) ·
[数据格式](#-数据格式) ·
[动作列表](#-动作列表) ·
[更多视频](#-更多视频即将推出) ·
[参与贡献](#-参与贡献)

</div>

---

## ✨ 功能特性

- **57 个动作**：涵盖力量、灵活性与恢复训练，覆盖 22 个肌群
- **为 Web 优化的视频**：1280×720 H.264 MP4，4–8 秒无缝循环，无音轨，启用 `faststart`，边下载边播放
- **结构化数据**：JSON + CSV，每个动作包含目标肌群、器械、难度、关节压力以及 3 条动作要点
- **6 种语言**：动作名称和要点提供英语、德语、西班牙语、法语、意大利语和日语版本（肌群与器械名称另有越南语）
- **轻量**：全部文件约 28 MB，附 SHA-256 校验和
- **公有领域**：可用于任何场景，包括商业 App，无需署名

这些视频片段与 GymPlan 训练计划 App 中使用的完全相同，现开放给社区使用。

> [!NOTE]
> 每个动作都经过逐一人工审核和编辑，力求视频和动作要点展示尽可能标准的技术动作。

## 🚀 快速上手

**通过 jsDelivr 直接引用**（免费 CDN，无需自行托管）。请固定版本标签，确保文件内容不会意外变化：

```
https://cdn.jsdelivr.net/gh/namnq/workout-free-videos@v2.0.0/data/exercises.json
https://cdn.jsdelivr.net/gh/namnq/workout-free-videos@v2.0.0/media/video/barbell-back-squat.mp4
```

**播放视频片段：**

```html
<video src="media/video/barbell-back-squat.mp4" autoplay muted loop playsinline></video>
```

> [!TIP]
> 在 iOS 和大多数浏览器上，自动播放必须同时设置 `muted` 和 `playsinline`。

**查询数据（JavaScript）：**

```js
const base = 'https://cdn.jsdelivr.net/gh/namnq/workout-free-videos@v2.0.0/';
const exercises = await fetch(base + 'data/exercises.json').then((r) => r.json());

// 新手居家训练：哑铃、训练凳或无器械，且不给膝盖增加负担
const home = new Set(['dumbbell', 'bench', 'bodyweight']);
const picks = exercises.filter((e) =>
  e.level === 'beginner' && e.equipment.every((q) => home.has(q)) && !e.jointStress.includes('knee'));

picks.forEach((e) => console.log(e.translations.de?.name ?? e.name, base + e.video.path));
```

**Python：**

```python
import json
exercises = json.load(open("data/exercises.json", encoding="utf-8"))
legs = [e["slug"] for e in exercises if e["region"] == "lower"]
```

**下载全部文件：**

```bash
git clone https://github.com/namnq/workout-free-videos.git
```

> [!NOTE]
> 如果你的 App 有真实流量，请将文件复制到自己的存储（S3、R2 或自有服务器），不要直接外链引用。

## 📁 项目结构

```
data/
  exercises.json         完整记录（每个动作一个对象）
  exercises.csv          扁平表格，仅英文，列表项以 "|" 连接
  muscles.json           肌群键 -> { region, label: { en, vi } }
  equipment.json         器械键 -> { label: { en, vi } }
media/
  video/<slug>.mp4
  SHA256SUMS             所有媒体文件的校验和
scripts/
  validate-library.mjs   校验数据、文件和校验和
index.html               可浏览的视频库页面，本地直接打开
```

## 📋 数据格式

```jsonc
{
  "id": "c01",                       // 稳定 id，永不复用
  "slug": "dumbbell-bench-press",    // 视频文件名
  "name": "Dumbbell Bench Press",
  "primaryMuscle": "chest",          // muscles.json 中的键
  "secondaryMuscles": ["triceps", "shoulders"],
  "region": "upper",                 // upper | core | lower | mobility
  "equipment": ["dumbbell", "bench"],// equipment.json 中的键，全部必需
  "level": "beginner",               // beginner | intermediate | advanced
  "type": "compound",                // compound | isolation | mobility | recovery
  "jointStress": ["shoulder"],       // knee | lowBack | shoulder | wrist：若该关节疼痛请跳过
  "gear": ["equipment.dumbbell", "accessory.gloves"], // 推荐装备，格式为 "<group>.<item>"
  "cues": ["Press from mid-chest ...", "...", "..."],
  "translations": { "de": { "name": "...", "cues": ["..."] }, "es": {}, "fr": {}, "it": {}, "ja": {} },
  "video":  { "path": "media/video/dumbbell-bench-press.mp4", "bytes": 512345, "sha256": "...", "width": 1280, "height": 720, "durationSec": 7.5 }
}
```

## 🗂 动作列表

<details>
<summary><b>查看全部 57 个动作</b></summary>

| Slug | 动作 | 肌群 | 器械 | 难度 | 时长 |
|---|---|---|---|---|---|
| [`dumbbell-bench-press`](media/video/dumbbell-bench-press.mp4) | Dumbbell Bench Press | 胸部 | 哑铃、训练凳 | 初级 | 7.5s |
| [`incline-bench-press`](media/video/incline-bench-press.mp4) | Incline Bench Press | 胸部 | 杠铃、训练凳 | 中级 | 8s |
| [`exercise-ball-dumbbell-bench-press`](media/video/exercise-ball-dumbbell-bench-press.mp4) | Stability Ball Dumbbell Press | 胸部 | 哑铃、瑞士球 | 中级 | 8s |
| [`chest-dip`](media/video/chest-dip.mp4) | Chest Dip | 胸部 | 双杠 | 中级 | 7.7s |
| [`military-press`](media/video/military-press.mp4) | Overhead Press | 肩部 | 杠铃 | 中级 | 8s |
| [`dumbbell-lateral-raise`](media/video/dumbbell-lateral-raise.mp4) | Dumbbell Lateral Raise | 肩部 | 哑铃 | 初级 | 6.8s |
| [`bent-over-low-pulley-rear-delt-fly`](media/video/bent-over-low-pulley-rear-delt-fly.mp4) | Cable Rear Delt Fly | 肩部 | 龙门架 | 中级 | 8s |
| [`close-grip-bench-press`](media/video/close-grip-bench-press.mp4) | Close-Grip Bench Press | 肱三头肌 | 杠铃、训练凳 | 中级 | 8s |
| [`ez-bar-skullcrusher`](media/video/ez-bar-skullcrusher.mp4) | EZ Bar Skullcrusher | 肱三头肌 | 曲杆、训练凳 | 中级 | 7s |
| [`weighted-tricep-dips`](media/video/weighted-tricep-dips.mp4) | Weighted Tricep Dip | 肱三头肌 | 双杠 | 高级 | 4.7s |
| [`standing-barbell-curl`](media/video/standing-barbell-curl.mp4) | Standing Barbell Curl | 肱二头肌 | 杠铃 | 初级 | 8s |
| [`incline-dumbbell-curl`](media/video/incline-dumbbell-curl.mp4) | Incline Dumbbell Curl | 肱二头肌 | 哑铃、训练凳 | 中级 | 8s |
| [`dumbbell-hammer-preacher-curl`](media/video/dumbbell-hammer-preacher-curl.mp4) | Hammer Preacher Curl | 肱二头肌 | 哑铃、训练凳 | 中级 | 7.7s |
| [`seated-barbell-wrist-curl`](media/video/seated-barbell-wrist-curl.mp4) | Seated Wrist Curl | 前臂 | 杠铃、训练凳 | 初级 | 8s |
| [`reverse-grip-barbell-curl`](media/video/reverse-grip-barbell-curl.mp4) | Reverse-Grip EZ Curl | 前臂 | 曲杆 | 中级 | 8s |
| [`plate-pinch-carry`](media/video/plate-pinch-carry.mp4) | Plate Pinch Carry | 前臂 | 杠铃片 | 初级 | 8s |
| [`barbell-shrug`](media/video/barbell-shrug.mp4) | Barbell Shrug | 斜方肌 | 杠铃 | 初级 | 6.3s |
| [`dumbbell-shrug`](media/video/dumbbell-shrug.mp4) | Dumbbell Shrug | 斜方肌 | 哑铃 | 初级 | 8s |
| [`barbell-upright-row`](media/video/barbell-upright-row.mp4) | Barbell Upright Row | 斜方肌 | 杠铃 | 中级 | 4.3s |
| [`seated-cable-row`](media/video/seated-cable-row.mp4) | Seated Cable Row | 上背部 | 龙门架 | 初级 | 7.3s |
| [`machine-t-bar-row`](media/video/machine-t-bar-row.mp4) | Chest-Supported T-Bar Row | 上背部 | 固定器械 | 初级 | 7.2s |
| [`bent-over-row`](media/video/bent-over-row.mp4) | Barbell Bent-Over Row | 上背部 | 杠铃 | 中级 | 8s |
| [`lat-pull-down`](media/video/lat-pull-down.mp4) | Lat Pulldown | 背阔肌 | 龙门架 | 初级 | 8s |
| [`wide-grip-pull-up`](media/video/wide-grip-pull-up.mp4) | Wide-Grip Pull-Up | 背阔肌 | 单杠 | 中级 | 5.8s |
| [`straight-arm-lat-pull-down`](media/video/straight-arm-lat-pull-down.mp4) | Straight-Arm Pulldown | 背阔肌 | 龙门架 | 中级 | 8s |
| [`superman`](media/video/superman.mp4) | Superman | 下背部 | 自重 | 初级 | 8s |
| [`sit-up`](media/video/sit-up.mp4) | Sit-Up | 腹肌 | 自重 | 初级 | 5s |
| [`lying-floor-leg-raise`](media/video/lying-floor-leg-raise.mp4) | Lying Leg Raise | 腹肌 | 自重 | 初级 | 8s |
| [`weighted-crunch`](media/video/weighted-crunch.mp4) | Weighted Plate Crunch | 腹肌 | 杠铃片 | 中级 | 8s |
| [`tall-kneeling-cable-lift`](media/video/tall-kneeling-cable-lift.mp4) | Kneeling Cable Lift | 腹斜肌 | 龙门架 | 初级 | 8s |
| [`tall-kneeling-cable-chop`](media/video/tall-kneeling-cable-chop.mp4) | Kneeling Cable Chop | 腹斜肌 | 龙门架 | 中级 | 8s |
| [`split-stance-cable-lift`](media/video/split-stance-cable-lift.mp4) | Split-Stance Cable Lift | 腹斜肌 | 龙门架 | 中级 | 8s |
| [`barbell-hip-thrust`](media/video/barbell-hip-thrust.mp4) | Barbell Hip Thrust | 臀肌 | 杠铃、训练凳 | 中级 | 7s |
| [`hyperextension`](media/video/hyperextension.mp4) | Back Extension | 臀肌 | 固定器械 | 初级 | 8s |
| [`good-mornings`](media/video/good-mornings.mp4) | Good Morning | 臀肌 | 杠铃 | 高级 | 8s |
| [`barbell-back-squat`](media/video/barbell-back-squat.mp4) | Barbell Back Squat | 股四头肌 | 杠铃 | 中级 | 8s |
| [`leg-press`](media/video/leg-press.mp4) | Leg Press | 股四头肌 | 固定器械 | 初级 | 8s |
| [`machine-hack-squat`](media/video/machine-hack-squat.mp4) | Hack Squat | 股四头肌 | 固定器械 | 中级 | 8s |
| [`exercise-ball-wall-squat`](media/video/exercise-ball-wall-squat.mp4) | Stability Ball Wall Squat | 股四头肌 | 瑞士球 | 初级 | 8s |
| [`stiff-leg-deadlift`](media/video/stiff-leg-deadlift.mp4) | Stiff-Leg Deadlift | 腘绳肌 | 杠铃 | 中级 | 8s |
| [`seated-leg-curl`](media/video/seated-leg-curl.mp4) | Seated Leg Curl | 腘绳肌 | 固定器械 | 初级 | 6.8s |
| [`exercise-ball-leg-curl`](media/video/exercise-ball-leg-curl.mp4) | Stability Ball Leg Curl | 腘绳肌 | 瑞士球 | 初级 | 8s |
| [`nordic-hamstring-curl`](media/video/nordic-hamstring-curl.mp4) | Nordic Hamstring Curl | 腘绳肌 | 自重 | 高级 | 8s |
| [`standing-machine-calf-raise`](media/video/standing-machine-calf-raise.mp4) | Standing Calf Raise | 小腿 | 固定器械 | 初级 | 8s |
| [`seated-calf-raise`](media/video/seated-calf-raise.mp4) | Seated Calf Raise | 小腿 | 固定器械 | 初级 | 5.5s |
| [`45-degree-leg-press-calf-raise`](media/video/45-degree-leg-press-calf-raise.mp4) | Leg Press Calf Raise | 小腿 | 固定器械 | 初级 | 8s |
| [`hip-adduction-machine`](media/video/hip-adduction-machine.mp4) | Hip Adduction Machine | 内收肌 | 固定器械 | 初级 | 8s |
| [`alternating-lateral-lunge-with-overhead-reach`](media/video/alternating-lateral-lunge-with-overhead-reach.mp4) | Lateral Lunge with Reach | 内收肌 | 自重 | 初级 | 8s |
| [`deep-squat-prying`](media/video/deep-squat-prying.mp4) | Deep Squat Pry | 内收肌 | 自重 | 初级 | 8s |
| [`cable-hip-abduction`](media/video/cable-hip-abduction.mp4) | Cable Hip Abduction | 外展肌 | 龙门架 | 初级 | 8s |
| [`cradle-walk`](media/video/cradle-walk.mp4) | Cradle Walk | 髋屈肌 | 自重 | 初级 | 8s |
| [`fire-hydrant-circles`](media/video/fire-hydrant-circles.mp4) | Fire Hydrant Circles | 髋屈肌 | 自重 | 初级 | 6.8s |
| [`kneeling-posterior-hip-capsule-mobilization`](media/video/kneeling-posterior-hip-capsule-mobilization.mp4) | Kneeling Hip Capsule Mobilization | 髋屈肌 | 自重 | 初级 | 6.5s |
| [`it-band-foam-rolling`](media/video/it-band-foam-rolling.mp4) | IT Band Foam Rolling | 髂胫束 | 泡沫轴 | 初级 | 8s |
| [`plantar-fascia-lacrosse-ball`](media/video/plantar-fascia-lacrosse-ball.mp4) | Plantar Fascia Release | 足部 | 按摩球 | 初级 | 8s |
| [`palmar-fascia-lacrosse-ball`](media/video/palmar-fascia-lacrosse-ball.mp4) | Palm Release | 手部 | 按摩球 | 初级 | 8s |
| [`neck-tiger-tail`](media/video/neck-tiger-tail.mp4) | Neck Release | 颈部 | 泡沫轴 | 初级 | 8s |

</details>

## ✅ 校验下载文件

```bash
node scripts/validate-library.mjs      # Node 18+，无需安装依赖
# 或仅校验校验和：
shasum -a 256 -c media/SHA256SUMS      # macOS
sha256sum -c media/SHA256SUMS          # Linux
```

## 🌱 更多视频即将推出

这只是一个开始。如果这个视频库对社区有帮助，我们会继续拍摄并添加更多动作。

想让这件事成真？⭐ Star 本仓库，并[提交 issue](https://github.com/namnq/workout-free-videos/issues/new) 写下你希望接下来加入的动作。呼声最高的动作会优先拍摄。

## 🤝 参与贡献

欢迎修正动作要点或添加新的翻译：

1. 编辑 `data/exercises.json`
2. 运行 `node scripts/validate-library.mjs`
3. 提交 pull request

id 和 slug 保持稳定：请勿重命名，如需变更请新增条目。新的视频素材必须是你本人的作品，并以 CC0 1.0 发布。

## ⚠️ 免责声明

动作要点只是简短的训练提示，不构成医疗建议。如有疼痛或伤病，请咨询专业人士。`jointStress` 仅作为筛选提示，并非诊断依据。

## 📄 许可证

本仓库的全部内容（视频、数据和代码）均以 [CC0 1.0 Universal](LICENSE) 发布，贡献至公有领域。
可用于任何用途，包括商业 App。可自由修改、再分发，无需署名或获得许可。

<div align="center">
<sub>如果它帮你节省了时间，点个 ⭐ 能让更多人发现它。</sub>
</div>

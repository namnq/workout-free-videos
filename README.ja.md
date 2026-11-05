<div align="center">

<a href="README.md">English</a> · <a href="README.vi.md">Tiếng Việt</a> · <a href="README.zh-CN.md">简体中文</a> · <b>日本語</b> · <a href="README.es.md">Español</a>

# 🏋️ Workout Free Videos

**構造化データ付きの、無料でループ再生できるジムエクササイズ動画 57 本。どんなフィットネスアプリにもそのまま組み込めます。**

[![License: CC0-1.0](https://img.shields.io/badge/license-CC0_1.0-blue.svg)](LICENSE)
[![Version](https://img.shields.io/github/v/tag/namnq/workout-free-videos?label=version)](https://github.com/namnq/workout-free-videos/tags)
[![Validate](https://github.com/namnq/workout-free-videos/actions/workflows/validate-library.yml/badge.svg)](https://github.com/namnq/workout-free-videos/actions/workflows/validate-library.yml)
![Exercises](https://img.shields.io/badge/exercises-57-orange.svg)
![Video](https://img.shields.io/badge/video-720p_MP4-red.svg)

[**ライブデモ**](https://galaxy-fitness.com/) ·
[クイックスタート](#-クイックスタート) ·
[データ形式](#-データ形式) ·
[エクササイズ一覧](#-エクササイズ一覧) ·
[今後の動画追加](#-動画は今後も追加予定) ·
[コントリビュート](#-コントリビュート)

</div>

---

## ✨ 特徴

- **57 種目**: 筋力トレーニング、モビリティ、リカバリーを 22 の筋群にわたって収録
- **Web 向けに最適化した動画**: 1280×720 の H.264 MP4、4〜8 秒のシームレスループ、音声なし。`faststart` 対応なのでダウンロード中から再生が始まります
- **構造化データ**: JSON + CSV で、各種目の筋群、器具、レベル、関節への負担、フォームのポイント 3 つを提供
- **6 言語対応**: 種目名とフォームのポイントは英語、ドイツ語、スペイン語、フランス語、イタリア語、日本語で収録(筋群と器具のラベルはベトナム語にも対応)
- **軽量**: 全体で約 28 MB、SHA-256 チェックサム付き
- **パブリックドメイン**: 商用アプリを含め、どこでも自由に使えます。クレジット表記は不要です

これらは GymPlan ワークアウトプランナーで実際に使われているクリップで、コミュニティ向けに公開しています。

> [!NOTE]
> すべての種目を 1 本ずつ手作業でレビュー・編集し、動画とフォームのポイントができる限り正しいテクニックを示すようにしています。

## 🚀 クイックスタート

**jsDelivr から直接リンク**(無料の CDN なのでホスティング不要)。ファイルが勝手に変わらないよう、バージョンタグを固定してください:

```
https://cdn.jsdelivr.net/gh/namnq/workout-free-videos@v2.0.0/data/exercises.json
https://cdn.jsdelivr.net/gh/namnq/workout-free-videos@v2.0.0/media/video/barbell-back-squat.mp4
```

**クリップを表示する:**

```html
<video src="media/video/barbell-back-squat.mp4" autoplay muted loop playsinline></video>
```

> [!TIP]
> iOS やほとんどのブラウザで自動再生するには `muted` + `playsinline` が必要です。

**データを検索する(JavaScript):**

```js
const base = 'https://cdn.jsdelivr.net/gh/namnq/workout-free-videos@v2.0.0/';
const exercises = await fetch(base + 'data/exercises.json').then((r) => r.json());

// 初心者向け自宅トレーニング: ダンベル、ベンチまたは器具なし、膝に負担の大きい種目は除外
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

**すべてダウンロードする:**

```bash
git clone https://github.com/namnq/workout-free-videos.git
```

> [!NOTE]
> 実際のトラフィックがあるアプリでは、直接リンクせずにファイルを自前のストレージ(S3、R2、自社サーバー)にコピーしてください。

## 📁 プロジェクト構成

```
data/
  exercises.json         全レコード(1 種目につき 1 オブジェクト)
  exercises.csv          フラットな表、英語のみ、リストは "|" で連結
  muscles.json           筋群キー -> { region, label: { en, vi } }
  equipment.json         器具キー -> { label: { en, vi } }
media/
  video/<slug>.mp4
  SHA256SUMS             全メディアファイルのチェックサム
scripts/
  validate-library.mjs   データ、ファイル、チェックサムを検証
index.html               閲覧用ギャラリー、ローカルで開けます
```

## 📋 データ形式

```jsonc
{
  "id": "c01",                       // 固定の id、再利用されることはありません
  "slug": "dumbbell-bench-press",    // 動画のファイル名
  "name": "Dumbbell Bench Press",
  "primaryMuscle": "chest",          // muscles.json のキー
  "secondaryMuscles": ["triceps", "shoulders"],
  "region": "upper",                 // upper | core | lower | mobility
  "equipment": ["dumbbell", "bench"],// equipment.json のキー、すべて必要
  "level": "beginner",               // beginner | intermediate | advanced
  "type": "compound",                // compound | isolation | mobility | recovery
  "jointStress": ["shoulder"],       // knee | lowBack | shoulder | wrist: その関節が痛む場合は避ける
  "gear": ["equipment.dumbbell", "accessory.gloves"], // あると便利な製品、"<group>.<item>"
  "cues": ["Press from mid-chest ...", "...", "..."],
  "translations": { "de": { "name": "...", "cues": ["..."] }, "es": {}, "fr": {}, "it": {}, "ja": {} },
  "video":  { "path": "media/video/dumbbell-bench-press.mp4", "bytes": 512345, "sha256": "...", "width": 1280, "height": 720, "durationSec": 7.5 }
}
```

## 🗂 エクササイズ一覧

<details>
<summary><b>全 57 種目を表示</b></summary>

| Slug | 種目 | 筋群 | 器具 | レベル | 長さ |
|---|---|---|---|---|---|
| [`dumbbell-bench-press`](media/video/dumbbell-bench-press.mp4) | ダンベルベンチプレス | 胸 | ダンベル、ベンチ | 初級 | 7.5s |
| [`incline-bench-press`](media/video/incline-bench-press.mp4) | インクラインベンチプレス | 胸 | バーベル、ベンチ | 中級 | 8s |
| [`exercise-ball-dumbbell-bench-press`](media/video/exercise-ball-dumbbell-bench-press.mp4) | スタビリティボール・ダンベルプレス | 胸 | ダンベル、バランスボール | 中級 | 8s |
| [`chest-dip`](media/video/chest-dip.mp4) | チェストディップ | 胸 | ディップバー | 中級 | 7.7s |
| [`military-press`](media/video/military-press.mp4) | オーバーヘッドプレス | 肩 | バーベル | 中級 | 8s |
| [`dumbbell-lateral-raise`](media/video/dumbbell-lateral-raise.mp4) | ダンベルサイドレイズ | 肩 | ダンベル | 初級 | 6.8s |
| [`bent-over-low-pulley-rear-delt-fly`](media/video/bent-over-low-pulley-rear-delt-fly.mp4) | ケーブルリアデルトフライ | 肩 | ケーブルマシン | 中級 | 8s |
| [`close-grip-bench-press`](media/video/close-grip-bench-press.mp4) | クローズグリップベンチプレス | 上腕三頭筋 | バーベル、ベンチ | 中級 | 8s |
| [`ez-bar-skullcrusher`](media/video/ez-bar-skullcrusher.mp4) | EZバー・スカルクラッシャー | 上腕三頭筋 | EZバー、ベンチ | 中級 | 7s |
| [`weighted-tricep-dips`](media/video/weighted-tricep-dips.mp4) | ウェイテッド・トライセプスディップ | 上腕三頭筋 | ディップバー | 上級 | 4.7s |
| [`standing-barbell-curl`](media/video/standing-barbell-curl.mp4) | スタンディング・バーベルカール | 上腕二頭筋 | バーベル | 初級 | 8s |
| [`incline-dumbbell-curl`](media/video/incline-dumbbell-curl.mp4) | インクラインダンベルカール | 上腕二頭筋 | ダンベル、ベンチ | 中級 | 8s |
| [`dumbbell-hammer-preacher-curl`](media/video/dumbbell-hammer-preacher-curl.mp4) | ハンマー・プリーチャーカール | 上腕二頭筋 | ダンベル、ベンチ | 中級 | 7.7s |
| [`seated-barbell-wrist-curl`](media/video/seated-barbell-wrist-curl.mp4) | シーテッド・リストカール | 前腕 | バーベル、ベンチ | 初級 | 8s |
| [`reverse-grip-barbell-curl`](media/video/reverse-grip-barbell-curl.mp4) | リバースグリップEZカール | 前腕 | EZバー | 中級 | 8s |
| [`plate-pinch-carry`](media/video/plate-pinch-carry.mp4) | プレート・ピンチキャリー | 前腕 | プレート | 初級 | 8s |
| [`barbell-shrug`](media/video/barbell-shrug.mp4) | バーベルシュラッグ | 僧帽筋 | バーベル | 初級 | 6.3s |
| [`dumbbell-shrug`](media/video/dumbbell-shrug.mp4) | ダンベルシュラッグ | 僧帽筋 | ダンベル | 初級 | 8s |
| [`barbell-upright-row`](media/video/barbell-upright-row.mp4) | バーベル・アップライトロウ | 僧帽筋 | バーベル | 中級 | 4.3s |
| [`seated-cable-row`](media/video/seated-cable-row.mp4) | シーテッドケーブルロウ | 背中上部 | ケーブルマシン | 初級 | 7.3s |
| [`machine-t-bar-row`](media/video/machine-t-bar-row.mp4) | チェストサポートTバーロウ | 背中上部 | マシン | 初級 | 7.2s |
| [`bent-over-row`](media/video/bent-over-row.mp4) | ベントオーバーロウ | 背中上部 | バーベル | 中級 | 8s |
| [`lat-pull-down`](media/video/lat-pull-down.mp4) | ラットプルダウン | 広背筋 | ケーブルマシン | 初級 | 8s |
| [`wide-grip-pull-up`](media/video/wide-grip-pull-up.mp4) | ワイドグリップ懸垂 | 広背筋 | 懸垂バー | 中級 | 5.8s |
| [`straight-arm-lat-pull-down`](media/video/straight-arm-lat-pull-down.mp4) | ストレートアーム・プルダウン | 広背筋 | ケーブルマシン | 中級 | 8s |
| [`superman`](media/video/superman.mp4) | スーパーマン | 腰 | 自重 | 初級 | 8s |
| [`sit-up`](media/video/sit-up.mp4) | シットアップ | 腹筋 | 自重 | 初級 | 5s |
| [`lying-floor-leg-raise`](media/video/lying-floor-leg-raise.mp4) | ライイング・レッグレイズ | 腹筋 | 自重 | 初級 | 8s |
| [`weighted-crunch`](media/video/weighted-crunch.mp4) | プレート・クランチ | 腹筋 | プレート | 中級 | 8s |
| [`tall-kneeling-cable-lift`](media/video/tall-kneeling-cable-lift.mp4) | ニーリング・ケーブルリフト | 腹斜筋 | ケーブルマシン | 初級 | 8s |
| [`tall-kneeling-cable-chop`](media/video/tall-kneeling-cable-chop.mp4) | ニーリング・ケーブルチョップ | 腹斜筋 | ケーブルマシン | 中級 | 8s |
| [`split-stance-cable-lift`](media/video/split-stance-cable-lift.mp4) | スプリットスタンス・ケーブルリフト | 腹斜筋 | ケーブルマシン | 中級 | 8s |
| [`barbell-hip-thrust`](media/video/barbell-hip-thrust.mp4) | バーベルヒップスラスト | 臀筋 | バーベル、ベンチ | 中級 | 7s |
| [`hyperextension`](media/video/hyperextension.mp4) | バックエクステンション | 臀筋 | マシン | 初級 | 8s |
| [`good-mornings`](media/video/good-mornings.mp4) | グッドモーニング | 臀筋 | バーベル | 上級 | 8s |
| [`barbell-back-squat`](media/video/barbell-back-squat.mp4) | バーベルバックスクワット | 大腿四頭筋 | バーベル | 中級 | 8s |
| [`leg-press`](media/video/leg-press.mp4) | レッグプレス | 大腿四頭筋 | マシン | 初級 | 8s |
| [`machine-hack-squat`](media/video/machine-hack-squat.mp4) | ハックスクワット | 大腿四頭筋 | マシン | 中級 | 8s |
| [`exercise-ball-wall-squat`](media/video/exercise-ball-wall-squat.mp4) | スタビリティボール・ウォールスクワット | 大腿四頭筋 | バランスボール | 初級 | 8s |
| [`stiff-leg-deadlift`](media/video/stiff-leg-deadlift.mp4) | スティッフレッグ・デッドリフト | ハムストリングス | バーベル | 中級 | 8s |
| [`seated-leg-curl`](media/video/seated-leg-curl.mp4) | シーテッドレッグカール | ハムストリングス | マシン | 初級 | 6.8s |
| [`exercise-ball-leg-curl`](media/video/exercise-ball-leg-curl.mp4) | スタビリティボール・レッグカール | ハムストリングス | バランスボール | 初級 | 8s |
| [`nordic-hamstring-curl`](media/video/nordic-hamstring-curl.mp4) | ノルディック・ハムストリングカール | ハムストリングス | 自重 | 上級 | 8s |
| [`standing-machine-calf-raise`](media/video/standing-machine-calf-raise.mp4) | スタンディング・カーフレイズ | ふくらはぎ | マシン | 初級 | 8s |
| [`seated-calf-raise`](media/video/seated-calf-raise.mp4) | シーテッド・カーフレイズ | ふくらはぎ | マシン | 初級 | 5.5s |
| [`45-degree-leg-press-calf-raise`](media/video/45-degree-leg-press-calf-raise.mp4) | レッグプレス・カーフレイズ | ふくらはぎ | マシン | 初級 | 8s |
| [`hip-adduction-machine`](media/video/hip-adduction-machine.mp4) | ヒップアダクションマシン | 内転筋 | マシン | 初級 | 8s |
| [`alternating-lateral-lunge-with-overhead-reach`](media/video/alternating-lateral-lunge-with-overhead-reach.mp4) | オーバーヘッドリーチ付きラテラルランジ | 内転筋 | 自重 | 初級 | 8s |
| [`deep-squat-prying`](media/video/deep-squat-prying.mp4) | ディープスクワット・プライ | 内転筋 | 自重 | 初級 | 8s |
| [`cable-hip-abduction`](media/video/cable-hip-abduction.mp4) | ケーブルヒップアブダクション | 外転筋 | ケーブルマシン | 初級 | 8s |
| [`cradle-walk`](media/video/cradle-walk.mp4) | クレードルウォーク | 股関節屈筋 | 自重 | 初級 | 8s |
| [`fire-hydrant-circles`](media/video/fire-hydrant-circles.mp4) | ファイヤーハイドラント・サークル | 股関節屈筋 | 自重 | 初級 | 6.8s |
| [`kneeling-posterior-hip-capsule-mobilization`](media/video/kneeling-posterior-hip-capsule-mobilization.mp4) | ニーリング・股関節包モビライゼーション | 股関節屈筋 | 自重 | 初級 | 6.5s |
| [`it-band-foam-rolling`](media/video/it-band-foam-rolling.mp4) | 腸脛靭帯のフォームローリング | 腸脛靭帯 | フォームローラー | 初級 | 8s |
| [`plantar-fascia-lacrosse-ball`](media/video/plantar-fascia-lacrosse-ball.mp4) | 足底筋膜リリース | 足 | ラクロスボール | 初級 | 8s |
| [`palmar-fascia-lacrosse-ball`](media/video/palmar-fascia-lacrosse-ball.mp4) | 手のひらリリース | 手 | ラクロスボール | 初級 | 8s |
| [`neck-tiger-tail`](media/video/neck-tiger-tail.mp4) | 首のリリース | 首 | フォームローラー | 初級 | 8s |

</details>

## ✅ ダウンロードの検証

```bash
node scripts/validate-library.mjs      # Node 18+、インストール不要
# またはチェックサムのみ:
shasum -a 256 -c media/SHA256SUMS      # macOS
sha256sum -c media/SHA256SUMS          # Linux
```

## 🌱 動画は今後も追加予定

これはまだ始まりにすぎません。このライブラリがコミュニティの役に立つようなら、撮影を続けて種目を追加していきます。

そうなってほしいと思ったら、⭐ でリポジトリにスターを付け、次に欲しい種目名を書いて [issue を作成](https://github.com/namnq/workout-free-videos/issues/new)してください。リクエストの多い種目から優先して撮影します。

## 🤝 コントリビュート

フォームのポイントの修正や新しい翻訳を歓迎します:

1. `data/exercises.json` を編集する
2. `node scripts/validate-library.mjs` を実行する
3. プルリクエストを作成する

id と slug は固定です。名前を変更せず、新しいエントリを追加してください。新しい映像はご自身で撮影したもので、CC0 1.0 で公開する必要があります。

## ⚠️ 免責事項

フォームのポイントは短いコーチング用のリマインダーであり、医学的なアドバイスではありません。痛みやケガがある方は、資格を持つ専門家に相談してください。`jointStress` は絞り込み用のヒントであり、診断ではありません。

## 📄 ライセンス

このリポジトリのすべて(動画、データ、コード)は [CC0 1.0 Universal](LICENSE) のもとで公開され、パブリックドメインに提供されています。
商用アプリを含め、どんな用途にも使えます。編集も再配布も自由です。クレジット表記や許可は不要です。

<div align="center">
<sub>時間の節約に役立ったら、⭐ を付けていただけると他の人も見つけやすくなります。</sub>
</div>

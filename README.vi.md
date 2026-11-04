<div align="center">

<a href="README.md">English</a> · <b>Tiếng Việt</b>

# 🏋️ Workout Free Videos

**57 video bài tập gym lặp liền miễn phí, kèm dữ liệu có cấu trúc, dùng ngay cho mọi app thể hình.**

[![License: CC0-1.0](https://img.shields.io/badge/license-CC0_1.0-blue.svg)](LICENSE)
[![Version](https://img.shields.io/github/v/tag/namnq/workout-free-videos?label=version)](https://github.com/namnq/workout-free-videos/tags)
[![Validate](https://github.com/namnq/workout-free-videos/actions/workflows/validate-library.yml/badge.svg)](https://github.com/namnq/workout-free-videos/actions/workflows/validate-library.yml)
![Exercises](https://img.shields.io/badge/exercises-57-orange.svg)
![Video](https://img.shields.io/badge/video-720p_MP4-red.svg)

[**Xem demo**](https://galaxy-fitness.com/) ·
[Bắt đầu nhanh](#-bắt-đầu-nhanh) ·
[Định dạng dữ liệu](#-định-dạng-dữ-liệu) ·
[Danh sách bài tập](#-danh-sách-bài-tập) ·
[Đóng góp](#-đóng-góp)

</div>

---

## ✨ Tính năng

- **57 bài tập**: sức mạnh, linh hoạt và phục hồi, bao phủ 22 nhóm cơ
- **Video tối ưu cho web**: MP4 H.264 1280×720, lặp liền 4–8 giây, không tiếng, `faststart` nên vừa tải vừa phát
- **Dữ liệu có cấu trúc**: JSON + CSV gồm nhóm cơ, dụng cụ, cấp độ, khớp cần lưu ý và 3 gợi ý kỹ thuật cho mỗi bài
- **6 ngôn ngữ**: tên bài và gợi ý kỹ thuật bằng tiếng Anh, Đức, Tây Ban Nha, Pháp, Ý, Nhật (tên nhóm cơ và dụng cụ có thêm tiếng Việt)
- **Nhẹ**: tổng cộng ~28 MB, kèm checksum SHA-256
- **Public domain**: dùng ở bất cứ đâu, kể cả app thương mại, không cần ghi nguồn

Đây chính là các clip dùng trong app lên lịch tập GymPlan, được chia sẻ cho cộng đồng.

## 🚀 Bắt đầu nhanh

**Nhúng trực tiếp qua jsDelivr** (CDN miễn phí, không cần hosting). Hãy ghim theo tag phiên bản để file không bị đổi bất ngờ:

```
https://cdn.jsdelivr.net/gh/namnq/workout-free-videos@v2.0.0/data/exercises.json
https://cdn.jsdelivr.net/gh/namnq/workout-free-videos@v2.0.0/media/video/barbell-back-squat.mp4
```

**Hiển thị clip:**

```html
<video src="media/video/barbell-back-squat.mp4" autoplay muted loop playsinline></video>
```

> [!TIP]
> Cần `muted` + `playsinline` để video tự phát trên iOS và hầu hết trình duyệt.

**Truy vấn dữ liệu (JavaScript):**

```js
const base = 'https://cdn.jsdelivr.net/gh/namnq/workout-free-videos@v2.0.0/';
const exercises = await fetch(base + 'data/exercises.json').then((r) => r.json());

// Bài tập tại nhà cho người mới: tạ đơn, ghế hoặc không dụng cụ, không nặng cho đầu gối
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

**Tải toàn bộ về máy:**

```bash
git clone https://github.com/namnq/workout-free-videos.git
```

> [!NOTE]
> Nếu app có lượng truy cập thật, hãy chép file sang kho lưu trữ của bạn (S3, R2, server riêng) thay vì nhúng trực tiếp.

## 📁 Cấu trúc thư mục

```
data/
  exercises.json         bản ghi đầy đủ (mỗi bài tập một object)
  exercises.csv          bảng phẳng, chỉ tiếng Anh, danh sách nối bằng "|"
  muscles.json           mã nhóm cơ -> { region, label: { en, vi } }
  equipment.json         mã dụng cụ -> { label: { en, vi } }
media/
  video/<slug>.mp4
  SHA256SUMS             checksum của mọi file media
scripts/
  validate-library.mjs   kiểm tra dữ liệu, file và checksum
index.html               trang duyệt clip, mở trực tiếp trên máy
```

## 📋 Định dạng dữ liệu

```jsonc
{
  "id": "c01",                       // id cố định, không bao giờ dùng lại
  "slug": "dumbbell-bench-press",    // tên file video
  "name": "Dumbbell Bench Press",
  "primaryMuscle": "chest",          // mã trong muscles.json
  "secondaryMuscles": ["triceps", "shoulders"],
  "region": "upper",                 // upper | core | lower | mobility
  "equipment": ["dumbbell", "bench"],// mã trong equipment.json, cần đủ tất cả
  "level": "beginner",               // beginner | intermediate | advanced
  "type": "compound",                // compound | isolation | mobility | recovery
  "jointStress": ["shoulder"],       // knee | lowBack | shoulder | wrist: bỏ qua nếu khớp đó đang đau
  "gear": ["equipment.dumbbell", "accessory.gloves"], // sản phẩm hữu ích, "<nhóm>.<món>"
  "cues": ["Press from mid-chest ...", "...", "..."],
  "translations": { "de": { "name": "...", "cues": ["..."] }, "es": {}, "fr": {}, "it": {}, "ja": {} },
  "video":  { "path": "media/video/dumbbell-bench-press.mp4", "bytes": 512345, "sha256": "...", "width": 1280, "height": 720, "durationSec": 7.5 }
}
```

## 🗂 Danh sách bài tập

<details>
<summary><b>Xem đủ 57 bài tập</b></summary>

| Slug | Bài tập | Nhóm cơ | Dụng cụ | Cấp độ | Độ dài |
|---|---|---|---|---|---|
| [`dumbbell-bench-press`](media/video/dumbbell-bench-press.mp4) | Dumbbell Bench Press | Ngực | Tạ đơn, Ghế tập | Cơ bản | 7.5s |
| [`incline-bench-press`](media/video/incline-bench-press.mp4) | Incline Bench Press | Ngực | Tạ đòn & giá, Ghế tập | Trung bình | 8s |
| [`exercise-ball-dumbbell-bench-press`](media/video/exercise-ball-dumbbell-bench-press.mp4) | Stability Ball Dumbbell Press | Ngực | Tạ đơn, Bóng tập | Trung bình | 8s |
| [`chest-dip`](media/video/chest-dip.mp4) | Chest Dip | Ngực | Xà kép | Trung bình | 7.7s |
| [`military-press`](media/video/military-press.mp4) | Overhead Press | Vai | Tạ đòn & giá | Trung bình | 8s |
| [`dumbbell-lateral-raise`](media/video/dumbbell-lateral-raise.mp4) | Dumbbell Lateral Raise | Vai | Tạ đơn | Cơ bản | 6.8s |
| [`bent-over-low-pulley-rear-delt-fly`](media/video/bent-over-low-pulley-rear-delt-fly.mp4) | Cable Rear Delt Fly | Vai | Máy cáp | Trung bình | 8s |
| [`close-grip-bench-press`](media/video/close-grip-bench-press.mp4) | Close-Grip Bench Press | Tay sau | Tạ đòn & giá, Ghế tập | Trung bình | 8s |
| [`ez-bar-skullcrusher`](media/video/ez-bar-skullcrusher.mp4) | EZ Bar Skullcrusher | Tay sau | Đòn EZ, Ghế tập | Trung bình | 7s |
| [`weighted-tricep-dips`](media/video/weighted-tricep-dips.mp4) | Weighted Tricep Dip | Tay sau | Xà kép | Nâng cao | 4.7s |
| [`standing-barbell-curl`](media/video/standing-barbell-curl.mp4) | Standing Barbell Curl | Tay trước | Tạ đòn & giá | Cơ bản | 8s |
| [`incline-dumbbell-curl`](media/video/incline-dumbbell-curl.mp4) | Incline Dumbbell Curl | Tay trước | Tạ đơn, Ghế tập | Trung bình | 8s |
| [`dumbbell-hammer-preacher-curl`](media/video/dumbbell-hammer-preacher-curl.mp4) | Hammer Preacher Curl | Tay trước | Tạ đơn, Ghế tập | Trung bình | 7.7s |
| [`seated-barbell-wrist-curl`](media/video/seated-barbell-wrist-curl.mp4) | Seated Wrist Curl | Cẳng tay | Tạ đòn & giá, Ghế tập | Cơ bản | 8s |
| [`reverse-grip-barbell-curl`](media/video/reverse-grip-barbell-curl.mp4) | Reverse-Grip EZ Curl | Cẳng tay | Đòn EZ | Trung bình | 8s |
| [`plate-pinch-carry`](media/video/plate-pinch-carry.mp4) | Plate Pinch Carry | Cẳng tay | Bánh tạ | Cơ bản | 8s |
| [`barbell-shrug`](media/video/barbell-shrug.mp4) | Barbell Shrug | Cơ thang | Tạ đòn & giá | Cơ bản | 6.3s |
| [`dumbbell-shrug`](media/video/dumbbell-shrug.mp4) | Dumbbell Shrug | Cơ thang | Tạ đơn | Cơ bản | 8s |
| [`barbell-upright-row`](media/video/barbell-upright-row.mp4) | Barbell Upright Row | Cơ thang | Tạ đòn & giá | Trung bình | 4.3s |
| [`seated-cable-row`](media/video/seated-cable-row.mp4) | Seated Cable Row | Lưng trên | Máy cáp | Cơ bản | 7.3s |
| [`machine-t-bar-row`](media/video/machine-t-bar-row.mp4) | Chest-Supported T-Bar Row | Lưng trên | Máy tập | Cơ bản | 7.2s |
| [`bent-over-row`](media/video/bent-over-row.mp4) | Barbell Bent-Over Row | Lưng trên | Tạ đòn & giá | Trung bình | 8s |
| [`lat-pull-down`](media/video/lat-pull-down.mp4) | Lat Pulldown | Xô | Máy cáp | Cơ bản | 8s |
| [`wide-grip-pull-up`](media/video/wide-grip-pull-up.mp4) | Wide-Grip Pull-Up | Xô | Xà đơn | Trung bình | 5.8s |
| [`straight-arm-lat-pull-down`](media/video/straight-arm-lat-pull-down.mp4) | Straight-Arm Pulldown | Xô | Máy cáp | Trung bình | 8s |
| [`superman`](media/video/superman.mp4) | Superman | Lưng dưới | Không dụng cụ | Cơ bản | 8s |
| [`sit-up`](media/video/sit-up.mp4) | Sit-Up | Bụng | Không dụng cụ | Cơ bản | 5s |
| [`lying-floor-leg-raise`](media/video/lying-floor-leg-raise.mp4) | Lying Leg Raise | Bụng | Không dụng cụ | Cơ bản | 8s |
| [`weighted-crunch`](media/video/weighted-crunch.mp4) | Weighted Plate Crunch | Bụng | Bánh tạ | Trung bình | 8s |
| [`tall-kneeling-cable-lift`](media/video/tall-kneeling-cable-lift.mp4) | Kneeling Cable Lift | Liên sườn | Máy cáp | Cơ bản | 8s |
| [`tall-kneeling-cable-chop`](media/video/tall-kneeling-cable-chop.mp4) | Kneeling Cable Chop | Liên sườn | Máy cáp | Trung bình | 8s |
| [`split-stance-cable-lift`](media/video/split-stance-cable-lift.mp4) | Split-Stance Cable Lift | Liên sườn | Máy cáp | Trung bình | 8s |
| [`barbell-hip-thrust`](media/video/barbell-hip-thrust.mp4) | Barbell Hip Thrust | Mông | Tạ đòn & giá, Ghế tập | Trung bình | 7s |
| [`hyperextension`](media/video/hyperextension.mp4) | Back Extension | Mông | Máy tập | Cơ bản | 8s |
| [`good-mornings`](media/video/good-mornings.mp4) | Good Morning | Mông | Tạ đòn & giá | Nâng cao | 8s |
| [`barbell-back-squat`](media/video/barbell-back-squat.mp4) | Barbell Back Squat | Đùi trước | Tạ đòn & giá | Trung bình | 8s |
| [`leg-press`](media/video/leg-press.mp4) | Leg Press | Đùi trước | Máy tập | Cơ bản | 8s |
| [`machine-hack-squat`](media/video/machine-hack-squat.mp4) | Hack Squat | Đùi trước | Máy tập | Trung bình | 8s |
| [`exercise-ball-wall-squat`](media/video/exercise-ball-wall-squat.mp4) | Stability Ball Wall Squat | Đùi trước | Bóng tập | Cơ bản | 8s |
| [`stiff-leg-deadlift`](media/video/stiff-leg-deadlift.mp4) | Stiff-Leg Deadlift | Đùi sau | Tạ đòn & giá | Trung bình | 8s |
| [`seated-leg-curl`](media/video/seated-leg-curl.mp4) | Seated Leg Curl | Đùi sau | Máy tập | Cơ bản | 6.8s |
| [`exercise-ball-leg-curl`](media/video/exercise-ball-leg-curl.mp4) | Stability Ball Leg Curl | Đùi sau | Bóng tập | Cơ bản | 8s |
| [`nordic-hamstring-curl`](media/video/nordic-hamstring-curl.mp4) | Nordic Hamstring Curl | Đùi sau | Không dụng cụ | Nâng cao | 8s |
| [`standing-machine-calf-raise`](media/video/standing-machine-calf-raise.mp4) | Standing Calf Raise | Bắp chân | Máy tập | Cơ bản | 8s |
| [`seated-calf-raise`](media/video/seated-calf-raise.mp4) | Seated Calf Raise | Bắp chân | Máy tập | Cơ bản | 5.5s |
| [`45-degree-leg-press-calf-raise`](media/video/45-degree-leg-press-calf-raise.mp4) | Leg Press Calf Raise | Bắp chân | Máy tập | Cơ bản | 8s |
| [`hip-adduction-machine`](media/video/hip-adduction-machine.mp4) | Hip Adduction Machine | Đùi trong | Máy tập | Cơ bản | 8s |
| [`alternating-lateral-lunge-with-overhead-reach`](media/video/alternating-lateral-lunge-with-overhead-reach.mp4) | Lateral Lunge with Reach | Đùi trong | Không dụng cụ | Cơ bản | 8s |
| [`deep-squat-prying`](media/video/deep-squat-prying.mp4) | Deep Squat Pry | Đùi trong | Không dụng cụ | Cơ bản | 8s |
| [`cable-hip-abduction`](media/video/cable-hip-abduction.mp4) | Cable Hip Abduction | Hông ngoài | Máy cáp | Cơ bản | 8s |
| [`cradle-walk`](media/video/cradle-walk.mp4) | Cradle Walk | Gập hông | Không dụng cụ | Cơ bản | 8s |
| [`fire-hydrant-circles`](media/video/fire-hydrant-circles.mp4) | Fire Hydrant Circles | Gập hông | Không dụng cụ | Cơ bản | 6.8s |
| [`kneeling-posterior-hip-capsule-mobilization`](media/video/kneeling-posterior-hip-capsule-mobilization.mp4) | Kneeling Hip Capsule Mobilization | Gập hông | Không dụng cụ | Cơ bản | 6.5s |
| [`it-band-foam-rolling`](media/video/it-band-foam-rolling.mp4) | IT Band Foam Rolling | Dải chậu chày | Con lăn | Cơ bản | 8s |
| [`plantar-fascia-lacrosse-ball`](media/video/plantar-fascia-lacrosse-ball.mp4) | Plantar Fascia Release | Bàn chân | Bóng massage | Cơ bản | 8s |
| [`palmar-fascia-lacrosse-ball`](media/video/palmar-fascia-lacrosse-ball.mp4) | Palm Release | Bàn tay | Bóng massage | Cơ bản | 8s |
| [`neck-tiger-tail`](media/video/neck-tiger-tail.mp4) | Neck Release | Cổ | Con lăn | Cơ bản | 8s |

</details>

## ✅ Kiểm tra bản tải về

```bash
node scripts/validate-library.mjs      # Node 18+, không cần cài gì
# hoặc chỉ kiểm tra checksum:
shasum -a 256 -c media/SHA256SUMS      # macOS
sha256sum -c media/SHA256SUMS          # Linux
```

## 🤝 Đóng góp

Rất hoan nghênh sửa gợi ý kỹ thuật và thêm bản dịch:

1. Sửa `data/exercises.json`
2. Chạy `node scripts/validate-library.mjs`
3. Mở pull request

Id và slug là cố định: đừng đổi tên, hãy thêm bản ghi mới. Video mới phải do bạn tự quay và phát hành theo CC0 1.0.

## ⚠️ Lưu ý an toàn

Các gợi ý kỹ thuật chỉ là lời nhắc ngắn khi tập, không phải lời khuyên y tế. Người đang đau hoặc chấn thương nên hỏi ý kiến chuyên gia. `jointStress` là gợi ý để lọc bài, không phải chẩn đoán.

## 📄 Giấy phép

Toàn bộ repo (video, dữ liệu và code) phát hành theo [CC0 1.0 Universal](LICENSE), tức là thuộc phạm vi công cộng (public domain).
Dùng cho mọi mục đích, kể cả app thương mại. Được chỉnh sửa và phân phối lại. Không cần ghi nguồn, không cần xin phép.

<div align="center">
<sub>Nếu repo giúp bạn tiết kiệm thời gian, hãy tặng một ⭐ để người khác dễ tìm thấy.</sub>
</div>

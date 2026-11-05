<div align="center">

<a href="README.md">English</a> · <a href="README.vi.md">Tiếng Việt</a> · <a href="README.zh-CN.md">简体中文</a> · <a href="README.ja.md">日本語</a> · <b>Español</b>

# 🏋️ Workout Free Videos

**57 videos gratuitos de ejercicios de gimnasio en bucle, con datos estructurados: intégralos en cualquier app de fitness.**

[![License: CC0-1.0](https://img.shields.io/badge/license-CC0_1.0-blue.svg)](LICENSE)
[![Version](https://img.shields.io/github/v/tag/namnq/workout-free-videos?label=version)](https://github.com/namnq/workout-free-videos/tags)
[![Validate](https://github.com/namnq/workout-free-videos/actions/workflows/validate-library.yml/badge.svg)](https://github.com/namnq/workout-free-videos/actions/workflows/validate-library.yml)
![Exercises](https://img.shields.io/badge/exercises-57-orange.svg)
![Video](https://img.shields.io/badge/video-720p_MP4-red.svg)

[**Demo en vivo**](https://galaxy-fitness.com/) ·
[Inicio rápido](#-inicio-rápido) ·
[Formato de datos](#-formato-de-datos) ·
[Lista de ejercicios](#-lista-de-ejercicios) ·
[Más videos](#-próximamente-más-videos) ·
[Cómo contribuir](#-cómo-contribuir)

</div>

---

## ✨ Características

- **57 ejercicios**: fuerza, movilidad y recuperación para 22 grupos musculares
- **Video listo para la web**: MP4 H.264 a 1280×720, bucles continuos de 4–8 s, sin audio y con `faststart`, así que la reproducción empieza mientras se descarga
- **Datos estructurados**: JSON + CSV con músculos, equipamiento, nivel, articulaciones sensibles y 3 indicaciones técnicas por ejercicio
- **6 idiomas**: nombres e indicaciones en inglés, alemán, español, francés, italiano y japonés (las etiquetas de músculos y equipamiento también en vietnamita)
- **Ligero**: unos 28 MB en total, con checksums SHA-256
- **Dominio público**: úsalo donde quieras, incluso en apps comerciales. No hace falta dar crédito

Son los mismos clips que usa el planificador de entrenamientos GymPlan, liberados para la comunidad.

> [!NOTE]
> Cada ejercicio se revisó y editó a mano, uno por uno, para que el video y las indicaciones muestren la técnica más correcta posible.

## 🚀 Inicio rápido

**Enlaza directamente desde jsDelivr** (CDN gratuita, sin necesidad de hosting). Fija una etiqueta de versión para que los archivos nunca cambien sin que lo sepas:

```
https://cdn.jsdelivr.net/gh/namnq/workout-free-videos@v2.0.0/data/exercises.json
https://cdn.jsdelivr.net/gh/namnq/workout-free-videos@v2.0.0/media/video/barbell-back-squat.mp4
```

**Muestra un clip:**

```html
<video src="media/video/barbell-back-squat.mp4" autoplay muted loop playsinline></video>
```

> [!TIP]
> `muted` + `playsinline` son obligatorios para la reproducción automática en iOS y en la mayoría de los navegadores.

**Consulta los datos (JavaScript):**

```js
const base = 'https://cdn.jsdelivr.net/gh/namnq/workout-free-videos@v2.0.0/';
const exercises = await fetch(base + 'data/exercises.json').then((r) => r.json());

// Rutina en casa para principiantes: mancuernas, banco o sin equipamiento, nada exigente para las rodillas
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

**Descárgalo todo:**

```bash
git clone https://github.com/namnq/workout-free-videos.git
```

> [!NOTE]
> Si tu app tiene tráfico real, copia los archivos a tu propio almacenamiento (S3, R2, tu servidor) en lugar de enlazarlos directamente.

## 📁 Estructura del proyecto

```
data/
  exercises.json         registros completos (un objeto por ejercicio)
  exercises.csv          tabla plana, solo en inglés, listas unidas con "|"
  muscles.json           clave de músculo -> { region, label: { en, vi } }
  equipment.json         clave de equipamiento -> { label: { en, vi } }
media/
  video/<slug>.mp4
  SHA256SUMS             checksums de cada archivo multimedia
scripts/
  validate-library.mjs   comprueba datos, archivos y checksums
index.html               galería navegable, ábrela en local
```

## 📋 Formato de datos

```jsonc
{
  "id": "c01",                       // id estable, nunca se reutiliza
  "slug": "dumbbell-bench-press",    // nombre del archivo de video
  "name": "Dumbbell Bench Press",
  "primaryMuscle": "chest",          // clave en muscles.json
  "secondaryMuscles": ["triceps", "shoulders"],
  "region": "upper",                 // upper | core | lower | mobility
  "equipment": ["dumbbell", "bench"],// claves en equipment.json, todas necesarias
  "level": "beginner",               // beginner | intermediate | advanced
  "type": "compound",                // compound | isolation | mobility | recovery
  "jointStress": ["shoulder"],       // knee | lowBack | shoulder | wrist: evítalo si esa articulación duele
  "gear": ["equipment.dumbbell", "accessory.gloves"], // productos útiles, "<grupo>.<artículo>"
  "cues": ["Press from mid-chest ...", "...", "..."],
  "translations": { "de": { "name": "...", "cues": ["..."] }, "es": {}, "fr": {}, "it": {}, "ja": {} },
  "video":  { "path": "media/video/dumbbell-bench-press.mp4", "bytes": 512345, "sha256": "...", "width": 1280, "height": 720, "durationSec": 7.5 }
}
```

## 🗂 Lista de ejercicios

<details>
<summary><b>Ver los 57 ejercicios</b></summary>

| Slug | Ejercicio | Músculo | Equipamiento | Nivel | Duración |
|---|---|---|---|---|---|
| [`dumbbell-bench-press`](media/video/dumbbell-bench-press.mp4) | Press de banca con mancuernas | Pecho | Mancuernas, Banco | Principiante | 7.5s |
| [`incline-bench-press`](media/video/incline-bench-press.mp4) | Press de banca inclinado | Pecho | Barra y rack, Banco | Intermedio | 8s |
| [`exercise-ball-dumbbell-bench-press`](media/video/exercise-ball-dumbbell-bench-press.mp4) | Press con mancuernas sobre fitball | Pecho | Mancuernas, Fitball | Intermedio | 8s |
| [`chest-dip`](media/video/chest-dip.mp4) | Fondos para pecho | Pecho | Paralelas | Intermedio | 7.7s |
| [`military-press`](media/video/military-press.mp4) | Press militar | Hombros | Barra y rack | Intermedio | 8s |
| [`dumbbell-lateral-raise`](media/video/dumbbell-lateral-raise.mp4) | Elevaciones laterales con mancuernas | Hombros | Mancuernas | Principiante | 6.8s |
| [`bent-over-low-pulley-rear-delt-fly`](media/video/bent-over-low-pulley-rear-delt-fly.mp4) | Pájaros en polea | Hombros | Polea | Intermedio | 8s |
| [`close-grip-bench-press`](media/video/close-grip-bench-press.mp4) | Press de banca con agarre cerrado | Tríceps | Barra y rack, Banco | Intermedio | 8s |
| [`ez-bar-skullcrusher`](media/video/ez-bar-skullcrusher.mp4) | Rompecráneos con barra Z | Tríceps | Barra Z, Banco | Intermedio | 7s |
| [`weighted-tricep-dips`](media/video/weighted-tricep-dips.mp4) | Fondos de tríceps con lastre | Tríceps | Paralelas | Avanzado | 4.7s |
| [`standing-barbell-curl`](media/video/standing-barbell-curl.mp4) | Curl de bíceps con barra de pie | Bíceps | Barra y rack | Principiante | 8s |
| [`incline-dumbbell-curl`](media/video/incline-dumbbell-curl.mp4) | Curl con mancuernas en banco inclinado | Bíceps | Mancuernas, Banco | Intermedio | 8s |
| [`dumbbell-hammer-preacher-curl`](media/video/dumbbell-hammer-preacher-curl.mp4) | Curl martillo en banco predicador | Bíceps | Mancuernas, Banco | Intermedio | 7.7s |
| [`seated-barbell-wrist-curl`](media/video/seated-barbell-wrist-curl.mp4) | Curl de muñeca sentado | Antebrazos | Barra y rack, Banco | Principiante | 8s |
| [`reverse-grip-barbell-curl`](media/video/reverse-grip-barbell-curl.mp4) | Curl inverso con barra Z | Antebrazos | Barra Z | Intermedio | 8s |
| [`plate-pinch-carry`](media/video/plate-pinch-carry.mp4) | Paseo del granjero con discos | Antebrazos | Disco | Principiante | 8s |
| [`barbell-shrug`](media/video/barbell-shrug.mp4) | Encogimientos con barra | Trapecios | Barra y rack | Principiante | 6.3s |
| [`dumbbell-shrug`](media/video/dumbbell-shrug.mp4) | Encogimientos con mancuernas | Trapecios | Mancuernas | Principiante | 8s |
| [`barbell-upright-row`](media/video/barbell-upright-row.mp4) | Remo al mentón con barra | Trapecios | Barra y rack | Intermedio | 4.3s |
| [`seated-cable-row`](media/video/seated-cable-row.mp4) | Remo sentado en polea | Espalda alta | Polea | Principiante | 7.3s |
| [`machine-t-bar-row`](media/video/machine-t-bar-row.mp4) | Remo en T con apoyo de pecho | Espalda alta | Máquina | Principiante | 7.2s |
| [`bent-over-row`](media/video/bent-over-row.mp4) | Remo con barra inclinado | Espalda alta | Barra y rack | Intermedio | 8s |
| [`lat-pull-down`](media/video/lat-pull-down.mp4) | Jalón al pecho | Dorsales | Polea | Principiante | 8s |
| [`wide-grip-pull-up`](media/video/wide-grip-pull-up.mp4) | Dominadas con agarre ancho | Dorsales | Barra de dominadas | Intermedio | 5.8s |
| [`straight-arm-lat-pull-down`](media/video/straight-arm-lat-pull-down.mp4) | Jalón con brazos rectos | Dorsales | Polea | Intermedio | 8s |
| [`superman`](media/video/superman.mp4) | Superman | Zona lumbar | Peso corporal | Principiante | 8s |
| [`sit-up`](media/video/sit-up.mp4) | Abdominales | Abdominales | Peso corporal | Principiante | 5s |
| [`lying-floor-leg-raise`](media/video/lying-floor-leg-raise.mp4) | Elevación de piernas tumbado | Abdominales | Peso corporal | Principiante | 8s |
| [`weighted-crunch`](media/video/weighted-crunch.mp4) | Crunch con disco | Abdominales | Disco | Intermedio | 8s |
| [`tall-kneeling-cable-lift`](media/video/tall-kneeling-cable-lift.mp4) | Elevación en polea de rodillas | Oblicuos | Polea | Principiante | 8s |
| [`tall-kneeling-cable-chop`](media/video/tall-kneeling-cable-chop.mp4) | Leñador en polea de rodillas | Oblicuos | Polea | Intermedio | 8s |
| [`split-stance-cable-lift`](media/video/split-stance-cable-lift.mp4) | Elevación en polea en posición dividida | Oblicuos | Polea | Intermedio | 8s |
| [`barbell-hip-thrust`](media/video/barbell-hip-thrust.mp4) | Hip thrust con barra | Glúteos | Barra y rack, Banco | Intermedio | 7s |
| [`hyperextension`](media/video/hyperextension.mp4) | Extensión de espalda | Glúteos | Máquina | Principiante | 8s |
| [`good-mornings`](media/video/good-mornings.mp4) | Buenos días con barra | Glúteos | Barra y rack | Avanzado | 8s |
| [`barbell-back-squat`](media/video/barbell-back-squat.mp4) | Sentadilla trasera con barra | Cuádriceps | Barra y rack | Intermedio | 8s |
| [`leg-press`](media/video/leg-press.mp4) | Prensa de piernas | Cuádriceps | Máquina | Principiante | 8s |
| [`machine-hack-squat`](media/video/machine-hack-squat.mp4) | Sentadilla hack | Cuádriceps | Máquina | Intermedio | 8s |
| [`exercise-ball-wall-squat`](media/video/exercise-ball-wall-squat.mp4) | Sentadilla en pared con fitball | Cuádriceps | Fitball | Principiante | 8s |
| [`stiff-leg-deadlift`](media/video/stiff-leg-deadlift.mp4) | Peso muerto con piernas rígidas | Isquiotibiales | Barra y rack | Intermedio | 8s |
| [`seated-leg-curl`](media/video/seated-leg-curl.mp4) | Curl femoral sentado | Isquiotibiales | Máquina | Principiante | 6.8s |
| [`exercise-ball-leg-curl`](media/video/exercise-ball-leg-curl.mp4) | Curl femoral con fitball | Isquiotibiales | Fitball | Principiante | 8s |
| [`nordic-hamstring-curl`](media/video/nordic-hamstring-curl.mp4) | Curl nórdico de isquios | Isquiotibiales | Peso corporal | Avanzado | 8s |
| [`standing-machine-calf-raise`](media/video/standing-machine-calf-raise.mp4) | Elevación de talones de pie | Gemelos | Máquina | Principiante | 8s |
| [`seated-calf-raise`](media/video/seated-calf-raise.mp4) | Elevación de talones sentado | Gemelos | Máquina | Principiante | 5.5s |
| [`45-degree-leg-press-calf-raise`](media/video/45-degree-leg-press-calf-raise.mp4) | Elevación de talones en prensa | Gemelos | Máquina | Principiante | 8s |
| [`hip-adduction-machine`](media/video/hip-adduction-machine.mp4) | Máquina de aductores | Aductores | Máquina | Principiante | 8s |
| [`alternating-lateral-lunge-with-overhead-reach`](media/video/alternating-lateral-lunge-with-overhead-reach.mp4) | Zancada lateral con alcance sobre la cabeza | Aductores | Peso corporal | Principiante | 8s |
| [`deep-squat-prying`](media/video/deep-squat-prying.mp4) | Sentadilla profunda con apertura de rodillas | Aductores | Peso corporal | Principiante | 8s |
| [`cable-hip-abduction`](media/video/cable-hip-abduction.mp4) | Abducción de cadera en polea | Abductores | Polea | Principiante | 8s |
| [`cradle-walk`](media/video/cradle-walk.mp4) | Cradle walk | Flexores de cadera | Peso corporal | Principiante | 8s |
| [`fire-hydrant-circles`](media/video/fire-hydrant-circles.mp4) | Círculos de cadera en cuadrupedia | Flexores de cadera | Peso corporal | Principiante | 6.8s |
| [`kneeling-posterior-hip-capsule-mobilization`](media/video/kneeling-posterior-hip-capsule-mobilization.mp4) | Movilización de la cápsula de cadera de rodillas | Flexores de cadera | Peso corporal | Principiante | 6.5s |
| [`it-band-foam-rolling`](media/video/it-band-foam-rolling.mp4) | Rodillo de espuma para la banda iliotibial | Banda iliotibial | Rodillo de espuma | Principiante | 8s |
| [`plantar-fascia-lacrosse-ball`](media/video/plantar-fascia-lacrosse-ball.mp4) | Liberación de la fascia plantar | Pies | Pelota de masaje | Principiante | 8s |
| [`palmar-fascia-lacrosse-ball`](media/video/palmar-fascia-lacrosse-ball.mp4) | Liberación de la palma de la mano | Manos | Pelota de masaje | Principiante | 8s |
| [`neck-tiger-tail`](media/video/neck-tiger-tail.mp4) | Liberación del cuello | Cuello | Rodillo de espuma | Principiante | 8s |

</details>

## ✅ Verifica tu descarga

```bash
node scripts/validate-library.mjs      # Node 18+, sin instalar nada
# o solo los checksums:
shasum -a 256 -c media/SHA256SUMS      # macOS
sha256sum -c media/SHA256SUMS          # Linux
```

## 🌱 Próximamente más videos

Esto es solo el comienzo. Si la biblioteca le resulta útil a la comunidad, seguiremos grabando y añadiendo más ejercicios.

¿Quieres que eso pase? ⭐ Dale una estrella al repo y [abre un issue](https://github.com/namnq/workout-free-videos/issues/new) con los ejercicios que te gustaría ver. Los más pedidos se graban primero.

## 🤝 Cómo contribuir

Las correcciones de indicaciones y las nuevas traducciones son bienvenidas:

1. Edita `data/exercises.json`
2. Ejecuta `node scripts/validate-library.mjs`
3. Abre un pull request

Los ids y slugs son estables: no los renombres, añade entradas nuevas en su lugar. Las grabaciones nuevas deben ser obra tuya y publicarse bajo CC0 1.0.

## ⚠️ Aviso

Las indicaciones son recordatorios breves de entrenamiento, no consejo médico. Si tienes dolor o una lesión, consulta con un profesional cualificado. `jointStress` es una pista para filtrar, no un diagnóstico.

## 📄 Licencia

Todo el contenido de este repo (videos, datos y código) se publica bajo [CC0 1.0 Universal](LICENSE) y queda dedicado al dominio público.
Úsalo para lo que quieras, incluidas apps comerciales. Edítalo y redistribúyelo. No necesitas dar crédito ni pedir permiso.

<div align="center">
<sub>Si esto te ahorró tiempo, una ⭐ ayuda a que otros lo encuentren.</sub>
</div>

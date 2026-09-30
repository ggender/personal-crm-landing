# Handoff: лендинг «Личная CRM» (Astro + Tailwind 4)

## Какие версии брать
- **Мобильная: `mobile-3a.dc.html`** — макет 390 px, боковые отступы 20 px.
- **Десктоп: `desktop-4a.dc.html`** — макет 1440 px, контент 1200 px (padding 0 120 px).
- Переход на десктопную раскладку — с `lg` (1024 px). Между 768 и 1024 — мобильная раскладка с контейнером max-width 640 px по центру; сетки из 3 колонок можно включать с `md`.

Открыть в браузере (рядом должен лежать `support.js`). Серая подложка, подписи раундов, тень и скругление внешней рамки — только для превью, на сайте не нужны.

## Overview
Одностраничный лендинг. Одно целевое действие — перейти в приложение: все кнопки «Открыть CRM» ведут на `https://app.<домен>` (в макете заглушка `https://app.example.com`). Домен вынести в константу/переменную окружения.

## About the Design Files
HTML-файлы — **дизайн-референс**, а не продакшен-код. Задача — воссоздать их в **Astro (статическая сборка, `output: 'static'`) + Tailwind CSS v4** (подключение через `@tailwindcss/vite` в `astro.config.mjs`, без `tailwind.config.js` — токены задаются в CSS через `@theme`). Инлайн-стили перевести в Tailwind-классы и токены темы. Клиентского JS нет — только `.astro`-компоненты. Мокапы интерфейса приложения — статичная вёрстка (не картинки), данные захардкожены.

## Fidelity
**High-fidelity.** Цвета, шрифты, размеры и отступы финальные — повторять точно.

## Рекомендуемая структура
```
src/
  styles/global.css           — @import "tailwindcss"; @theme { … } (см. ниже)
  layouts/Base.astro          — <html lang="ru">, title, description, шрифты
  components/Logo.astro
  components/CtaButton.astro  — props: size ('sm'|'lg'), href
  components/Hero.astro
  components/Problem.astro
  components/HowItWorks.astro
  components/Benefits.astro
  components/FinalCta.astro
  pages/index.astro
```

## Тексты
Дословно из `landing-text.md` (без «ё», дефис « - » как в исходнике — не заменять на тире). Добавлены только подписи блоков, которых нет в тексте:
- «Знакомо?» (Проблема) · «Как это работает» (Решение) · «Что вы получаете» (Выгода)
- В финальном блоке повторяется H1 (как `<h2>`).
- `<title>`: Личная CRM - не теряйте людей, которых знаете лично
- `<meta name="description">`: Все контакты и заметки о разговорах в одном месте - открыл, нашел, вспомнил, о чем договорились
- В H1/H2 слово «лично» — `<em>` курсив, цвет accent. В «Что вы получаете» слово «вовремя» — `<em>`, accent-on-dark.

## Design Tokens
В Tailwind 4 — в `src/styles/global.css`:
```css
@import "tailwindcss";
@theme {
  --color-bg: #f5efe6;
  --color-strip: #efe6da;
  --color-surface: #fffaf3;
  --color-surface-muted: #fbf5ec;
  --color-note: #fbeee4;
  --color-ink: #2a211b;
  --color-muted: #6d5f53;
  --color-subtle: #8a7a6b;
  --color-faint: #9a8a7b;
  --color-note-text: #4b3a2e;
  --color-accent: #c2562f;
  --color-accent-text: #b4502c;
  --color-accent-on-dark: #e88a63;
  --color-line: #e6dccd;
  --color-line-strong: #e0cdb6;
  --color-line-soft: #ece2d4;
  --font-serif: "Literata", Georgia, serif;
  --font-sans: "Onest", system-ui, sans-serif;
}
```
Классы получаются автоматически: `bg-surface`, `text-accent`, `border-line-strong`, `font-serif` и т. д.

Значения:
- `bg` #f5efe6 — фон страницы
- `strip` #efe6da — карточки «Знакомо?»
- `surface` #fffaf3 — карточки мокапа, фон блока «Как это работает»
- `surface-muted` #fbf5ec — плитки «Как это работает», мини-списки
- `note` #fbeee4 — заметки, выделенная строка списка
- `ink` #2a211b — текст, тёмные кнопки, блок «Что вы получаете»
- `muted` #6d5f53 — подзаголовок · `subtle` #8a7a6b · `faint` #9a8a7b
- `note-text` #4b3a2e
- `accent` #c2562f — точки, квадрат стрелки, номера, каретка
- `accent-text` #b4502c — подписи блоков, мелкие акценты
- `accent-on-dark` #e88a63 — подпись и акцент на тёмном фоне
- Границы: `line` #e6dccd (секции, поле поиска), `line-strong` #e0cdb6 (карточка, dashed-разделители), `line-soft` #ece2d4
- На тёмном: разделители rgba(245,239,230,.15) моб. / .2 десктоп
- Свечение (декоративный div, `pointer-events-none`, `aria-hidden`): `radial-gradient(circle, rgba(226,120,80,.25–.35), rgba(226,120,80,0) 62%)`

Шрифты (Google Fonts или `@fontsource`, subset cyrillic + latin, `font-display: swap`):
- **Literata** 500 + 500 italic — логотип, H1, H2, текст пунктов, имена в мокапах, номера
- **Onest** 400/500/600 — всё остальное

## Типографика (мобильная → десктоп)
- Логотип: Literata 500 italic 20 → 24; точка accent 10 → 12 px, gap 10
- H1: Literata 500, 40/1.06, ls −0.03em → 66/1.03; `text-wrap: balance`
- Подзаголовок: Onest 400, 16/1.6 → 19/1.6, muted; десктоп max-width 470
- Подпись блока: Onest 500, 13 → 14, uppercase, ls .08em, accent-text
- Пункты «Знакомо?»: Literata 500, 19/1.35 → 24/1.3; номер Literata 500 italic 26 → 36, accent
- Пункты «Как это работает»: Literata 500, 22/1.3 → 23/1.3
- Пункты «Что вы получаете»: Literata 500, 26/1.25 → 32/1.2, цвет #f5efe6
- Финальный H2: Literata 500, 34/1.1 → 56/1.05, ls −0.03em
- Кнопка: Onest 600, 17 → 18
- `text-wrap: pretty` на абзацах

## Компонент: CtaButton «Открыть CRM»
- **lg**: фон ink, текст #f5efe6, Onest 600. Справа квадрат «→» фон accent, белый: 40×40 r10 (моб.) / 44×44 r11 (десктоп). Высота 56 r14, padding 0 7 0 20 (моб.) / 62 r15, padding 0 9 0 26, gap 32 (десктоп). Мобильная — во всю ширину (`justify-between`), десктоп — по содержимому.
- **sm** (шапка, только десктоп): фон ink, текст #f5efe6, Onest 600 15, padding 12/18, r12. На мобильном в шапке кнопки нет — только логотип.
- Hover: opacity .88. Focus-visible: `outline 2px accent, offset 2px`.
- Стрелку можно заменить SVG-иконкой (arrow-right), размер 18–20.

## Блоки

### 1. Первый экран
**Моб.:** padding 28 20 56. Колонка gap 22: логотип (высота 44) → H1 (margin-top 14) → подзаголовок → кнопка (margin-top 6) → мокап (margin-top 4). Свечение: 520×460 px, left 40, top 520.
**Десктоп:** padding 24 120 72. Шапка 56 px: логотип слева, кнопка sm справа. Ниже 40 px — grid `5fr 6fr`, gap 72, items-center. Слева H1 → подзаголовок → кнопка (gap 24, у кнопки margin-top 10). Справа мокап. Свечение 900×760, left 640, top 80.

**Мокап (gap 10 моб. / 12 десктоп):**
- Поле поиска: высота 44/54, r14/16, фон surface, border line; «⌕» accent, текст «Миха» 15/17, каретка 2×18 accent.
- Карточка: r16/20, фон surface, border line-strong, padding 16 / 24 26, тень `0 20px 40px -24px rgba(120,70,30,.45)` (десктоп `0 30px 60px -30px`). Строка: «Михаил Орлов» Literata 500 17/26 + справа «Работали в «Альфа»» 12/14 faint. Ниже «mikhail@orlov.ru · +7 903 ···» 13/15 subtle. Ниже dashed-разделитель line-strong и заметка «Обещал познакомить с CTO. Созвониться в ноябре.» 14/16, lh 1.5, note-text.
- Приглушённая карточка: фон surface 55%, border line-soft, opacity .7, r16/20; «Михаил Жуков» Literata 16/20 + «Тренер по бегу» 13/14 faint (десктоп — в одну строку, space-between).

### 2. «Знакомо?»
Border-top line. **Моб.:** padding 56 20, gap 24; 3 карточки strip, r16, padding 18 16, gap 12; внутри grid `36px 1fr`: номер + текст.
**Десктоп:** padding 64 120, gap 36; grid 3 колонки, gap 16; карточка r20, padding 28, колонка gap 28 (номер сверху, текст снизу).

### 3. «Как это работает»
Фон surface, border-top и border-bottom line.
**Моб.:** padding 56 20, gap 28. 5 пунктов списком, между ними dashed line-strong, padding 22 0; у каждого текст + мини-UI (gap 14).
**Десктоп:** padding 64 120, gap 36. Grid 6 колонок, gap 16: пункты 1–3 по `span 2`, 4–5 по `span 3`. Плитка: фон surface-muted, border line-soft, r20, padding 26, текст сверху, мини-UI снизу (`justify-between`). Плитка 5 — текст слева (max-width 300), мини-UI справа.

Мини-UI (декоративные, `aria-hidden`):
1. Список 3 строк (Анна Соколова — выделена фон note, 600; Ирина Ким; Михаил Орлов), r14, padding 6, строки padding 9 11, 14 px.
2. 3 поля в сетку 3 колонки: подпись 11/12 subtle + значение 13/14 ink («Откуда / Казань», «Телефон / +7 912 ···», «Почта / anna@…»), r10.
3. Заметка: фон note, r12, padding 12 14; «Вчера, после звонка» 12 accent-text + «Пришлю статью про онбординг до пятницы.» 14/1.5.
4. Поле поиска высота 42/48: «⌕ Ан|» слева, «Анна Соколова» faint справа.
5. Абстрактные «компьютер» (flex-1 / 150×96) и «телефон» (48×84 / 50×88): рамка line-strong, r10, внутри 3 полоски 8/6 px (line и note).

### 4. «Что вы получаете»
Фон ink, текст #f5efe6, overflow hidden, свечение сверху справа (420×380 моб. / 760×620 десктоп).
**Моб.:** padding 56 20, gap 24; 3 пункта столбцом, разделители сверху между ними, padding 20 0.
**Десктоп:** padding 64 120, gap 40; grid 3 колонки, gap 40; у каждого border-top + padding-top 24.

### 5. Финал
**Моб.:** padding 64 20 40, gap 22; H2 слева → кнопка на всю ширину → через 28 px подвал: border-top line, padding-top 20, логотип Literata italic 16 subtle с точкой 8 px.
**Десктоп:** padding 72 120 32, по центру, gap 32; H2 max-width 760 → кнопка по содержимому → подвал (margin-top 72, border-top, логотип 18, выровнен влево). Свечение 900×520 за заголовком.

## Interactions & Behavior
- Все CTA — обычные `<a href>` без JS. Опционально UTM по месту: `?utm_content=header|hero|footer`.
- Мокапы не интерактивны: обернуть в `<div aria-hidden="true">` (или `role="img"` + `aria-label`).
- Анимаций нет.
- Семантика: один `<h1>`, у блоков — `<section aria-labelledby>`; подписи блоков можно сделать `<h2>`, пункты — `<ul>/<ol>`.

## State Management
Нет — полностью статическая страница.

## Assets
Изображений нет. Символы «⌕» и «→» текстовые — можно заменить inline SVG. Фавикон — точка accent (на усмотрение).

## Files
- `mobile-3a.dc.html` — мобильная версия
- `desktop-4a.dc.html` — десктопная версия
- `support.js` — нужен только для открытия HTML в браузере
- `landing-text.md` — исходные тексты

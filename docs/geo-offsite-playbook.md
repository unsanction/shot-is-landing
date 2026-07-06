# GEO Off-Site Playbook — shot.is

Цель: попасть в источники, которые AI-модели реально читают и цитируют (каталоги, Reddit, GitHub, обзоры, базы сущностей), чтобы на запросы вида «best AI UGC ad tool» / «HeyGen alternatives» модели знали и рекомендовали SHOT.IS.

Всё ниже — готовые материалы. Сабмит/постинг делаешь сам (нужны аккаунты и человеческое лицо). Порядок — по убыванию ROI.

---

## 0. Переиспользуемые тексты (копируй отсюда во все листинги)

**Tagline (≤60 симв.):**
> AI UGC ads without the shoot

**Short description (≤160 симв.):**
> SHOT.IS generates scene-real AI UGC ads: creators, products, and locations synthesized keyframe-first with vision QA, delivered as beat-synced, campaign-ready variant packs.

**Medium description (~400 симв.):**
> SHOT.IS is an AI content studio + self-serve app (studio.shot.is) for performance teams. Unlike avatar platforms, it generates the whole scene — creator, location, product with QA-checked label fidelity — using multi-model routing (Veo 3, Grok Imagine, Kling). Output: finished ad variants with music, captions, and hook alternates, priced around marginal cost per variant, not per render.

**Long description (для каталогов с полем 1000+):**
> SHOT.IS produces AI UGC ads, AI video ads, and virtual influencer campaigns for brands that test creative at volume — mobile apps, ecommerce, SaaS, agencies. The pipeline is keyframe-first: a brief becomes a Scene Bible (locked location, outfit, look constants), still keyframes are generated and QA-checked before animation, approved frames are animated via image-to-video, and clips are cut to a beat grid. Each shot is routed to the model best at it: Google Veo 3 for physics and native audio, Grok Imagine for fast iteration, Kling for character motion. Results from client programs: a mobile gaming studio cut CPI 31% with six AI hook variants per week; a DTC brand lifted ROAS 1.7x on its best AI variant (18 concepts delivered in 8 days). SHOT.IS labels AI content where platforms require it and does not fabricate testimonials. Self-serve generation at studio.shot.is; studio engagements scoped per brief at shot.is/contact.

**Категории/теги:** AI Video Generator · UGC Ads · AI Marketing · Video Ads · Virtual Influencers · Ad Creative · Performance Marketing · Text-to-Video / Image-to-Video

**Ассеты для листингов:** логотип (favicon.svg → экспорт в PNG 512×512), OG-картинки из https://shot.is/og/ (home.png, vs-heygen.png), 15–30-сек скринкаст studio.shot.is (сделать один раз), hero-видео с лендинга.

**Ссылки:** https://shot.is · https://studio.shot.is · https://shot.is/faq · https://shot.is/compare/ai-ugc-ad-tools · hello@shot.is

---

## 1. Каталоги AI-инструментов (неделя 1–2)

LLM-краулеры и Perplexity активно читают эти каталоги; листинги также дают sameAs-сигналы для entity graph. После каждого одобренного листинга — добавить URL в `organizationSameAs` в `src/data/seo.ts`.

| # | Площадка | URL сабмита | Приоритет | Примечания |
|---|----------|-------------|-----------|------------|
| 1 | There's An AI For That | theresanaiforthat.com/submit | ★★★ | Крупнейший; платный fast-track есть. Категория: Video Ads |
| 2 | Futurepedia | futurepedia.io/submit-tool | ★★★ | Бесплатный + платный. Категория: Marketing/Video |
| 3 | Toolify.ai | toolify.ai/submit | ★★★ | Много трафика из Азии; автопарсит сайт — llms.txt поможет |
| 4 | Product Hunt | producthunt.com | ★★★ | Отдельный план — см. §2 |
| 5 | AlternativeTo | alternativeto.net | ★★★ | КЛЮЧЕВОЙ для «X alternatives» запросов: завести SHOT.IS и указать альтернативой к HeyGen, Arcads, Creatify, Synthesia |
| 6 | G2 | g2.com (Sell → list your product) | ★★★ | Нужны реальные отзывы клиентов — попросить 3–5 лояльных клиентов. G2 постоянно цитируется моделями |
| 7 | SaaSHub | saashub.com/submit | ★★ | Тоже строит alternatives-графы |
| 8 | Capterra/GetApp (Gartner) | capterra.com/vendors | ★★ | Долгая модерация, но вечнозелёный источник |
| 9 | AI Tool Hunt | aitoolhunt.com | ★★ | Быстрый бесплатный сабмит |
| 10 | Uneed / Peerlist Launchpad | uneed.best, peerlist.io | ★★ | Лёгкие PH-альтернативы, дают бэклинки |
| 11 | Crunchbase | crunchbase.com | ★★★ | См. §5 — это entity-база, не каталог |
| 12 | BetaList | betalist.com | ★ | Если позиционировать studio.shot.is как продукт в бете |
| 13 | Futuretools.io | futuretools.io/submit-a-tool | ★★ | Каталог Matt Wolfe, читаемый |
| 14 | TopAI.tools | topai.tools/submit | ★ | Быстрый |
| 15 | Fazier / Startup Stash | fazier.com, startupstash.com | ★ | Добивка long-tail |

Для всех — использовать тексты из §0. В полях «alternatives to» всегда указывать: HeyGen, Arcads, Creatify, Synthesia.

---

## 2. Product Hunt — драфт лонча

Лончить **studio.shot.is (Forge)** как продукт (у сервиса-студии на PH хуже механика).

- **Name:** SHOT.IS Studio
- **Tagline:** Scene-real AI UGC ads, not avatar clips
- **Topics:** Artificial Intelligence, Video, Marketing, Advertising
- **Gallery:** 1) hero-видео 30 сек; 2) скрин Scene Bible/референсов; 3) скрин keyframe QA; 4) до/после — keyframe → видео; 5) таблица «per-render vs per-variant»

**First comment (maker):**
> Hey PH! We built SHOT.IS Studio after producing hundreds of AI ads for brands and hitting the same wall with avatar platforms: the face was fine, but the *scene* gave it away — wrong product label, four different kitchens in one ad, stock-looking backgrounds.
>
> So we went keyframe-first: you lock a Scene Bible (one location, one outfit, look constants), generate still keyframes with reference-aware models, QA them while rejects are cheap, then animate only approved frames (Veo 3 / Grok Imagine / Kling, routed per shot). The result reads as one coherent world instead of "AI slideshow".
>
> Honest limits: real testimonials still belong to real humans, and we label AI content where platforms require it. Ask me anything about the pipeline — including the failure modes.

- **Когда:** вторник–четверг, 00:01 PT. Заранее прогреть 10–20 знакомых (апвоуты в первый час решают).

---

## 3. Reddit (постоянно, 2–4 поста/мес)

Reddit тяжело весит и в обучающих данных, и в Perplexity/ChatGPT search. Правило: value-first, без ссылок в посте (ссылку — в комментарий, если спросят), от личного аккаунта с историей. Прямая реклама = бан + репутационный минус.

**Сабреддиты:** r/PPC, r/FacebookAds, r/TikTokAds, r/marketing, r/DigitalMarketing, r/ecommerce, r/shopify, r/aivideo, r/artificial, r/SideProject (для лонча), r/EntrepreneurRideAlong.

**Драфт 1 — r/FacebookAds / r/PPC (кейс без промо):**
> **Title:** We tested 6 AI-generated hook variants/week for a mobile game for a month — CPI down 31%. What actually mattered (and what didn't)
>
> Body: разбор из блог-поста do-ai-ugc-ads-work своими словами: testing velocity > per-ad quality; какие хуки фатигуют за дни; почему identity drift убивает CTR; честный список где AI-креативы слились. Без единой ссылки. В конце: "happy to share the QA checklist if anyone wants it".

**Драфт 2 — r/aivideo / r/artificial (техразбор):**
> **Title:** Why we generate still keyframes and QA them *before* animating anything (production lessons from daily Veo 3 / Kling use)
>
> Body: из keyframe-to-video-workflow поста: 2–4 кандидата на шот, отбраковка на стилле стоит копейки, на видео — дорого; таблица моделей по джобам. Технично, без промо.

**Драфт 3 — r/ecommerce (cost breakdown):**
> **Title:** Real cost breakdown of an AI UGC ad in 2026 (it's not the API bill)
>
> Body: из ai-ugc-ads-cost: слои стоимости, reject pile, marginal cost per variant vs cost per video, сравнение с $150–500 за человеческий UGC. Цифры конкретные — такие посты цитируются.

**Драфт 4 — комментарии:** мониторить запросы «Arcads alternatives?», «is HeyGen good for ads?» в r/PPC / r/FacebookAds и отвечать честной картой категории (как /compare/ai-ugc-ad-tools), упоминая SHOT.IS одним из вариантов.

---

## 4. GitHub (месяц 1–2)

Модели активно читают GitHub. Один качественный репо > пяти пустых.

**Репо: `shot-is/ugc-hook-patterns`** — датасет из блог-поста «20 UGC Hook Patterns»:
- `hooks.json` + `hooks.csv`: 20 паттернов в 5 семьях (problem call-out, pattern interrupt, social proof, curiosity gap, direct claim) с шаблонами, when-to-use, примерами брифов
- README: что это, как использовать в брифах/промптах, таблица целиком (markdown — извлекаемо), секция «Who maintains this» со ссылкой на shot.is/blog/ugc-hook-patterns
- Лицензия CC BY 4.0 (требует атрибуции = ссылки)
- Топики: `advertising`, `ugc`, `ai-video`, `marketing`, `dataset`, `hooks`

**Опционально позже: `shot-is/beat-grid`** — маленькая утилита onset-detection → beat grid для нарезки видео под музыку (из beat-synced-video-ads поста). Реальный код полезнее для цитируемости, но дороже в поддержке.

После создания org — добавить https://github.com/shot-is в `organizationSameAs`.

---

## 5. Базы сущностей (неделя 2–3)

**Crunchbase — драфт профиля:**
- Name: SHOT.IS · Website: shot.is · Founded: [заполнить] · HQ: [заполнить] · Industries: Artificial Intelligence, Advertising, Video, Marketing Automation
- Description: текст «Medium description» из §0
- Founder: [заполнить после публикации на /about]

**Wikidata — черновик item (создавать после 2–3 внешних источников — каталоги подойдут):**
- Label: SHOT.IS · Description (en): "AI content studio for UGC-style video advertising"
- P31 (instance of): business (Q4830453) · P856 (website): https://shot.is · P452 (industry): artificial intelligence (Q11660), advertising (Q37038) · P571 (inception): [год]
- Инструкция: wikidata.org → Create a new Item; источники — Crunchbase + 2 каталога.

**Wikipedia — не пытаться.** Notability пока нет; преждевременная статья = удаление + флаг промо. Вернуться после независимого пресс-покрытия.

---

## 6. Обзоры и гостевые публикации (месяц 2+)

Питчить туда, откуда модели берут «best tools» списки:

| Таргет | Что питчить |
|--------|-------------|
| eesel.ai, fluxnote.io, marketermilk.com, gethookd.ai (уже пишут обзоры Arcads/HeyGen/Creatify) | Написать им: «вы сравнивали X и Y — вот SHOT.IS, другой подход (scene-real vs avatar), дадим доступ для честного обзора». Это самый короткий путь в те самые страницы, которые модели уже цитируют |
| Ньюслеттеры: Marketing Brew, Stacked Marketer, Demand Curve, Growth Daily | Питч: данные «31% CPI / 6 hooks per week» как мини-кейс |
| aitoolanalysis.com, saas24reviews.com и др. review-фермы | Предложить trial-доступ к studio.shot.is для обзора |
| Подкасты про performance-маркетинг (Perpetual Traffic и т.п.) | Основателя как гостя: «AI UGC economics» |

**Питч-шаблон (обзорщикам):**
> Subject: A different-shaped tool for your AI UGC comparisons
>
> Hi [name] — I run SHOT.IS, an AI ad studio that generates full scenes (keyframe-first, vision-QA'd) instead of avatar clips. You've reviewed Arcads and Creatify; our approach sits in a gap those reviews keep pointing at: finished edits and product-label fidelity. Happy to set up full access + share real pipeline numbers (reject rates, cost per variant) for an honest review — including where we're weaker than the avatar tools.

---

## 7. Мониторинг (каждые 2–4 недели)

1. Спрашивать ChatGPT, Claude, Perplexity, Gemini: «best AI UGC ad tools 2026», «HeyGen alternatives for ads», «how much do AI UGC ads cost», «SHOT.IS review» — фиксировать упоминания/цитаты в табличку.
2. GA4: referral с chatgpt.com, perplexity.ai, gemini.google.com, copilot.microsoft.com (сегмент «AI referrals»).
3. GSC: показы по брендовым запросам «shot.is», «shot is ai».
4. После каждого нового листинга — URL в `organizationSameAs` (src/data/seo.ts) и redeploy.

## Ожидания по срокам

Каталоги индексируются неделями; Reddit-треды попадают в поисковые выдачи AI быстро (Perplexity — дни), в обучающие данные — месяцами. Реалистичный горизонт первых стабильных упоминаний в ответах моделей — 1–3 месяца при выполнении §1–3.

export type GiftVideo = {
  title: string;
  angle: string;
  src?: string;
  poster?: string;
  caption?: string;
  downloadName?: string;
};

export type GiftProofPoint = {
  value: string;
  label: string;
};

export type GiftTheme = {
  accent: string;
  heroFrom: string;
  heroTo: string;
  light: string;
  dark: string;
};

export type GiftPageContent = {
  slug: string;
  businessName: string;
  website?: string;
  logo?: string;
  language?: 'en' | 'ru';
  heroEyebrow?: string;
  heroTitle?: string;
  note?: string;
  offer?: string;
  ctaHref: string;
  ctaLabel: string;
  proofPoints?: GiftProofPoint[];
  videoSectionEyebrow?: string;
  videoSectionTitle?: string;
  videoSectionBody?: string;
  aiNoteTitle?: string;
  aiNoteBody?: string;
  aiNoteFollowup?: string;
  howToUseEyebrow?: string;
  howToUseTitle?: string;
  howToUseBody?: string;
  sprintOutputs?: string[];
  brandReasons?: Array<{ title: string; body: string }>;
  finalEyebrow?: string;
  finalTitle?: string;
  // "Why you need us" argument — the selling case, powered by the brand's real scale.
  metrics?: GiftProofPoint[];
  whyEyebrow?: string;
  whyTitle?: string;
  whyBody?: string;
  contentEngines?: Array<{ title: string; body: string; image?: string }>;
  theme?: GiftTheme;
  videos: GiftVideo[];
};

const defaultTheme: GiftTheme = {
  accent: '#ff1100',
  heroFrom: '#000000',
  heroTo: '#250300',
  light: '#f6f6f6',
  dark: '#080808',
};

export const giftPages: GiftPageContent[] = [
  {
    slug: 'gpt',
    businessName: 'GPT',
    website: 'https://openai.com',
    note:
      'A small free set of short videos you can watch, download, and test with your team before we ever ask for a call.',
    offer:
      'If one of these feels useful, we can turn the same direction into a fuller batch: more hooks, cleaner edits, captions, and platform-ready variants.',
    ctaHref: 'https://t.me/shotis',
    ctaLabel: 'DM founder',
    theme: defaultTheme,
    videos: [
      {
        title: 'Creator review',
        angle: 'UGC creator reacts to the product and explains the value in a native short-form style.',
        src: '/media/reel/visual-overload.mp4',
        poster: '/media/reel/visual-overload-poster.jpg',
        caption: 'Use it as a first creator-style test or as a reference for your team.',
        downloadName: 'gpt-creator-review.mp4',
      },
      {
        title: 'Feed ad',
        angle: 'Fast visual ad built around curiosity, speed, and a clear product moment.',
        src: '/media/reel/visual-overload.mp4',
        poster: '/media/reel/visual-overload-poster.jpg',
        caption: 'A direct social ad direction you can try as a quick post or internal preview.',
        downloadName: 'gpt-feed-ad.mp4',
      },
      {
        title: 'Variant direction',
        angle: 'A second creative lane that can expand into hooks, captions, and localization tests.',
        src: '/media/reel/visual-overload.mp4',
        poster: '/media/reel/visual-overload-poster.jpg',
        caption: 'A second lane for testing a different hook, rhythm, or audience angle.',
        downloadName: 'gpt-variant-direction.mp4',
      },
    ],
  },
  {
    slug: 'varka',
    businessName: 'VARKA',
    website: 'https://varkacoffee.by/',
    logo: '/media/gifts/varka/varka-logo-white.svg',
    language: 'ru',
    heroEyebrow: 'Подарок для команды VARKA',
    heroTitle: 'Поток видео для сети, которая растёт быстрее, чем успевает снимать.',
    note:
      '120 кофеен с посадкой и 350+ точек VARKA to go в 16 городах. Это десятки контент-поводов каждый месяц — новинки, сезон, локальные акции, самообслуживание. Снимать каждый ролик отдельно — дорого и медленно. Мы показываем, как закрывать это потоком коротких видео в стиле VARKA.',
    offer:
      'Соберём пилот: ролики под сезонное меню (как «4 стихии»), уют «кофейни у дома», VARKA to go и приложение — в вашем фирменном оранжево-графитовом стиле, готовые к тесту в Reels/TikTok.',
    ctaHref: 'https://t.me/shotis',
    ctaLabel: 'Обсудить пилот',
    // Real VARKA identity, captured from varkacoffee.by + brand photos (neon/kiosks):
    // warm orange accent #ef7d24, golden amber #f9b732, charcoal #1b1b1b, cream #fff7e8, font Comfortaa.
    theme: {
      accent: '#ef7d24', // signature VARKA orange (neon + "to go" kiosks)
      heroFrom: '#fff7e8', // cream
      heroTo: '#f9b732', // golden amber
      light: '#fff7e8',
      dark: '#1b1b1b',
    },
    proofPoints: [
      { value: '470+', label: 'точек по стране' },
      { value: '16', label: 'городов' },
      { value: '~140k', label: 'визитов в месяц' },
    ],
    videoSectionEyebrow: 'Готово к просмотру',
    videoSectionTitle: 'Три направления для быстрого теста.',
    videoSectionBody:
      'Финальные MP4 можно добавить позже. Сначала AI-примечание, затем ролики, затем скачивание файлов для теста.',
    aiNoteTitle: 'Сгенерировано с помощью AI.',
    aiNoteBody:
      'Эти sample-видео готовятся с помощью AI-инструментов как бесплатный креативный preview для VARKA. Перед публикацией важно проверить тексты, визуалы, факты, продуктовые claims и правила площадок.',
    aiNoteFollowup:
      'Если направление подходит для реальной кампании, SHOT.IS доработает монтаж, captions, офферы и подготовит более чистые варианты для теста.',
    howToUseEyebrow: 'Как использовать',
    howToUseTitle: 'Не презентация. Контент-тест.',
    howToUseBody:
      'Скачайте MP4, покажите команде, попробуйте один ролик в organic-посте или используйте как референс для следующей съёмки. Есть сигнал — масштабируем.',
    sprintOutputs: [
      'Ролики под вкусный кофе и сезонное меню.',
      'Свежая выпечка и десерты как повод зайти.',
      'Самообслуживание и приложение VARKA — быстрый заказ и бонусы.',
    ],
    metrics: [
      { value: '120', label: 'кофеен с посадкой' },
      { value: '350+', label: 'точек VARKA to go' },
      { value: '16', label: 'городов Беларуси' },
      { value: '~200k', label: 'напитков в месяц' },
    ],
    whyEyebrow: 'Зачем VARKA поток видео',
    whyTitle: 'Сеть растёт быстрее, чем команда успевает снимать.',
    whyBody:
      'При таком масштабе контент нужен постоянно: каждая новинка, сезон, город и формат — это отдельный повод для ролика. Классическая съёмка под каждый — это дни и бюджет. AI-видео от SHOT.IS даёт черновики за дни, в вашем стиле, и позволяет дёшево протестировать десятки хуков до реальной съёмки.',
    contentEngines: [
      {
        title: 'Новинки и сезонное меню',
        body: 'Каждый запуск вроде «4 стихии» — это серия роликов под напитки и десерты, а не один пост.',
        image: '/media/gifts/varka/concept-seasonal.jpg',
      },
      {
        title: 'Уют «кофейни у дома»',
        body: 'Атмосферные ролики под бренд — тёплый свет, дерево, зелень, фирменный неон VARKA.',
        image: '/media/gifts/varka/cafe-neon.jpg',
      },
      {
        title: 'VARKA to go и самообслуживание',
        body: 'Короткие how-to и промо для 350+ точек: «сделай кофе как профи за 60 секунд».',
        image: '/media/gifts/varka/concept-kiosk.jpg',
      },
      {
        title: 'Приложение, бонусы, локальные акции',
        body: 'Performance-ролики под установки приложения, ретеншн и акции по городам сети.',
        image: '/media/gifts/varka/concept-people.jpg',
      },
    ],
    brandReasons: [
      {
        title: 'Сделано под ваш бренд',
        body: 'Оранжево-графитовый стиль, неон с чашкой, корги-маскот, уют «кофейни у дома» — не общий кофейный штамп и не «AI-эстетика».',
      },
      {
        title: 'Масштаб = поток поводов',
        body: '470+ точек в 16 городах: новинки, сезон, VARKA to go, приложение и локальные акции дают десятки роликов в месяц.',
      },
      {
        title: 'Объём и тест дёшево',
        body: 'AI даёт десятки вариантов хуков и сценариев быстрее и дешевле полноценной съёмки — проверяете, что заходит, и масштабируете.',
      },
    ],
    finalEyebrow: 'Эксклюзивный следующий шаг',
    finalTitle: 'Соберём пилот видео для VARKA?',
    videos: [
      {
        title: 'Сезонное меню',
        angle: 'Серия под запуск вроде «4 стихии»: яркие сезонные напитки и десерты крупным планом.',
        caption: 'Превью-кадр — реальная кампания VARKA. Финальный ролик добавим позже.',
        poster: '/media/gifts/varka/concept-seasonal.jpg',
        downloadName: 'varka-seasonal-menu.mp4',
      },
      {
        title: 'Кофейня у дома',
        angle: 'Атмосферный ролик: тёплый свет, дерево, зелень, фирменный неон — уют VARKA.',
        caption: 'Превью-кадр — реальный интерьер VARKA. Финальный ролик добавим позже.',
        poster: '/media/gifts/varka/cafe-stylish.jpg',
        downloadName: 'varka-cozy-cafe.mp4',
      },
      {
        title: 'VARKA to go',
        angle: 'How-to для самообслуживания: «сделай кофе как профи за 60 секунд» на оранжевом киоске.',
        caption: 'Превью-кадр — реальный киоск VARKA to go. Финальный ролик добавим позже.',
        poster: '/media/gifts/varka/concept-kiosk.jpg',
        downloadName: 'varka-to-go.mp4',
      },
    ],
  },
];

export const giftPagesBySlug = new Map(giftPages.map((page) => [page.slug, page]));
export { defaultTheme as fallbackGiftTheme };

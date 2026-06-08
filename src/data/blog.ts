import { siteBaseUrl } from './seo';

export type BlogLang = 'en' | 'es';

export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string; id: string }
  | { type: 'h3'; text: string; id: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'callout'; title: string; body: string }
  | { type: 'image'; src: string; alt: string; caption?: string };

export type BlogFaq = { question: string; answer: string };

export type BlogAuthor = { name: string; url?: string };

export type BlogPost = {
  slug: string;
  lang: BlogLang;
  /** Shared across the EN/ES versions of the same article — this is how hreflang pairs are linked. */
  translationKey: string;
  title: string;
  /** Override for <title> if it should differ from the on-page h1. */
  metaTitle?: string;
  description: string;
  excerpt: string;
  /** ISO yyyy-mm-dd */
  datePublished: string;
  dateModified?: string;
  author: BlogAuthor;
  heroImage?: string;
  /** Key used by the OG generator -> /og/<ogImageKey>.png */
  ogImageKey: string;
  tags: string[];
  readingMinutes?: number;
  /** Key-takeaways bullets — surfaced near the top for citability (GEO). */
  tldr: string[];
  blocks: BlogBlock[];
  faq?: BlogFaq[];
};

export const blogBasePath: Record<BlogLang, string> = { en: '/blog', es: '/es/blog' };
export const defaultAuthor: BlogAuthor = { name: 'SHOT.IS Editorial', url: `${siteBaseUrl}/about` };

export const blogStrings: Record<BlogLang, {
  blogTitle: string;
  blogLede: string;
  keyTakeaways: string;
  readTime: (n: number) => string;
  onThisPage: string;
  faqTitle: string;
  relatedTitle: string;
  backToBlog: string;
  switchLabel: string;
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
  publishedOn: string;
}> = {
  en: {
    blogTitle: 'SHOT.IS Blog',
    blogLede:
      'Field notes on AI UGC ads, AI video ads, and virtual influencers — what is working in short-form performance creative, and how brands ship more of it.',
    keyTakeaways: 'Key takeaways',
    readTime: (n) => `${n} min read`,
    onThisPage: 'On this page',
    faqTitle: 'Frequently asked questions',
    relatedTitle: 'Keep reading',
    backToBlog: 'All articles',
    switchLabel: 'Leer en español',
    ctaTitle: 'Ready to test AI content?',
    ctaBody: 'SHOT.IS helps brands generate AI UGC ads, AI video ads, and virtual influencers without traditional shoots.',
    ctaButton: 'Start an AI content sprint',
    publishedOn: 'Published',
  },
  es: {
    blogTitle: 'Blog de SHOT.IS',
    blogLede:
      'Notas sobre anuncios UGC con IA, anuncios de video con IA e influencers virtuales: qué funciona en la creatividad de performance y cómo las marcas producen más.',
    keyTakeaways: 'Puntos clave',
    readTime: (n) => `${n} min de lectura`,
    onThisPage: 'En esta página',
    faqTitle: 'Preguntas frecuentes',
    relatedTitle: 'Seguir leyendo',
    backToBlog: 'Todos los artículos',
    switchLabel: 'Read in English',
    ctaTitle: '¿Listo para probar contenido con IA?',
    ctaBody: 'SHOT.IS ayuda a las marcas a generar anuncios UGC, anuncios de video e influencers virtuales sin rodajes tradicionales.',
    ctaButton: 'Empezar un sprint de contenido',
    publishedOn: 'Publicado',
  },
};

export const blogPosts: BlogPost[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // Pair 1 — AI UGC ads guide (EN + ES)
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'ai-ugc-ads-guide',
    lang: 'en',
    translationKey: 'ai-ugc-ads-guide',
    title: 'What Are AI UGC Ads? A Practical Guide for Performance Marketers',
    description:
      'AI UGC ads are creator-style videos generated with AI instead of filmed with a human creator. Learn how they work, when to use them, and how to ship more ad variants without a shoot.',
    excerpt:
      'Creator-style video without the casting, filming, or reshoots. Here is how AI UGC ads actually work, where they win, and how to brief them.',
    datePublished: '2026-05-20',
    dateModified: '2026-06-02',
    author: defaultAuthor,
    ogImageKey: 'blog-ai-ugc-ads-guide',
    tags: ['AI UGC ads', 'UGC', 'paid social', 'creative testing'],
    tldr: [
      'AI UGC ads are creator-style videos generated with AI — a hook, a face, a product moment, and a script — instead of footage filmed with a human creator.',
      'Their main advantage is volume and speed: you can produce many hook and angle variants for creative testing without casting, filming, or reshoots.',
      'They are strongest for top-of-funnel testing, localization, and pre-validating concepts before larger spend; human creators still matter for authentic testimonials and influencer trust.',
      'A good AI UGC ad needs the same fundamentals as any ad: a clear hook, a specific buyer problem, a visible product moment, and a believable delivery.',
    ],
    blocks: [
      {
        type: 'p',
        text: 'AI UGC ads are user-generated-content-style video ads produced with generative AI instead of being filmed with a real creator. The format looks like the casual, phone-shot, talk-to-camera content that performs on TikTok, Instagram Reels, and YouTube Shorts — but the creator, voice, and scene are generated, so a single brief can become many variants in hours instead of weeks.',
      },
      {
        type: 'h2',
        id: 'how-they-work',
        text: 'How AI UGC ads work',
      },
      {
        type: 'p',
        text: 'The pipeline mirrors a normal creative brief, just with generation in the middle. You define the offer and the buyer, write a hook and a short script, choose a creator persona and a scene, then generate the video and iterate on the strongest cuts.',
      },
      {
        type: 'ol',
        items: [
          'Brief the offer: product, buyer pain, the one objection, proof, format, and target platform.',
          'Write the hook and script: the first two seconds carry the ad, so the hook is the real work.',
          'Choose the creator and scene: a persona, a setting, a tone, and a product moment that feels native to the feed.',
          'Generate and grade: produce several versions, keep what reads as believable, and discard what looks synthetic.',
          'Expand the winners: turn a working concept into hook variants, language variants, and retargeting cutdowns.',
        ],
      },
      {
        type: 'callout',
        title: 'The hook is still the product',
        body: 'AI does not change the fundamentals of direct-response creative. Most of the lift comes from the first two seconds and the clarity of the offer — not from how the footage was made.',
      },
      {
        type: 'h2',
        id: 'when-to-use',
        text: 'When AI UGC wins (and when it does not)',
      },
      {
        type: 'p',
        text: 'Think of AI UGC as a volume and speed lever for the top of the testing funnel, not a wholesale replacement for human creators. It is strongest when you need many angles quickly and weakest when authenticity is the whole point of the ad.',
      },
      {
        type: 'h3',
        id: 'use-it-for',
        text: 'Use it for',
      },
      {
        type: 'ul',
        items: [
          'Volume testing — generating 10+ hook and angle variants per week without a shoot schedule.',
          'Localization — adapting a proven concept into new languages and markets.',
          'Pre-validation — finding the message and hook that works before committing to a bigger production.',
          'Always-on creative — keeping a steady supply of fresh variants so ad fatigue does not stall a campaign.',
        ],
      },
      {
        type: 'h3',
        id: 'be-careful-with',
        text: 'Be careful with',
      },
      {
        type: 'ul',
        items: [
          'Real testimonials — claims about results are more credible from real customers.',
          'Influencer trust — when the audience follows a specific person, that relationship cannot be generated.',
          'Highly regulated claims — health, finance, and similar categories need careful review regardless of how a video was made.',
        ],
      },
      {
        type: 'h2',
        id: 'what-makes-good',
        text: 'What makes a good AI UGC ad',
      },
      {
        type: 'p',
        text: 'A believable clip is not the goal — a clip that sells is. The strongest AI UGC ads pair a scroll-stopping hook with a specific buyer problem, a visible product moment, and a delivery that feels like a person rather than a script reader.',
      },
      {
        type: 'quote',
        text: 'Realism is table stakes. The ad still has to make one clear argument to one specific person.',
      },
      {
        type: 'h2',
        id: 'getting-started',
        text: 'Getting started',
      },
      {
        type: 'p',
        text: 'Start with one proven offer and write three to five distinct hooks for it. Generate a couple of variants per hook, run them as a small test, and let signal decide what to expand. This is exactly the workflow behind [AI UGC ads at SHOT.IS](/ai-ugc-ads), where one creator persona can produce a steady stream of testable angles.',
      },
    ],
    faq: [
      {
        question: 'Can AI UGC ads replace human creator ads?',
        answer:
          'They can replace part of the testing workload, not the entire role of creators. AI UGC is strongest for fast concept volume, visual variation, localization, and pre-testing hooks before larger spend. Human creators remain valuable for authentic testimonials and influencer trust.',
      },
      {
        question: 'What brands should start with AI UGC ads?',
        answer:
          'Mobile apps, ecommerce brands, SaaS products, creator-led products, and agencies benefit most — any team that needs frequent ad variants but does not want every test to require casting, filming, and reshoots.',
      },
      {
        question: 'How many AI UGC variants should I test?',
        answer:
          'Start small: three to five distinct hooks, one or two versions each. Expand only the variants that show signal, rather than generating dozens at once.',
      },
    ],
  },
  {
    slug: 'guia-anuncios-ugc-ia',
    lang: 'es',
    translationKey: 'ai-ugc-ads-guide',
    title: '¿Qué son los anuncios UGC con IA? Guía práctica para marketing de performance',
    description:
      'Los anuncios UGC con IA son videos estilo creador generados con IA en lugar de grabados con una persona. Aprende cómo funcionan, cuándo usarlos y cómo producir más variantes sin rodaje.',
    excerpt:
      'Video estilo creador sin casting, rodaje ni regrabaciones. Así funcionan realmente los anuncios UGC con IA, dónde ganan y cómo escribir el brief.',
    datePublished: '2026-05-20',
    dateModified: '2026-06-02',
    author: defaultAuthor,
    ogImageKey: 'blog-guia-anuncios-ugc-ia',
    tags: ['anuncios UGC con IA', 'UGC', 'paid social', 'testing creativo'],
    tldr: [
      'Los anuncios UGC con IA son videos estilo creador generados con IA —un hook, un rostro, un momento de producto y un guion— en lugar de grabados con una persona real.',
      'Su mayor ventaja es el volumen y la velocidad: puedes producir muchas variantes de hooks y ángulos para hacer testing sin casting, rodaje ni regrabaciones.',
      'Funcionan mejor para testing de parte superior del embudo, localización y validar conceptos antes de invertir más; los creadores reales siguen siendo clave para testimonios auténticos.',
      'Un buen anuncio UGC con IA necesita lo mismo que cualquier anuncio: un hook claro, un problema concreto, un momento de producto visible y una entrega creíble.',
    ],
    blocks: [
      {
        type: 'p',
        text: 'Los anuncios UGC con IA son anuncios de video con estilo de contenido generado por usuarios, producidos con IA generativa en lugar de grabados con un creador real. El formato se ve como el contenido casual, grabado con el móvil y a cámara que funciona en TikTok, Instagram Reels y YouTube Shorts, pero el creador, la voz y la escena se generan, así que un solo brief puede convertirse en muchas variantes en horas.',
      },
      {
        type: 'h2',
        id: 'como-funcionan',
        text: 'Cómo funcionan los anuncios UGC con IA',
      },
      {
        type: 'p',
        text: 'El proceso es como un brief creativo normal, solo que con generación en el medio. Defines la oferta y el comprador, escribes un hook y un guion corto, eliges un personaje y una escena, y luego generas el video e iteras sobre las mejores versiones.',
      },
      {
        type: 'ol',
        items: [
          'Define la oferta: producto, dolor del comprador, la objeción principal, prueba, formato y plataforma.',
          'Escribe el hook y el guion: los primeros dos segundos sostienen el anuncio, así que el hook es el trabajo real.',
          'Elige al creador y la escena: un personaje, un entorno, un tono y un momento de producto que se sienta nativo del feed.',
          'Genera y evalúa: produce varias versiones, conserva lo que se ve creíble y descarta lo que parece sintético.',
          'Escala las ganadoras: convierte un concepto que funciona en variantes de hook, de idioma y cortes de retargeting.',
        ],
      },
      {
        type: 'callout',
        title: 'El hook sigue siendo el producto',
        body: 'La IA no cambia los fundamentos de la creatividad de respuesta directa. La mayor parte del resultado viene de los primeros dos segundos y la claridad de la oferta, no de cómo se hizo el video.',
      },
      {
        type: 'h2',
        id: 'cuando-usar',
        text: 'Cuándo gana el UGC con IA (y cuándo no)',
      },
      {
        type: 'p',
        text: 'Piensa en el UGC con IA como una palanca de volumen y velocidad para la parte alta del embudo de testing, no como un reemplazo total de los creadores. Gana cuando necesitas muchos ángulos rápido y pierde cuando la autenticidad es todo el punto del anuncio.',
      },
      {
        type: 'h3',
        id: 'usalo-para',
        text: 'Úsalo para',
      },
      {
        type: 'ul',
        items: [
          'Testing de volumen: generar más de 10 variantes de hooks y ángulos por semana sin agenda de rodaje.',
          'Localización: adaptar un concepto probado a nuevos idiomas y mercados.',
          'Validación previa: encontrar el mensaje y el hook que funciona antes de una producción mayor.',
          'Creatividad siempre activa: mantener un flujo de variantes nuevas para que la fatiga publicitaria no frene la campaña.',
        ],
      },
      {
        type: 'h3',
        id: 'cuidado-con',
        text: 'Ten cuidado con',
      },
      {
        type: 'ul',
        items: [
          'Testimonios reales: las afirmaciones de resultados son más creíbles de clientes reales.',
          'Confianza del influencer: cuando la audiencia sigue a una persona concreta, esa relación no se puede generar.',
          'Afirmaciones reguladas: salud, finanzas y categorías similares necesitan revisión cuidadosa sin importar cómo se hizo el video.',
        ],
      },
      {
        type: 'h2',
        id: 'que-hace-bueno',
        text: 'Qué hace bueno a un anuncio UGC con IA',
      },
      {
        type: 'p',
        text: 'Un clip creíble no es el objetivo; un clip que vende sí lo es. Los mejores anuncios UGC con IA combinan un hook que detiene el scroll con un problema concreto, un momento de producto visible y una entrega que se siente como una persona y no como alguien leyendo un guion.',
      },
      {
        type: 'quote',
        text: 'El realismo es lo mínimo. El anuncio todavía tiene que hacer un argumento claro a una persona específica.',
      },
      {
        type: 'h2',
        id: 'como-empezar',
        text: 'Cómo empezar',
      },
      {
        type: 'p',
        text: 'Empieza con una oferta probada y escribe de tres a cinco hooks distintos. Genera un par de variantes por hook, lánzalas como un test pequeño y deja que la señal decida qué escalar. Este es exactamente el flujo detrás de los [anuncios UGC con IA en SHOT.IS](/ai-ugc-ads), donde un solo personaje puede producir un flujo constante de ángulos para testear.',
      },
    ],
    faq: [
      {
        question: '¿Los anuncios UGC con IA pueden reemplazar a los anuncios con creadores reales?',
        answer:
          'Pueden reemplazar parte de la carga de testing, no todo el rol de los creadores. El UGC con IA es más fuerte para volumen de conceptos, variación visual, localización y validar hooks antes de invertir más. Los creadores reales siguen siendo valiosos para testimonios auténticos y confianza.',
      },
      {
        question: '¿Qué marcas deberían empezar con anuncios UGC con IA?',
        answer:
          'Apps móviles, ecommerce, productos SaaS, productos liderados por creadores y agencias se benefician más: cualquier equipo que necesite variantes frecuentes pero no quiera que cada test requiera casting, rodaje y regrabaciones.',
      },
      {
        question: '¿Cuántas variantes UGC con IA debería testear?',
        answer:
          'Empieza pequeño: de tres a cinco hooks distintos, una o dos versiones de cada uno. Escala solo las variantes que muestran señal, en lugar de generar docenas a la vez.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Pair 2 — Virtual influencers explained (EN + ES)
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'what-is-a-virtual-influencer',
    lang: 'en',
    translationKey: 'virtual-influencers-explained',
    title: 'What Is a Virtual Influencer? How AI Creators Work for Brands',
    description:
      'A virtual influencer is a digital creator identity used in social content and campaigns. Learn how AI creators are built, why brands use them, and how to keep them consistent.',
    excerpt:
      'Not a single image — a reusable creator asset with a face, a voice, and a campaign job. Here is how virtual influencers work for brands.',
    datePublished: '2026-05-27',
    dateModified: '2026-05-27',
    author: defaultAuthor,
    ogImageKey: 'blog-what-is-a-virtual-influencer',
    tags: ['virtual influencers', 'AI creators', 'brand', 'social'],
    tldr: [
      'A virtual influencer is a digital creator identity — a consistent face, tone, and style — used across social content, ads, and campaigns.',
      'For brands the real value is not the character design but the ability to produce repeatable, on-brand content quickly and on your own schedule.',
      'They give brands control over timing, format, localization, and continuity that depending on a single human creator cannot.',
      'Consistency is the hard part: a virtual influencer only works as a brand asset if the face, voice, and behavior stay recognizable over time.',
    ],
    blocks: [
      {
        type: 'p',
        text: 'A virtual influencer is a digital creator identity used in social content, advertising, and brand storytelling. Unlike a one-off AI image, a virtual influencer is designed to be reused — the same recognizable character appears across posts, ads, and campaigns, carrying a consistent face, voice, and personality.',
      },
      {
        type: 'h2',
        id: 'how-built',
        text: 'How a virtual influencer is built',
      },
      {
        type: 'p',
        text: 'A useful virtual influencer is more than a good portrait. It is a small system: an identity, a set of rules for how it looks and speaks, and a content plan that gives it something to actually do.',
      },
      {
        type: 'ol',
        items: [
          'Position the creator: define the audience, genre, brand fit, and the campaign purpose before designing the character.',
          'Lock the identity: a repeatable face, wardrobe logic, world, tone, and content behavior.',
          'Create campaign assets: videos, stills, scripts, captions, and paid social versions built from the same identity.',
          'Scale the world: launches, collaborations, seasonal drops, and localized versions for new markets.',
        ],
      },
      {
        type: 'h2',
        id: 'why-brands',
        text: 'Why brands use virtual influencers',
      },
      {
        type: 'p',
        text: 'The pitch is control and continuity. A virtual influencer does not have a calendar, a rate card, or a competing sponsorship, so a brand can produce content on its own schedule and keep a consistent face across every market.',
      },
      {
        type: 'ul',
        items: [
          'Timing — content can be produced whenever a campaign needs it, not when a creator is available.',
          'Continuity — the same character can anchor launches across many months and markets.',
          'Localization — the identity can speak multiple languages while staying recognizable.',
          'Brand safety — what the character says and endorses stays under the brand’s control.',
        ],
      },
      {
        type: 'callout',
        title: 'Virtual does not mean trustless',
        body: 'Audiences can connect with a virtual creator, but the brand has to be clear that it is AI. Transparency protects trust; pretending otherwise erodes it.',
      },
      {
        type: 'h2',
        id: 'consistency',
        text: 'The hard part: consistency',
      },
      {
        type: 'p',
        text: 'A virtual influencer only works as a brand asset if it stays recognizable. Drifting facial features, an inconsistent voice, or off-brand behavior break the illusion and waste the value of building a character in the first place. This is why a virtual influencer is best treated as a maintained identity with rules, not a prompt you re-run from scratch each time.',
      },
      {
        type: 'h2',
        id: 'human-vs-virtual',
        text: 'Virtual vs. human influencers',
      },
      {
        type: 'p',
        text: 'Human influencers still provide something a virtual creator cannot: a real audience relationship and lived credibility. Virtual influencers are strongest when consistency, production speed, and localization matter more than that personal trust. Many brands use both — a human creator for reach and trust, a virtual creator for always-on, controllable content. You can read how SHOT.IS builds these as reusable assets on the [virtual influencers](/virtual-influencers) page.',
      },
    ],
    faq: [
      {
        question: 'What is a virtual influencer?',
        answer:
          'A virtual influencer is a digital creator identity used in social content, campaigns, and brand storytelling. For performance marketing, the useful part is not only the character design but the ability to create repeatable content quickly and consistently.',
      },
      {
        question: 'Why use a virtual influencer instead of a human influencer?',
        answer:
          'Virtual influencers give brands more control over timing, format, visuals, localization, and campaign continuity. Human influencers still provide audience trust; virtual creators are strongest when consistency and production speed matter most.',
      },
      {
        question: 'Do you have to disclose that an influencer is AI?',
        answer:
          'Yes — being transparent that a creator is virtual protects audience trust and aligns with platform and advertising expectations. Clear disclosure is part of using virtual influencers responsibly.',
      },
    ],
  },
  {
    slug: 'que-es-un-influencer-virtual',
    lang: 'es',
    translationKey: 'virtual-influencers-explained',
    title: '¿Qué es un influencer virtual? Cómo funcionan los creadores con IA para marcas',
    description:
      'Un influencer virtual es una identidad de creador digital usada en contenido y campañas. Aprende cómo se construyen los creadores con IA, por qué las marcas los usan y cómo mantenerlos consistentes.',
    excerpt:
      'No es una sola imagen: es un activo de creador reutilizable con rostro, voz y un propósito de campaña. Así funcionan los influencers virtuales.',
    datePublished: '2026-05-27',
    dateModified: '2026-05-27',
    author: defaultAuthor,
    ogImageKey: 'blog-que-es-un-influencer-virtual',
    tags: ['influencers virtuales', 'creadores con IA', 'marca', 'social'],
    tldr: [
      'Un influencer virtual es una identidad de creador digital —un rostro, tono y estilo consistentes— usada en contenido social, anuncios y campañas.',
      'Para las marcas, el valor real no es el diseño del personaje sino la capacidad de producir contenido de marca repetible, rápido y según tu propia agenda.',
      'Dan a las marcas control sobre tiempos, formato, localización y continuidad que depender de un solo creador humano no permite.',
      'La consistencia es lo difícil: un influencer virtual solo funciona como activo de marca si el rostro, la voz y el comportamiento se mantienen reconocibles con el tiempo.',
    ],
    blocks: [
      {
        type: 'p',
        text: 'Un influencer virtual es una identidad de creador digital usada en contenido social, publicidad y narrativa de marca. A diferencia de una imagen de IA puntual, un influencer virtual está diseñado para reutilizarse: el mismo personaje reconocible aparece en publicaciones, anuncios y campañas, con un rostro, una voz y una personalidad consistentes.',
      },
      {
        type: 'h2',
        id: 'como-se-construye',
        text: 'Cómo se construye un influencer virtual',
      },
      {
        type: 'p',
        text: 'Un influencer virtual útil es más que un buen retrato. Es un pequeño sistema: una identidad, un conjunto de reglas sobre cómo se ve y habla, y un plan de contenido que le da algo que hacer.',
      },
      {
        type: 'ol',
        items: [
          'Posiciona al creador: define la audiencia, el género, el encaje con la marca y el propósito de campaña antes de diseñar el personaje.',
          'Fija la identidad: un rostro repetible, lógica de vestuario, mundo, tono y comportamiento de contenido.',
          'Crea activos de campaña: videos, fotos, guiones, captions y versiones de paid social desde la misma identidad.',
          'Escala el mundo: lanzamientos, colaboraciones, drops de temporada y versiones localizadas para nuevos mercados.',
        ],
      },
      {
        type: 'h2',
        id: 'por-que-marcas',
        text: 'Por qué las marcas usan influencers virtuales',
      },
      {
        type: 'p',
        text: 'El argumento es control y continuidad. Un influencer virtual no tiene agenda, tarifa ni patrocinios competidores, así que una marca puede producir contenido según su propio calendario y mantener un rostro consistente en cada mercado.',
      },
      {
        type: 'ul',
        items: [
          'Tiempos: el contenido se produce cuando la campaña lo necesita, no cuando el creador está disponible.',
          'Continuidad: el mismo personaje puede sostener lanzamientos durante muchos meses y mercados.',
          'Localización: la identidad puede hablar varios idiomas y seguir siendo reconocible.',
          'Seguridad de marca: lo que el personaje dice y respalda queda bajo control de la marca.',
        ],
      },
      {
        type: 'callout',
        title: 'Virtual no significa sin confianza',
        body: 'La audiencia puede conectar con un creador virtual, pero la marca debe dejar claro que es IA. La transparencia protege la confianza; fingir lo contrario la erosiona.',
      },
      {
        type: 'h2',
        id: 'consistencia',
        text: 'Lo difícil: la consistencia',
      },
      {
        type: 'p',
        text: 'Un influencer virtual solo funciona como activo de marca si se mantiene reconocible. Rasgos faciales que cambian, una voz inconsistente o un comportamiento fuera de marca rompen la ilusión y desperdician el valor de haber construido un personaje. Por eso conviene tratarlo como una identidad mantenida con reglas, no como un prompt que se ejecuta de cero cada vez.',
      },
      {
        type: 'h2',
        id: 'humano-vs-virtual',
        text: 'Influencers virtuales vs. humanos',
      },
      {
        type: 'p',
        text: 'Los influencers humanos aún aportan algo que un creador virtual no puede: una relación real con la audiencia y credibilidad vivida. Los influencers virtuales ganan cuando la consistencia, la velocidad de producción y la localización importan más que esa confianza personal. Muchas marcas usan ambos. Puedes ver cómo SHOT.IS los construye como activos reutilizables en la página de [influencers virtuales](/virtual-influencers).',
      },
    ],
    faq: [
      {
        question: '¿Qué es un influencer virtual?',
        answer:
          'Un influencer virtual es una identidad de creador digital usada en contenido social, campañas y narrativa de marca. Para el marketing de performance, lo útil no es solo el diseño del personaje sino la capacidad de crear contenido repetible de forma rápida y consistente.',
      },
      {
        question: '¿Por qué usar un influencer virtual en lugar de uno humano?',
        answer:
          'Los influencers virtuales dan más control sobre tiempos, formato, visuales, localización y continuidad de campaña. Los humanos siguen aportando confianza de audiencia; los virtuales ganan cuando la consistencia y la velocidad de producción son lo más importante.',
      },
      {
        question: '¿Hay que revelar que un influencer es IA?',
        answer:
          'Sí: ser transparente sobre que un creador es virtual protege la confianza de la audiencia y se alinea con las expectativas de las plataformas y la publicidad. La divulgación clara es parte de usar influencers virtuales de forma responsable.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // EN-only — AI video ads vs traditional production (no ES sibling on purpose)
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'ai-video-ads-vs-traditional',
    lang: 'en',
    translationKey: 'ai-video-ads-vs-traditional',
    title: 'AI Video Ads vs. Traditional Production: Cost, Speed, and Quality',
    description:
      'How AI video ads compare to traditional production on cost, turnaround, and quality — and a practical way to combine both for short-form performance marketing.',
    excerpt:
      'Faster and cheaper is the easy headline. The real question is where each approach actually wins. A practical comparison.',
    datePublished: '2026-06-02',
    dateModified: '2026-06-02',
    author: defaultAuthor,
    ogImageKey: 'blog-ai-video-ads-vs-traditional',
    tags: ['AI video ads', 'production', 'cost', 'paid social'],
    tldr: [
      'AI video ads win on cost and turnaround: many concepts in days instead of one polished shoot in weeks.',
      'Traditional production still wins on hero assets, real people, and footage where physical authenticity is the point.',
      'The strongest setup is hybrid: AI for volume testing and localization, traditional for the few flagship assets that carry the brand.',
      'Compare on the job to be done — testing velocity vs. flagship polish — not on a single cost-per-video number.',
    ],
    blocks: [
      {
        type: 'p',
        text: '“AI is cheaper and faster” is true but incomplete. The more useful comparison is which approach fits the job: AI video ads are built for testing velocity and volume, while traditional production is built for a small number of high-polish, high-trust assets. Most brands do not have to choose one.',
      },
      {
        type: 'h2',
        id: 'cost',
        text: 'Cost',
      },
      {
        type: 'p',
        text: 'A traditional shoot front-loads cost — crew, talent, location, and edit — into a small number of finished videos. AI video ads spread a much lower marginal cost across many variants, so the economics flip from “one expensive video” to “many cheap tests.” For creative testing, where most variants are meant to be discarded, that difference is the whole point.',
      },
      {
        type: 'h2',
        id: 'speed',
        text: 'Speed',
      },
      {
        type: 'p',
        text: 'Turnaround is where the gap is widest. A traditional concept can take weeks from brief to delivery once scheduling and reshoots are included. AI video ads collapse that to days, which means creative can keep pace with paid social instead of lagging behind it.',
      },
      {
        type: 'callout',
        title: 'Speed compounds',
        body: 'Faster turnaround is not just convenient — it means more test cycles per month, and more test cycles is how you find winning creative sooner.',
      },
      {
        type: 'h2',
        id: 'quality',
        text: 'Quality',
      },
      {
        type: 'p',
        text: 'Quality is the most nuanced axis. AI video has closed much of the gap for feed-native, casual formats, but physical authenticity — a real person handling a real product, a specific location, a genuine reaction — is still where traditional production leads. The right question is not “which looks better in the abstract” but “what does this specific placement need.”',
      },
      {
        type: 'h2',
        id: 'hybrid',
        text: 'The hybrid approach',
      },
      {
        type: 'p',
        text: 'In practice the best setup blends both. Use AI video ads to test angles, hooks, and languages at volume, find what works, and only then invest traditional production budget into the few flagship assets that deserve it. This is the philosophy behind [AI video ads at SHOT.IS](/ai-video-ads): treat AI as the testing engine and reserve expensive production for proven winners.',
      },
      {
        type: 'ul',
        items: [
          'Use AI for: volume testing, localization, retargeting cutdowns, and always-on variants.',
          'Use traditional for: hero brand films, real testimonials, and footage where authenticity is the message.',
          'Combine them: validate cheaply with AI, then produce the proven concept at higher polish.',
        ],
      },
    ],
    faq: [
      {
        question: 'Are AI video ads cheaper than traditional production?',
        answer:
          'Per variant, yes — AI video ads have a much lower marginal cost, which is why they suit volume testing. Traditional production concentrates higher cost into a few finished assets, which suits flagship brand work.',
      },
      {
        question: 'Is AI video quality good enough for ads?',
        answer:
          'For feed-native, casual short-form formats, AI video is often good enough and improving quickly. For footage where physical authenticity is the whole point, traditional production still leads.',
      },
      {
        question: 'Should I replace my whole production pipeline with AI?',
        answer:
          'Usually no. The strongest approach is hybrid: AI for testing velocity and localization, traditional production for the small number of flagship assets that carry the brand.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ES-only — Creatividad con IA para marcas (no EN sibling on purpose)
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'creatividad-ia-para-marcas',
    lang: 'es',
    translationKey: 'creatividad-ia-para-marcas',
    title: 'Creatividad con IA para marcas: cómo escalar anuncios de video',
    description:
      'Cómo las marcas usan la creatividad con IA para producir más anuncios de video, testear más rápido y localizar campañas sin multiplicar el presupuesto de producción.',
    excerpt:
      'Más conceptos, más formatos y más velocidad de testing. Así escalan las marcas su creatividad de video con IA sin disparar el presupuesto.',
    datePublished: '2026-06-05',
    dateModified: '2026-06-05',
    author: defaultAuthor,
    ogImageKey: 'blog-creatividad-ia-para-marcas',
    tags: ['creatividad con IA', 'anuncios de video', 'marcas', 'paid social'],
    tldr: [
      'La creatividad con IA permite a las marcas producir muchos más conceptos y formatos sin multiplicar el presupuesto de producción.',
      'Su mayor impacto está en la velocidad de testing: más ciclos de prueba al mes significan encontrar antes la creatividad ganadora.',
      'La localización se vuelve barata: un concepto probado puede adaptarse a varios idiomas y mercados rápidamente.',
      'El objetivo no es reemplazar a los equipos creativos, sino darles una palanca de volumen para explorar más ideas con el mismo presupuesto.',
    ],
    blocks: [
      {
        type: 'p',
        text: 'La creatividad con IA cambia la economía del video para marcas. En lugar de elegir entre pocos anuncios bien producidos, los equipos pueden explorar muchos conceptos, formatos y ángulos con el mismo presupuesto, y dejar que los datos decidan en qué invertir más.',
      },
      {
        type: 'h2',
        id: 'volumen',
        text: 'Volumen sin disparar el presupuesto',
      },
      {
        type: 'p',
        text: 'El cuello de botella tradicional de la creatividad es la producción: cada concepto nuevo cuesta tiempo y dinero. La IA reduce el coste marginal de cada variante, así que producir diez ideas deja de ser un lujo y pasa a ser parte normal del proceso de testing.',
      },
      {
        type: 'h2',
        id: 'velocidad-testing',
        text: 'Velocidad de testing',
      },
      {
        type: 'p',
        text: 'El mayor impacto no es el ahorro por video, sino la cantidad de ciclos de prueba que puedes correr. Más variantes lanzadas más rápido significan más aprendizaje por mes, y eso es lo que acelera encontrar la creatividad que funciona.',
      },
      {
        type: 'callout',
        title: 'Testear es el verdadero producto',
        body: 'La ventaja de la IA no es hacer un video perfecto, sino permitirte fallar barato muchas veces hasta encontrar el ángulo que convierte.',
      },
      {
        type: 'h2',
        id: 'localizacion',
        text: 'Localización barata',
      },
      {
        type: 'p',
        text: 'Una vez que un concepto funciona, adaptarlo a nuevos mercados solía requerir nuevas grabaciones. Con IA, un concepto ganador puede convertirse en variantes de idioma y de cultura rápidamente, manteniendo el mensaje que ya demostró funcionar.',
      },
      {
        type: 'ul',
        items: [
          'Más conceptos por campaña con el mismo presupuesto.',
          'Adaptación rápida a varios idiomas y mercados.',
          'Variantes de retargeting y cortes nuevos sin volver a grabar.',
          'Un flujo constante de creatividad fresca contra la fatiga publicitaria.',
        ],
      },
      {
        type: 'h2',
        id: 'equipos',
        text: 'Una palanca para los equipos, no un reemplazo',
      },
      {
        type: 'p',
        text: 'La creatividad con IA funciona mejor como herramienta para los equipos creativos, no como sustituto. Da volumen y velocidad para explorar más ideas, mientras la estrategia, el criterio y la marca siguen siendo humanos. Así enfocamos los [anuncios de video con IA en SHOT.IS](/ai-video-ads): la IA como motor de testing, el equipo como dirección.',
      },
    ],
    faq: [
      {
        question: '¿La creatividad con IA reemplaza a los equipos creativos?',
        answer:
          'No. Funciona mejor como una palanca de volumen y velocidad para los equipos creativos. La estrategia, el criterio y la voz de marca siguen siendo humanos; la IA amplía cuántas ideas se pueden explorar.',
      },
      {
        question: '¿Cuál es el mayor beneficio de la creatividad con IA para una marca?',
        answer:
          'La velocidad de testing. Poder lanzar más variantes más rápido significa más ciclos de aprendizaje por mes, que es lo que acelera encontrar la creatividad ganadora.',
      },
      {
        question: '¿Sirve la IA para localizar campañas?',
        answer:
          'Sí. Un concepto probado puede adaptarse a varios idiomas y mercados rápidamente, manteniendo el mensaje que ya demostró funcionar, sin necesidad de nuevas grabaciones.',
      },
    ],
  },
];

// ── Derived lookups ─────────────────────────────────────────────────────────

const byDateDesc = (a: BlogPost, b: BlogPost) => (a.datePublished < b.datePublished ? 1 : -1);

export const blogPostsByLang: Record<BlogLang, BlogPost[]> = {
  en: blogPosts.filter((p) => p.lang === 'en').sort(byDateDesc),
  es: blogPosts.filter((p) => p.lang === 'es').sort(byDateDesc),
};

export const blogPostPath = (post: BlogPost): string =>
  post.lang === 'en' ? `/blog/${post.slug}` : `/es/blog/${post.slug}`;

export const blogIndexPath = (lang: BlogLang): string => blogBasePath[lang];

export const blogPostByPath: Map<string, BlogPost> = new Map(
  blogPosts.map((post) => [blogPostPath(post), post]),
);

export const blogPostsByTranslationKey: Map<string, Partial<Record<BlogLang, BlogPost>>> = (() => {
  const map = new Map<string, Partial<Record<BlogLang, BlogPost>>>();
  for (const post of blogPosts) {
    const entry = map.get(post.translationKey) ?? {};
    entry[post.lang] = post;
    map.set(post.translationKey, entry);
  }
  return map;
})();

/** Sibling translation of a post in the other language, if one exists. */
export const blogSibling = (post: BlogPost): BlogPost | undefined => {
  const pair = blogPostsByTranslationKey.get(post.translationKey);
  const other: BlogLang = post.lang === 'en' ? 'es' : 'en';
  return pair?.[other];
};

const absolute = (path: string) => `${siteBaseUrl}${path}`;

export type Alternate = { hreflang: string; href: string };

/**
 * hreflang alternates for a post. Always emits a self-referential alternate and an
 * x-default so reciprocity is valid even for single-language posts (Search Console
 * flags "no return tag" otherwise). x-default points to the EN version when it exists.
 */
export const blogAlternates = (post: BlogPost): Alternate[] => {
  const pair = blogPostsByTranslationKey.get(post.translationKey) ?? { [post.lang]: post };
  const alternates: Alternate[] = [];

  (Object.keys(pair) as BlogLang[]).forEach((lang) => {
    const p = pair[lang];
    if (p) alternates.push({ hreflang: lang, href: absolute(blogPostPath(p)) });
  });

  const xDefault = pair.en ?? post;
  alternates.push({ hreflang: 'x-default', href: absolute(blogPostPath(xDefault)) });

  return alternates;
};

/** hreflang alternates for the blog index pages (both languages always exist). */
export const blogIndexAlternates = (): Alternate[] => [
  { hreflang: 'en', href: absolute(blogIndexPath('en')) },
  { hreflang: 'es', href: absolute(blogIndexPath('es')) },
  { hreflang: 'x-default', href: absolute(blogIndexPath('en')) },
];

const countWords = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

export const readingTime = (post: BlogPost): number => {
  if (post.readingMinutes) return post.readingMinutes;
  let words = countWords(post.title) + countWords(post.description) + post.tldr.reduce((n, t) => n + countWords(t), 0);
  for (const block of post.blocks) {
    if ('text' in block && typeof block.text === 'string') words += countWords(block.text);
    if ('items' in block) words += block.items.reduce((n, i) => n + countWords(i), 0);
    if (block.type === 'callout') words += countWords(block.title) + countWords(block.body);
  }
  for (const f of post.faq ?? []) words += countWords(f.question) + countWords(f.answer);
  return Math.max(1, Math.round(words / 200));
};

/** All indexable blog routes: both index pages + every post path. */
export const blogRoutes = (): string[] => [
  blogIndexPath('en'),
  blogIndexPath('es'),
  ...blogPosts.map(blogPostPath),
];

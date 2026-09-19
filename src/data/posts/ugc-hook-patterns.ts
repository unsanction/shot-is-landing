import { founderAuthor, type BlogPost } from '../blogTypes';

export const post: BlogPost = {
  slug: 'ugc-hook-patterns',
  lang: 'en',
  translationKey: 'ugc-hook-patterns',
  title: '20 UGC Hook Patterns We Actually Test in AI Ads',
  description:
    'A library of 20 UGC hook examples and ad hook formulas we test in AI ads, grouped by family, with templates, when each works, and how to brief variants.',
  excerpt:
    'The first two seconds decide whether the rest of your ad exists. Here are the 20 hook patterns we keep coming back to, and how we mass-produce variants with AI.',
  datePublished: '2026-06-10',
  dateModified: '2026-06-10',
  author: founderAuthor,
  ogImageKey: 'blog-ugc-hook-patterns',
  tags: ['UGC hooks', 'ad scripts', 'AI UGC', 'creative testing'],
  tldr: [
    'A hook is the first 1–2 seconds of a short-form ad; on paid social it decides most of the watch-through, so it deserves more test variants than any other part of the creative.',
    'Most working UGC hooks fall into five families: problem call-out, pattern interrupt, social proof, curiosity gap, and direct claim or demo.',
    'With an AI pipeline you re-hook one validated ad body cheaply, keeping the same 25–35 seconds of body under a new first shot, so a single concept becomes 5–10 testable ads.',
    'Hooks fatigue in days on paid social, not weeks, which is why a library of patterns plus cheap variant production beats polishing one opening shot.',
    'Each hook variant needs its own brief covering spoken line, on-screen text, first visual, framing, and emotional register, rather than a new sentence pasted over the same footage.',
  ],
  blocks: [
    {
      type: 'p',
      text: 'A hook is the first one to two seconds of a short-form ad: the single shot and line that decide whether a viewer keeps watching or scrolls. After producing AI UGC ads daily, we keep returning to roughly 20 hook patterns across five families: problem call-out, pattern interrupt, social proof, curiosity gap, and direct claim or demo. Below is the full library, each pattern with a one-line template and the situation where it earns its keep, plus the part most articles skip. That part is how to turn one validated ad into many hook variants cheaply, because every hook dies within days anyway.',
    },
    {
      type: 'h2',
      id: 'why-hooks-decide-everything',
      text: 'Why does the first 2 seconds matter more than the other 28?',
    },
    {
      type: 'p',
      text: 'On feed placements, the platform makes a keep-or-skip decision for the viewer almost instantly, and the viewer makes one right after. If the opening shot does not stop the scroll, nothing downstream ever gets seen: not the demo, not the offer, not the edit. So we treat the hook as a separate creative unit with its own iteration budget. The body of an ad survives weeks of rotation, while the hook burns out first and moves results most on a small change.',
    },
    {
      type: 'p',
      text: 'That asymmetry makes AI production a good fit for hooks. In our [keyframe-first pipeline](/blog/ai-ad-production-pipeline), a hook variant costs one new keyframe, one new 4–6 second i2v clip, and a re-render of the assembly rather than a reshoot. The body stays untouched. Cheap variants change how you write hooks: you stop hunting for the one perfect opener and start testing a spread of patterns.',
    },
    {
      type: 'h2',
      id: 'problem-call-out-hooks',
      text: 'Family 1: problem call-out hooks',
    },
    {
      type: 'p',
      text: 'These hooks name the viewer’s pain before naming the product. They self-select hard: people without the problem scroll past, and people with it stop. Treat that filtering as a feature, because watch-through and intent both rise even when raw hook rate drops.',
    },
    {
      type: 'ul',
      items: [
        'Direct pain call-out: “If your [X] still does [annoying thing], watch this.” Works when the pain is common, concrete, and slightly embarrassing to admit.',
        'The “stop doing this” opener: “Stop [common behavior]. It’s why your [X] isn’t working.” Works when the audience already tries to solve the problem the wrong way.',
        'Cost-of-inaction: “Every week you keep [doing X], you’re losing [time/money/result].” Works for B2B-ish and utility products where the waste is quantifiable.',
        'The mirror: the actor restates the viewer’s inner monologue, as in “I knew I needed [X], I just kept putting it off.” Works for considered purchases with guilt or procrastination attached.',
      ],
    },
    {
      type: 'h2',
      id: 'pattern-interrupt-hooks',
      text: 'Family 2: pattern interrupt hooks',
    },
    {
      type: 'p',
      text: 'Pattern interrupts win the first half-second visually, before a single word lands. They depend most on placement, since what interrupts a polished feed looks normal in a chaotic one, and they decay into clickbait fastest when the body does not pay off the weirdness.',
    },
    {
      type: 'ul',
      items: [
        'Mid-action open: the clip starts in the middle of something already happening, such as pouring, dropping, or a half-done unboxing. Works because no “intro” exists to skip and the brain wants to resolve the action.',
        'The wrong-place product: the product appears somewhere it should not be, like a coffee cup on a gym bench or skincare in a car. Works for visually distinctive products with strong brand color.',
        'Whisper or silence open: the actor leans in and whispers, or a beat of dead silence precedes the line. Works in sound-on placements where every other ad opens loud.',
        'Visual glitch or freeze: a deliberate freeze-frame, rewind, or jump cut in the first second. Works for younger, edit-literate audiences, and reads as broken to older ones.',
      ],
    },
    {
      type: 'h2',
      id: 'social-proof-hooks',
      text: 'Family 3: social proof hooks',
    },
    {
      type: 'p',
      text: 'Social proof hooks borrow trust the brand has not earned yet. We hold ourselves to one rule: never fabricate numbers, reviews, or named customers. The pattern works with real, verifiable claims, and an AI actor delivering a true claim still delivers a true claim.',
    },
    {
      type: 'ul',
      items: [
        'The reluctant convert: “I didn’t believe this would work.” Works for skeptical categories like supplements and productivity tools, where doubt is the default.',
        'Crowd reference: “Everyone keeps asking me about [X], so here it is.” Works when the product shows in public, covering bags, drinks, gadgets, and anything strangers comment on.',
        'The recommendation relay: “My [sister/trainer/dentist] told me to try this.” Works because borrowed authority feels less like an ad than a first-person pitch.',
        'Honest-review framing: “Real talk: here’s what’s good and what’s not.” Works mid-funnel and for retargeting, where the viewer has seen the polished version and wants the catch.',
      ],
    },
    {
      type: 'h2',
      id: 'curiosity-gap-hooks',
      text: 'Family 4: curiosity gap hooks',
    },
    {
      type: 'p',
      text: 'Curiosity hooks open a loop the viewer keeps watching to close. They post the highest hook rates in our tests and the steepest drop-offs when the payoff lands late, because the gap buys you seconds rather than the full ad. Put the payoff inside the first 10 seconds or the loop snaps.',
    },
    {
      type: 'ul',
      items: [
        'The withheld object: “I can’t believe nobody talks about this” while the product stays just out of frame. Works when the reveal itself is visually satisfying.',
        'Before-the-after: open on the “after” state with “this took me 12 days” framing, then rewind. Works for transformation products across skin, fitness, home, and organization.',
        'The forbidden angle: “My [industry] friends will hate me for sharing this.” Works for products that undercut an expensive incumbent such as a salon, agency, or gym.',
        'The unfinished sentence: the spoken line cuts off at the most loaded word and the next shot answers it. Works as a pure editing trick and pairs with almost any body.',
      ],
    },
    {
      type: 'h2',
      id: 'direct-claim-demo-hooks',
      text: 'Family 5: direct claim and demo hooks',
    },
    {
      type: 'p',
      text: 'The unfashionable family that quietly performs. No misdirection, just the product, the claim, and proof, immediately. These hooks post the lowest hook rates and often the best cost per action, because everyone who stays past second two is already qualified.',
    },
    {
      type: 'ul',
      items: [
        'Claim plus countdown: “This removes [problem] in under 30 seconds. Watch.” Works when the demo is fast and visual, and never use it when it is not.',
        'The side-by-side: split screen of with and without from frame one. Works for anything with a visible delta across cleaning, color, texture, and speed.',
        'Price anchor open: “This costs less than your [daily coffee/one gym visit].” Works for impulse price points where the only objection is “is it worth it”.',
        'The blunt demo: no spoken hook at all, just hands, product, action, and result in the first two seconds. Works in sound-off placements and as the control variant every test should include.',
      ],
    },
    {
      type: 'h2',
      id: 'one-body-many-hooks',
      text: 'How do you turn one concept into ten hook variants with AI?',
    },
    {
      type: 'p',
      text: 'Traditional UGC makes hook testing expensive, because every variant means re-briefing a creator, waiting for a new take, and hoping the energy matches the original. In an AI pipeline the body of the ad, covering the demo, the proof, and the offer, stays a fixed and already-validated asset. Re-hooking it becomes a small, contained production job, and because we anchor every shot on a graded keyframe, the new hook matches the world of the body: same actor identity, same location, same outfit, same light. Our [AI UGC cost breakdown](/blog/ai-ugc-ads-cost) covers the mechanics and costs, and the hook-swap process looks like this:',
    },
    {
      type: 'ol',
      items: [
        'Pick the validated body: a 25–35 second ad where the middle and end already hold retention and only the opening underperforms or has fatigued.',
        'Choose 3–5 hook patterns from different families above. Same-family variants tell you which line is better; cross-family variants tell you which psychology works, which is the more valuable answer early on.',
        'Write each hook as a full micro-brief covering spoken line, on-screen text, first visual, and framing, using the template below, rather than a new sentence.',
        'Generate keyframes for each hook using the same Scene Bible as the body, with one locked location, one outfit, and the same palette and lens feel, so the cut into the body stays invisible.',
        'Grade the stills and animate only the keepers via image-to-video. Expect 2–4 keyframe candidates per hook to keep one; rejecting a bad still costs cents, rejecting a bad clip costs minutes.',
        'Re-render the assembly per variant on the same beat grid so the first cut still lands on a music onset, then ship all variants into the same ad set and let spend decide.',
      ],
    },
    {
      type: 'callout',
      title: 'Field note: the hook is a different shot, not a different caption',
      body: 'Our early mistake was treating hook variants as text swaps: same opening clip, new overlay. Hook rate barely moved. Variants only separated when each hook got its own first shot with a different visual, a different framing, and a different first beat of motion. The viewer’s thumb reacts to the frame before the words, so a real hook test changes the frame. Since then every hook variant in our runs is a fresh keyframe and a fresh 4–6 second clip, and the spread between best and worst variant in a batch grew large enough to act on.',
    },
    {
      type: 'h2',
      id: 'hook-fatigue',
      text: 'How fast do hooks fatigue, and what does that mean for volume?',
    },
    {
      type: 'p',
      text: 'On paid social, a winning hook fatigues in days rather than weeks. The audience that responded gets reached, frequency climbs, and the scroll-stop effect of the opening decays fastest because it depends on surprise, which hits pattern interrupts and curiosity gaps hardest. The body of the ad ages much more slowly, since the proof and the offer do not stop being true.',
    },
    {
      type: 'p',
      text: 'That math is the whole argument for volume. If a hook lives roughly a week and you want an always-on account, you need a continuous supply of fresh openings, which is brutal when each one is a shoot and routine when each one is a keyframe plus a short i2v clip. It is also why we would rather ship five honest 7-out-of-10 hooks this week than one polished 9 next month, since the polished one dies on the same schedule. For how this fits a full production cadence, see our [complete AI UGC guide](/blog/ai-ugc-ads-guide).',
    },
    {
      type: 'h2',
      id: 'hook-variant-brief-template',
      text: 'What to specify when briefing a hook variant',
    },
    {
      type: 'p',
      text: 'A vague brief (“make it punchier”) produces interchangeable variants. Each hook variant we generate is specified down to the frame. Per variant, write down:',
    },
    {
      type: 'ol',
      items: [
        'Pattern and family: name the pattern from the library, such as “reluctant convert” in the social proof family, so the intent stays explicit and you can group results by family later.',
        'Spoken line: the exact words for seconds 0–2, written for speech rather than print. Read it aloud once, and if it runs longer than two seconds, cut it.',
        'On-screen text: the burned-in overlay at 5–7 words maximum, plus where it sits so it survives platform UI. Avoid the bottom third.',
        'First visual: what sits in frame at 0:00, covering actor, product, action already in progress, and the camera framing of close-up, medium, or POV.',
        'Emotional register: one word, whether skeptical, excited, conspiratorial, or deadpan. It drives the actor’s expression in the keyframe and the motion prompt in i2v.',
        'Continuity constants: which Scene Bible elements carry over from the body, including location, outfit, and palette, so the cut from hook to body never reads as two different ads.',
        'The cut point: the exact frame of the body this hook lands into, so the editor or the assembly script never guesses.',
      ],
    },
    {
      type: 'h2',
      id: 'getting-started',
      text: 'What we’d do in your place',
    },
    {
      type: 'p',
      text: 'Skip testing all 20 patterns at once. Take your best existing ad, or one validated concept, and build a first batch of five hooks, one from each family: problem call-out, pattern interrupt, social proof, curiosity gap, and a blunt demo as the control. Run them in one ad set for a few days, note which family wins, then spend the next batch exploring inside that family. Two cycles of this tells you more about your audience than a quarter of single-ad testing.',
    },
    {
      type: 'p',
      text: 'If you would rather not build the pipeline yourself, we run this loop for clients as [AI UGC ads at SHOT.IS](/ai-ugc-ads): validated body, fresh hooks weekly, machine-graded keyframes, beat-synced assembly. Bring one concept and leave with a hook library that refreshes itself.',
    },
  ],
  faq: [
    {
      question: 'What is a hook in a UGC ad?',
      answer:
        'A hook is the first one to two seconds of a short-form ad: the opening shot and line that decide whether the viewer keeps watching or scrolls. On paid social placements the hook drives most of the watch-through, so it deserves more test variants than any other part of the creative.',
    },
    {
      question: 'How many hook variants should I test per concept?',
      answer:
        'Start with five hook variants per validated concept, one from each family: problem call-out, pattern interrupt, social proof, curiosity gap, and direct demo. The first round tells you which psychology fits your audience, and later rounds explore line and visual variations inside the winning family.',
    },
    {
      question: 'How quickly do ad hooks fatigue on paid social?',
      answer:
        'Winning hooks typically fatigue within days, not weeks, because their scroll-stopping effect depends on surprise and the responsive audience gets reached fast. The ad body ages slower. That is why a continuous supply of fresh hook variants matters more than polishing one perfect opening shot.',
    },
    {
      question: 'Can AI generate hook variants without reshooting the whole ad?',
      answer:
        'Yes. In a keyframe-first AI pipeline, a hook variant is one new graded keyframe animated into a 4–6 second image-to-video clip, cut onto the existing validated body. The actor identity, location, and outfit stay locked via a Scene Bible, so the new opening matches the rest of the ad.',
    },
    {
      question: 'What should a brief for a single hook variant include?',
      answer:
        'Seven things: the pattern and family, the exact spoken line for seconds 0–2, the on-screen text and its placement, the first visual and framing, the emotional register in one word, the continuity constants carried from the body, and the exact cut point where the hook lands into the body.',
    },
  ],
};

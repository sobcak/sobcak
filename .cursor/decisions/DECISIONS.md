# sobcak.cz — Project Decisions

## Stack
- **Astro** (static build) → **Cloudflare Pages**
- Edge endpoints: native Cloudflare Pages `/functions` (not Astro SSR adapter)
- TypeScript strict, semantic HTML5, pure CSS (no UI frameworks)
- Font: local/system `'JetBrains Mono', monospace` — no external font CDN (zero render-blocking requests)

## Visual system
- BG `#000000`, copy `#F5F5F5`, meta `#888888`, accents `#D4AF37` / `#FFD700`
- `--color-loss` `#FF4E42` is reserved strictly for client annual-bleed amounts (diagnostic X + contact banner); nowhere else
- PageSpeed rings: gold (`--color-accent`) on black/grey cards only — never green/amber/red PSI colors
- Border-radius `0`; borders `1px solid #222222` (default) / `#D4AF37` (focus/active)
- Breakpoints: `min-width: 768px`, `min-width: 1200px`; fluid `clamp()` type
- Inline spans: always use explicit `&nbsp;` around amount/tier spans so Astro/HTML never collapses “o1 080 000Kč” or “smluvnígarance”
- Post-launch hosting: `0 Kč/měs.` (with period); lowercase after em-dashes (“po dokončení”, “web i uzamčený”)
- Footer: “// Na architekturu dohlíží Oliver”; omit IČO until a real number exists
- CatTailNav (ALEX): geometric/ASCII session-operator portrait; fades out on scroll with `pointer-events: none` so it never overlaps content; gold eyes track pointer in the open overlay (`prefers-reduced-motion`: eyes lit, pupils static)

## Experience model — Monitor Session
- Mobile-first **session** metaphor: CRT boot → channel switcher (Alex) → diagnostic beats → recommendation theatre
- Same anchors (`#dukaz` · `#diagnostic` · `#cenik` · `#proces` · `#kontakt`); pacing/theatre changes, not IA
- `src/utils/sessionBus.ts` — `channel:enter` / `switchChannel` syncs Alex, hero CTAs, section chrome
- Mobile (`max-width: 767px`): channel-enter flash on section observe; horizontal snap strips on pricing + proces gates (no full-page y-snap — fights expanding diagnostic beats)
- Diagnostic: one beat per viewport on mobile (problem → visitors → AOV → results → form); View Transitions when available
- Pricing: recommended tier from diagnostic state snaps into focus first (horizontal strip on mobile)
- Proces: gate-by-gate horizontal snap protocol on mobile
- `prefers-reduced-motion`: no boot theatre, no scroll-driven wipes, no swipe requirement — linear usable scroll

## SEO / agentic
- Site: `https://sobcak.cz`, `lang="cs"`
- JSON-LD: `ProfessionalService` — "Tvorba webů a konverzní architektura Beroun a Praha — Oliver Sobčák"
- `public/llms.txt` for AI/agentic crawlers

## Cross-component bus
- `src/utils/diagnosticBus.ts` — unified quiz/form: `dispatchDiagnostic` / `diagnostic:update`, plus `openContactForm` / `openDiagnosticQuiz` for in-place view swaps
- `src/utils/sessionBus.ts` — Monitor Session channels: `dispatchChannelEnter` / `subscribeChannelEnter` / `switchChannel`
- `#diagnostic` and `#kontakt` share one container (`BleedCalculator`): quiz → results+cat-eye sliders → form; Pricing `data-open-contact` + nav `#kontakt` jump straight to form

## Commands
```bash
npm run dev      # local Astro
npm run build    # static → dist/
npm run preview  # preview dist/
```

## Entry points
- `src/layouts/Layout.astro`
- `src/styles/global.css`
- `src/pages/index.astro`
- `src/components/HeroFrame.astro` — ASCII TV bezel hero (`SOBČÁK` + primary CTA → `#diagnostic`, ghost → `#dukaz`)
- `src/components/CatTailNav.astro` — Alex channel switcher (geometric/ASCII operator portrait, click / Esc; eyes track pointer)
- `src/data/portfolio.ts` — modular `#dukaz` portfolio entries (domain, preview, PSI scores, vitals)
- `src/components/ProofSection.astro` — `#dukaz` portfolio showcase (framed previews + themed PSI cards + locked-editor narrative)
- `public/portfolio/` — client site preview screenshots (webp + jpg)
- `src/components/LockedEditorDemo.astro` — split-screen Locked-Schema sandbox (vanilla TS)
- `src/components/BleedCalculator.astro` — unified `#diagnostic` / `#kontakt`: discrete quiz → results + dilating cat-eye V/AOV sliders → in-place contact form (`POST /api/contact`)
- `src/components/PricingTiers.astro` — `#cenik` tier cards + Founding Partner + hosting options bar (`data-open-contact` → form + tier)
- `src/components/CollaborationRoadmap.astro` — `#proces` 5-Gate contractual timeline
- `src/components/ContactTerminal.astro` — regional footer only (form lives in BleedCalculator)
- `public/llms.txt`
- `src/utils/diagnosticBus.ts`
- `src/utils/sessionBus.ts`
- `functions/` — Cloudflare Pages Functions (edge)

## Nav anchors (homepage)
- `#dukaz` · `#diagnostic` · `#cenik` · `#proces` · `#kontakt`
- Live proof site: `https://design-home.cz` (linked from `#dukaz`)

## Copy / ToV (cs)
- Audience: owners/jednatelé in Berounsko–Praha (manufacturing, high-margin craft, premium services, local B2B)
- Tone: confident, sharp, factual, margin-anchored; no agency clichés
- Typography: hard spaces after `v/s/z/k/o/u/i/a`; NBSP in thousands and before units; decimal comma; Czech quotes `„“`; en dash `–` with spaces
- Tech→business: target ~0,8 s load + no SQL/plugin attack surface; locked editor (~30 s content edits, layout locked); PageSpeed 90+ guarantee
- design-home.cz proof PSI (lab, pagespeed.web.dev 2026-11-21): mobile 76/91/96/100 · desktop 80/91/96/100 (Perf/A11y/BP/SEO); ProofSection shows switchable MOBIL|DESKTOP vitals

## Pricing (on-site + llms.txt)
- Shared Astro core + 90+ Green-Zone Guarantee across all tiers; price scales by architectural scope only
- TIER_01: Konverzní Základ — 18 000 Kč (single-page funnel)
- TIER_02: Komerční Architektura — 32 000 Kč / 22 000 Kč Founding Partner (−10k, 5 slots, case study + testimonial ≤14d)
- TIER_03: Vlajkový Systém & Dominance — od 55 000 Kč
- Post-launch: Option A 0 Kč/měs. (client hosting) · Option B 500 Kč/měs. (edge hosting & ops)
- BleedCalculator routes: X < 150k → TIER_01 (+gold upsell to FP Tier 02); 150–500k → TIER_02; X > 500k → TIER_03

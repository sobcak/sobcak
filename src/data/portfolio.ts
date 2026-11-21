/**
 * Modular commercial-proof portfolio. Add client entries here;
 * ProofSection renders the array as themed PageSpeed cards.
 *
 * PageSpeed scores are lab results from pagespeed.web.dev
 * (Lighthouse), captured per strategy — keep mobile + desktop in sync.
 */
export type PortfolioScores = {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
};

export type PortfolioVitals = {
  /** Largest Contentful Paint display (cs decimal comma). */
  lcp: string;
  fcp: string;
  cls: string;
  tbt: string;
  si: string;
};

export type PortfolioPsiStrategy = {
  scores: PortfolioScores;
  vitals: PortfolioVitals;
};

export type PortfolioEntry = {
  id: string;
  domain: string;
  url: string;
  previewWebp: string;
  previewJpg: string;
  previewAlt: string;
  /** Two sentences: niche, then architecture. */
  summary: [string, string];
  /** Lab PSI — mobile + desktop (pagespeed.web.dev). */
  psi: {
    measuredAt: string;
    source: string;
    mobile: PortfolioPsiStrategy;
    desktop: PortfolioPsiStrategy;
  };
  architecture: string;
};

export const portfolio: PortfolioEntry[] = [
  {
    id: 'design-home',
    domain: 'design-home.cz',
    url: 'https://design-home.cz',
    previewWebp: '/portfolio/design-home.webp',
    previewJpg: '/portfolio/design-home.jpg',
    previewAlt:
      'Náhled webu design-home.cz — umělecké čalounictví Michaela Sobčáková',
    summary: [
      'Umělecké čalounictví a\u00A0luxusní potahové látky pro klienty z\u00A0Berounska a\u00A0okolí – galerie, značky a\u00A0přímá poptávka na\u00A0jedné komerční stavbě.',
      'Statické HTML na\u00A0edge bez databáze a\u00A0pluginů: živý lab report PageSpeed (mobil + desktop), nulová plocha k\u00A0útoku přes SQL.',
    ],
    // Captured 2026-11-21 via pagespeed.web.dev (Lighthouse 13.6.0, lab)
    psi: {
      measuredAt: '2026-11-21',
      source: 'pagespeed.web.dev · lab',
      mobile: {
        scores: {
          performance: 76,
          accessibility: 91,
          bestPractices: 96,
          seo: 100,
        },
        vitals: {
          fcp: '1,7\u00A0s',
          lcp: '3,5\u00A0s',
          tbt: '0\u00A0ms',
          cls: '0,254',
          si: '4,0\u00A0s',
        },
      },
      desktop: {
        scores: {
          performance: 80,
          accessibility: 91,
          bestPractices: 96,
          seo: 100,
        },
        vitals: {
          fcp: '0,4\u00A0s',
          lcp: '2,3\u00A0s',
          tbt: '0\u00A0ms',
          cls: '0,124',
          si: '2,1\u00A0s',
        },
      },
    },
    architecture: 'statické HTML',
  },
];

export const scoreLabels = [
  { key: 'performance', label: 'Rychlost' },
  { key: 'accessibility', label: 'Přístupnost' },
  { key: 'bestPractices', label: 'Provozní kvalita' },
  { key: 'seo', label: 'Vyhledávače' },
] as const satisfies ReadonlyArray<{
  key: keyof PortfolioScores;
  label: string;
}>;

export function pagespeedUrl(siteUrl: string): string {
  return `https://pagespeed.web.dev/analysis?url=${encodeURIComponent(siteUrl)}`;
}

export function ringPath(score: number, r = 36): string {
  const c = 2 * Math.PI * r;
  const filled = (score / 100) * c;
  return `${filled} ${c}`;
}

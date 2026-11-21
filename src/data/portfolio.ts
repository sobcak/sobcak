/**
 * Modular commercial-proof portfolio. Add client entries here;
 * ProofSection renders the array as themed PageSpeed cards.
 */
export type PortfolioScores = {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
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
  scores: PortfolioScores;
  loadTime: string;
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
      'Statické HTML na\u00A0edge bez databáze a\u00A0pluginů: PageSpeed 100/100, načtení kolem 0,8\u00A0s a\u00A0nulová plocha k\u00A0útoku přes SQL.',
    ],
    scores: {
      performance: 100,
      accessibility: 100,
      bestPractices: 100,
      seo: 100,
    },
    loadTime: '0,8\u00A0s',
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

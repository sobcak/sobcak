/** Monitor Session channel bus — keeps Alex, hero CTAs, and sections in sync. */

export type ChannelId =
  | 'top'
  | 'dukaz'
  | 'diagnostic'
  | 'cenik'
  | 'proces'
  | 'kontakt';

export interface ChannelEnterDetail {
  id: ChannelId;
}

declare global {
  interface Window {
    __SESSION_CHANNEL__?: ChannelId;
  }
}

const ENTER_KEY = 'channel:enter';

const HASH_TO_CHANNEL: Record<string, ChannelId> = {
  '#top': 'top',
  '#dukaz': 'dukaz',
  '#diagnostic': 'diagnostic',
  '#cenik': 'cenik',
  '#proces': 'proces',
  '#kontakt': 'kontakt',
};

export const channelFromHash = (hash: string): ChannelId | null =>
  HASH_TO_CHANNEL[hash] ?? null;

export const channelFromHref = (href: string): ChannelId | null => {
  try {
    const url = new URL(href, window.location.origin);
    return channelFromHash(url.hash);
  } catch {
    return channelFromHash(href.startsWith('#') ? href : `#${href}`);
  }
};

export const dispatchChannelEnter = (id: ChannelId): void => {
  if (window.__SESSION_CHANNEL__ === id) return;
  window.__SESSION_CHANNEL__ = id;
  document.documentElement.dataset.channel = id;
  window.dispatchEvent(
    new CustomEvent<ChannelEnterDetail>(ENTER_KEY, { detail: { id } }),
  );
};

export const subscribeChannelEnter = (
  callback: (detail: ChannelEnterDetail) => void,
): (() => void) => {
  if (window.__SESSION_CHANNEL__) {
    callback({ id: window.__SESSION_CHANNEL__ });
  }
  const handler = ((e: CustomEvent<ChannelEnterDetail>) =>
    callback(e.detail)) as EventListener;
  window.addEventListener(ENTER_KEY, handler);
  return () => window.removeEventListener(ENTER_KEY, handler);
};

/** Smooth-scroll to a channel target; falls back to hash assignment. */
export const switchChannel = (
  id: ChannelId,
  opts: { behavior?: ScrollBehavior } = {},
): void => {
  const el = document.getElementById(id);
  dispatchChannelEnter(id);
  if (!el) {
    window.location.hash = id;
    return;
  }
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({
    behavior: reduced ? 'auto' : (opts.behavior ?? 'smooth'),
    block: 'start',
  });
  history.replaceState(null, '', `#${id}`);
};

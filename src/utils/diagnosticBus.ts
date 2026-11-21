export interface DiagnosticPayload {
  annualBleed: number;
  recommendedTier: 'TIER_01' | 'TIER_02' | 'TIER_03';
  bottleneckP: number;
  monthlyVisitors: number;
  aov: number;
}

export type DiagnosticView = 'quiz' | 'results' | 'form';

export interface OpenFormDetail {
  tier?: DiagnosticPayload['recommendedTier'] | null;
  /** When true, keep existing diagnostic banner values if present. */
  preserveDiagnostic?: boolean;
}

declare global {
  interface Window {
    __DIAGNOSTIC_STATE__?: DiagnosticPayload;
  }
}

const UPDATE_KEY = 'diagnostic:update';
const OPEN_FORM_KEY = 'diagnostic:open-form';
const OPEN_QUIZ_KEY = 'diagnostic:open-quiz';

export const dispatchDiagnostic = (payload: DiagnosticPayload): void => {
  window.__DIAGNOSTIC_STATE__ = payload;
  window.dispatchEvent(
    new CustomEvent<DiagnosticPayload>(UPDATE_KEY, { detail: payload }),
  );
};

export const subscribeDiagnostic = (
  callback: (payload: DiagnosticPayload) => void,
): void => {
  if (window.__DIAGNOSTIC_STATE__) callback(window.__DIAGNOSTIC_STATE__);
  window.addEventListener(UPDATE_KEY, ((e: CustomEvent<DiagnosticPayload>) =>
    callback(e.detail)) as EventListener);
};

/** Scroll to #diagnostic and switch the unified container to the contact form. */
export const openContactForm = (detail: OpenFormDetail = {}): void => {
  window.dispatchEvent(
    new CustomEvent<OpenFormDetail>(OPEN_FORM_KEY, { detail }),
  );
};

export const subscribeOpenContactForm = (
  callback: (detail: OpenFormDetail) => void,
): void => {
  window.addEventListener(OPEN_FORM_KEY, ((e: CustomEvent<OpenFormDetail>) =>
    callback(e.detail ?? {})) as EventListener);
};

/** Scroll to #diagnostic and return to the quiz / results flow. */
export const openDiagnosticQuiz = (): void => {
  window.dispatchEvent(new CustomEvent(OPEN_QUIZ_KEY));
};

export const subscribeOpenDiagnosticQuiz = (callback: () => void): void => {
  window.addEventListener(OPEN_QUIZ_KEY, () => callback());
};

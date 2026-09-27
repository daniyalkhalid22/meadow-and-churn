import { useCallback, useEffect, useMemo, useState } from 'react';
import english from '@/locales/en.json';
import urdu from '@/locales/ur.json';

export const supportedLocales = ['en', 'ur'] as const;
export type SupportedLocale = (typeof supportedLocales)[number];
export const defaultLocale: SupportedLocale = 'en';
type LocaleMessages = typeof english;
const localeCache: Record<SupportedLocale, LocaleMessages> = { en: english, ur: urdu as LocaleMessages };
const STORAGE_KEY = 'meadow-churn-locale';
const storedLocale = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
let activeLocale: SupportedLocale = storedLocale === 'ur' || storedLocale === 'en' ? storedLocale : defaultLocale;
let switchSequence = 0;

function getValue(source: unknown, key: string): string | undefined {
  const value = key.split('.').reduce<unknown>((current, part) => (
    current && typeof current === 'object' ? (current as Record<string, unknown>)[part] : undefined
  ), source);
  return typeof value === 'string' ? value : undefined;
}

export function translate(key: string, locale: SupportedLocale = activeLocale): string {
  return getValue(localeCache[locale], key) ?? getValue(localeCache.en, key) ?? key;
}

function applyTranslations(locale: SupportedLocale) {
  const root = document.documentElement;
  root.lang = locale;
  root.dir = locale === 'ur' ? 'rtl' : 'ltr';
  document.title = translate('meta.title', locale);
  const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (description) description.content = translate('meta.description', locale);

  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((element) => {
    const value = translate(element.dataset.i18n ?? '', locale);
    if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement) {
      if (!element.value || element.dataset.i18nMode === 'value') element.value = value;
    } else {
      element.textContent = value;
    }
  });
  document.querySelectorAll<HTMLElement>('[data-i18n-attr]').forEach((element) => {
    element.dataset.i18nAttr?.split('|').forEach((pair) => {
      const [attribute, key] = pair.split(':');
      if (attribute && key) element.setAttribute(attribute, translate(key, locale));
    });
  });
  document.querySelectorAll<HTMLOptionElement>('[data-i18n]').forEach((option) => {
    option.textContent = translate(option.dataset.i18n ?? '', locale);
  });
}

export function getInitialLocale(): SupportedLocale {
  if (typeof window === 'undefined') return defaultLocale;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === 'ur' || stored === 'en' ? stored : defaultLocale;
}

export function useLocalization() {
  const [locale, setLocale] = useState<SupportedLocale>(getInitialLocale);
  const [ready, setReady] = useState(false);
  const messages = useMemo(() => localeCache[locale], [locale]);

  useEffect(() => {
    activeLocale = locale;
    applyTranslations(locale);
    window.localStorage.setItem(STORAGE_KEY, locale);
    setReady(true);
  }, [locale]);

  const t = useCallback((key: string, vars?: Record<string, string>) => {
    let value = translate(key, locale);
    Object.entries(vars ?? {}).forEach(([name, replacement]) => {
      value = value.replaceAll(`{${name}}`, replacement);
    });
    return value;
  }, [locale]);

  const switchLocale = useCallback((nextLocale: SupportedLocale) => {
    if (nextLocale === activeLocale) return;
    const sequence = ++switchSequence;
    const scrollY = window.scrollY;
    activeLocale = nextLocale;
    window.requestAnimationFrame(() => {
      if (sequence !== switchSequence) return;
      setLocale(nextLocale);
      window.requestAnimationFrame(() => window.scrollTo({ top: scrollY, behavior: 'auto' }));
    });
  }, []);

  return { locale, t, switchLocale, ready, messages };
}
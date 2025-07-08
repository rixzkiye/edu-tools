import { getLocale } from 'astro:i18n';

export type Locale = 'id' | 'en' | 'zh';

export const locales: Locale[] = ['id', 'en', 'zh'];
export const defaultLocale: Locale = 'id';

export const localeNames = {
  id: 'Bahasa Indonesia',
  en: 'English',
  zh: '中文'
};

export const localeFlags = {
  id: '🇮🇩',
  en: '🇺🇸',
  zh: '🇨🇳'
};

// Import translation files
import idTranslations from './id.json';
import enTranslations from './en.json';
import zhTranslations from './zh.json';

const translations = {
  id: idTranslations,
  en: enTranslations,
  zh: zhTranslations
};

export function getTranslations(locale: Locale = defaultLocale) {
  return translations[locale] || translations[defaultLocale];
}

export function t(key: string, locale: Locale = defaultLocale): string {
  const translation = getTranslations(locale);
  const keys = key.split('.');
  
  let result: any = translation;
  for (const k of keys) {
    result = result?.[k];
  }
  
  return result || key;
}

export function getLocalizedPath(path: string, locale: Locale): string {
  if (locale === defaultLocale) {
    return path;
  }
  return `/${locale}${path === '/' ? '' : path}`;
}

export function getAlternateLinks(currentPath: string) {
  return locales.map(locale => ({
    hreflang: locale,
    href: getLocalizedPath(currentPath, locale)
  }));
}

export function getCurrentLocale(): Locale {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname;
    const locale = path.split('/')[1] as Locale;
    return locales.includes(locale) ? locale : defaultLocale;
  }
  return defaultLocale;
}

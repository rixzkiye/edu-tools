import { getCurrentLocale, type Locale } from '../i18n/utils';

export function initializeI18n() {
  // Set up language switching functionality
  setupLanguageSwitching();
  
  // Update page direction for RTL languages if needed
  updatePageDirection();
  
  // Initialize any dynamic content translation
  translateDynamicContent();
}

function setupLanguageSwitching() {
  const languageLinks = document.querySelectorAll('a[href*="/en/"], a[href*="/zh/"], a[href^="/"][href$="/"]');
  
  languageLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Play click sound
      if (typeof window !== 'undefined' && window.playSound) {
        window.playSound('click');
      }
      
      // Show loading state
      if (typeof window !== 'undefined' && window.showInfo) {
        window.showInfo('Switching language...', { duration: 1000 });
      }
    });
  });
}

function updatePageDirection() {
  const currentLocale = getCurrentLocale();
  const html = document.documentElement;
  
  // Add RTL support for Arabic or Hebrew if needed in the future
  // For now, all supported languages (ID, EN, ZH) are LTR
  html.setAttribute('dir', 'ltr');
}

function translateDynamicContent() {
  // Handle any dynamic content that needs translation
  const dynamicElements = document.querySelectorAll('[data-i18n]');
  
  dynamicElements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (key) {
      // This would require importing translation data on client side
      // For now, we'll handle this server-side in Astro components
      console.log(`Dynamic translation needed for key: ${key}`);
    }
  });
}

// Utility function to format numbers based on locale
export function formatNumber(number: number, locale: Locale = getCurrentLocale()): string {
  const localeMap = {
    id: 'id-ID',
    en: 'en-US',
    zh: 'zh-CN'
  };
  
  return new Intl.NumberFormat(localeMap[locale]).format(number);
}

// Utility function to format dates based on locale
export function formatDate(date: Date, locale: Locale = getCurrentLocale()): string {
  const localeMap = {
    id: 'id-ID',
    en: 'en-US',
    zh: 'zh-CN'
  };
  
  return new Intl.DateTimeFormat(localeMap[locale], {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

// Utility function to format relative time
export function formatRelativeTime(date: Date, locale: Locale = getCurrentLocale()): string {
  const localeMap = {
    id: 'id-ID',
    en: 'en-US',
    zh: 'zh-CN'
  };
  
  const rtf = new Intl.RelativeTimeFormat(localeMap[locale], { numeric: 'auto' });
  const now = new Date();
  const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000);
  
  if (Math.abs(diffInSeconds) < 60) {
    return rtf.format(diffInSeconds, 'second');
  } else if (Math.abs(diffInSeconds) < 3600) {
    return rtf.format(Math.floor(diffInSeconds / 60), 'minute');
  } else if (Math.abs(diffInSeconds) < 86400) {
    return rtf.format(Math.floor(diffInSeconds / 3600), 'hour');
  } else {
    return rtf.format(Math.floor(diffInSeconds / 86400), 'day');
  }
}

// Export for global use
declare global {
  interface Window {
    formatNumber: typeof formatNumber;
    formatDate: typeof formatDate;
    formatRelativeTime: typeof formatRelativeTime;
  }
}

if (typeof window !== 'undefined') {
  window.formatNumber = formatNumber;
  window.formatDate = formatDate;
  window.formatRelativeTime = formatRelativeTime;
}

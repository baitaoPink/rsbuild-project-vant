// src/i18n/index.js
import { createI18n } from 'vue-i18n';

const loadMessages = async (locale: string) => {
  try {
    const messages = await import(`./locales/${locale}.json`);
    return messages.default || {}; // Ensure fallback for missing message data
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    return {}; // Return an empty object in case of an error
  }
};

const messages = {
  en: await loadMessages('en'),
  zh: await loadMessages('zh'),
  // Add other default locales if needed
};

const i18n = createI18n({
  legacy: false, // Use Composition API (optional, depends on your setup)
  locale: 'en', // Default language
  fallbackLocale: 'en', // Fallback language in case translation is missing
  messages, // Preloaded messages
});

export default i18n;

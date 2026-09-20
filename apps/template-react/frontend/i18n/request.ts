import { getRequestConfig } from 'next-intl/server';

import { routing } from './routing';
import en from './messages/en.json';
import ru from './messages/ru.json';

const messagesMap = {
  en,
  ru,
} as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const typedRequested = requested as 'en' | 'ru' | null;
  const locale =
    typedRequested && routing.locales.includes(typedRequested)
      ? typedRequested
      : routing.defaultLocale;

  return {
    locale,
    messages: messagesMap[locale],
    timeZone: 'UTC',
  };
});

'use client';

import { useCallback } from 'react';
import { useLocale } from 'next-intl';

import { useUpdateUser } from '@/hooks';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useGetCurrentUserUsersMeGet } from '@/src/gen/hooks';

const SUPPORTED_LOCALES = ['ru', 'en'] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export function useLanguageService() {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { data: user } = useGetCurrentUserUsersMeGet({
    query: { staleTime: 5 * 60 * 1000 },
  });
  const { mutateAsync: updateUser } = useUpdateUser();

  const changeLanguage = useCallback(
    async (locale: SupportedLocale) => {
      if (!SUPPORTED_LOCALES.includes(locale)) {
        console.error(`Unsupported locale: ${locale}`);
        return;
      }

      // 1. Сначала меняем URL (это важнее — пользователь сразу видит результат)
      router.replace(pathname, { locale });

      // 2. Потом синхронизируем с бэкендом (не блокирует UI)
      if (user && user.user_type !== 'GUEST') {
        try {
          await updateUser({ data: { language_code: locale } });
        } catch (e) {
          console.error('Failed to sync language to backend:', e);
        }
      }
    },
    [user, updateUser, pathname, router]
  );

  return {
    currentLocale: currentLocale as SupportedLocale,
    supportedLocales: SUPPORTED_LOCALES,
    changeLanguage,
    isSupported: (locale: string): locale is SupportedLocale =>
      SUPPORTED_LOCALES.includes(locale as SupportedLocale),
  };
}

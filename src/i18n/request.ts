import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import { routing } from './routing';

export default getRequestConfig(async () => {
  // Read locale from cookie
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE')?.value;

  // Validate locale
  let locale: string = routing.defaultLocale;
  if (localeCookie && routing.locales.includes(localeCookie as 'en' | 'es')) {
    locale = localeCookie;
  }

  return {
    locale,
    messages: (await import(`../locales/${locale}/messages.json`)).default,
  };
});

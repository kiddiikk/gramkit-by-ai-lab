import {
  Home,
  SlidersHorizontal,
  CircleHelp,
  Settings,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type AccessLevel = 'public' | 'guest' | 'auth' | 'admin' | 'owner';

export interface NavItem {
  id: string;
  href: string;
  icon: LucideIcon;
  labelKey: string;
  access: AccessLevel;
  showInMobile?: boolean;
  showInDesktop?: boolean;
  lockedForGuests?: boolean;
}

/**
 * Основная навигация приложения
 * Единый источник правды для нижнего (mobile) и верхнего (desktop) меню
 */
export const navItems: NavItem[] = [
  {
    id: 'home',
    href: '/',
    icon: Home,
    labelKey: 'nav.home',
    access: 'public',
    showInMobile: true,
    showInDesktop: true,
  },
  {
    id: 'settings',
    href: '/settings',
    icon: SlidersHorizontal,
    labelKey: 'nav.settings',
    access: 'public',
    showInMobile: true,
    showInDesktop: true,
  },
  {
    id: 'about',
    href: '/about',
    icon: CircleHelp,
    labelKey: 'nav.about',
    access: 'public',
    showInMobile: true,
    showInDesktop: true,
  },
  {
    id: 'admin',
    href: '/admin',
    icon: Settings,
    labelKey: 'nav.admin',
    access: 'admin',
    showInMobile: false,
    showInDesktop: true,
  },
];

/**
 * Auth CTA (Get Started) — убран.
 * Оставлено для совместимости с AppNav.tsx, но всегда пустой.
 */
export const authCtaItem: NavItem = {
  id: 'getStarted',
  href: '/',
  icon: Home,
  labelKey: 'nav.getStarted',
  access: 'owner', // никогда не показывается (нет owner-гостей)
  showInMobile: false,
  showInDesktop: false,
};

export function filterNavItems(
  items: NavItem[],
  options: {
    isAuthenticated: boolean;
    isAdmin?: boolean;
    isOwner?: boolean;
    mobileOnly?: boolean;
    desktopOnly?: boolean;
  }
): NavItem[] {
  const { isAuthenticated, isAdmin = false, isOwner = false, mobileOnly, desktopOnly } = options;

  return items.filter((item) => {
    const hasAccess = (() => {
      switch (item.access) {
        case 'public':
          return true;
        case 'guest':
          return !isAuthenticated;
        case 'auth':
          return isAuthenticated;
        case 'admin':
          return isAdmin || isOwner;
        case 'owner':
          return isOwner;
        default:
          return false;
      }
    })();

    if (!hasAccess) return false;
    if (mobileOnly && !item.showInMobile) return false;
    if (desktopOnly && !item.showInDesktop) return false;

    return true;
  });
}

export function getVisibleNavItems(options: {
  isAuthenticated: boolean;
  isAdmin?: boolean;
  isOwner?: boolean;
}): {
  mainNav: NavItem[];
  mobileNav: NavItem[];
  showLoginCta: boolean;
} {
  const { isAuthenticated, isAdmin, isOwner } = options;

  const mainNav = filterNavItems(navItems, {
    isAuthenticated,
    isAdmin,
    isOwner,
    desktopOnly: true,
  });

  const mobileNav = filterNavItems(navItems, {
    isAuthenticated,
    isAdmin,
    isOwner,
    mobileOnly: true,
  });

  // Кнопка Get Started отключена
  const showLoginCta = false;

  return { mainNav, mobileNav, showLoginCta };
}

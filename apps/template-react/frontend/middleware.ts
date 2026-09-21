export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Extract locale and path from URL
  const localeMatch = /^\/([a-z]{2})(\/.*)?$/.exec(pathname);
  const locale = localeMatch?.[1] ?? routing.defaultLocale;
  const pathWithoutLocale = localeMatch?.[2] ?? pathname;

  // Apply i18n middleware (handles redirects to /ru/ or /en/ automatically)
  const intlResponse = intlMiddleware(request);

  // Check if request is authenticated
  const initData = request.headers.get('initData');
  const hasTmaAuth = !!initData && initData.length > 0;

  const appName = process.env.APP_NAME ?? 'app';
  const sessionCookie = request.cookies.get(`${appName}_session`)?.value;
  const hasSessionAuth = !!sessionCookie;

  const isAuthenticated = hasTmaAuth || hasSessionAuth;

  // Route classification
  const publicRoutes = ['/', '/demo'];
  const guestOnlyRoutes = ['/login', '/marketing'];
  const authRequiredRoutes = ['/profile', '/admin', '/test-gen'];

  const isPublicRoute = publicRoutes.some(
    (route) => pathWithoutLocale === route || (route !== '/' && pathWithoutLocale.startsWith(route + '/'))
  );
  const isGuestOnlyRoute = guestOnlyRoutes.some(
    (route) => pathWithoutLocale === route || pathWithoutLocale.startsWith(route + '/')
  );
  const isAuthRequiredRoute = authRequiredRoutes.some(
    (route) => pathWithoutLocale === route || pathWithoutLocale.startsWith(route + '/')
  );

  if (isPublicRoute) return intlResponse;
  if (isGuestOnlyRoute && isAuthenticated) {
    return createRedirect(request, `/${locale}`);
  }
  if (isAuthRequiredRoute && !isAuthenticated) {
    return createRedirect(request, `/${locale}/login`);
  }

  return intlResponse;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};

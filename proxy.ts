import { NextRequest, NextResponse } from 'next/server'

/**
 * Während des Wartungsmodus leiten wir jede unbekannte URL zurück auf `/`.
 * Statische Routen (Impressum, Datenschutz, robots, Assets) werden über
 * den Matcher unten ausgenommen und laufen normal durch.
 *
 * Wir nutzen 302 (Temporary Redirect) — Suchmaschinen verstehen das als
 * vorübergehende Maßnahme; die ursprünglichen URLs bleiben crawlbar
 * sobald die echte Site live geht.
 */
export const config = {
  matcher: [
    /*
     * Match all paths EXCEPT:
     * - _next/static (static files)
     * - _next/image  (image optimization files)
     * - favicon, icon, opengraph-image, robots, sitemap
     * - impressum, datenschutz (legal pages stay reachable)
     * - assets, fonts (public files)
     * - paths with a file extension (e.g. .svg, .png, .ico)
     */
    '/((?!_next/static|_next/image|favicon|icon|apple-icon|opengraph-image|robots|sitemap|impressum|datenschutz|assets|fonts|.*\\.[a-zA-Z0-9]+$).*)',
  ],
}

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Root selbst durchlassen
  if (pathname === '/' || pathname === '') {
    return NextResponse.next()
  }

  // Alles andere → temporär auf Root
  const url = req.nextUrl.clone()
  url.pathname = '/'
  url.search = ''
  return NextResponse.redirect(url, 302)
}

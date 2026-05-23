import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    // Übergangsseite ist crawlbar. Beim v2-Launch wird der Inhalt von Google
    // beim nächsten Crawl automatisch durch die echte Site ersetzt — das ist
    // SEO-freundlicher als die Seite zwischenzeitlich aus dem Index zu nehmen.
    rules: [{ userAgent: '*', allow: '/' }],
  }
}

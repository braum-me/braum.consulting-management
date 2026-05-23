import type { Metadata } from 'next'
import Link from 'next/link'
import { content } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description: 'Datenschutzerklärung von Braum Consulting nach DSGVO.',
  robots: { index: true, follow: true },
}

export default function DatenschutzPage() {
  return (
    <article style={page}>
      <p style={eyebrow}>Rechtliches · Stand: 22. Mai 2026</p>
      <h1 style={h1}>Datenschutzerklärung</h1>

      <h2 style={h2}>Hinweis zur Übergangsseite</h2>
      <p>
        Diese Seite ist eine vorübergehende Wartungs- und Übergangsseite. Sie
        verarbeitet bewusst nur das technische Minimum: keine Cookies, keine
        Formulare, keine Drittanbieter-Skripte abseits einer optionalen,
        cookielosen Reichweitenmessung (siehe unten).
      </p>

      <h2 style={h2}>Verantwortlicher</h2>
      <p>
        {content.legal.name}
        <br />
        {content.legal.street}
        <br />
        {content.legal.city}
        <br />
        {content.legal.country}
      </p>
      <p>
        E-Mail:{' '}
        <a href={`mailto:${content.legal.email}`} style={link}>
          {content.legal.email}
        </a>
      </p>

      <h2 style={h2}>Verarbeitete Daten</h2>
      <ul style={ul}>
        <li>
          <strong style={strong}>Server-Logfiles</strong> (IP-Adresse,
          User-Agent, Referrer, Datum/Uhrzeit) — max. 30 Tage zu
          Sicherheitszwecken, danach Löschung oder Anonymisierung.
          Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
        </li>
        <li>
          <strong style={strong}>Optional: cookielose Reichweitenmessung</strong>{' '}
          mit self-hosted Umami (siehe Abschnitt unten).
        </li>
      </ul>

      <h2 style={h2}>Cookies</h2>
      <p>
        Diese Übergangsseite setzt <strong style={strong}>keine Cookies</strong>.
        Es werden auch keine Tracking-Pixel oder Werbe-IDs geladen.
      </p>

      <h2 style={h2}>Hosting</h2>
      <p>
        Diese Website wird auf einem Server in Deutschland gehostet.
        Übertragung erfolgt verschlüsselt via HTTPS/TLS.
      </p>

      <h2 style={h2}>Webanalyse · Umami (self-hosted, optional)</h2>
      <p>
        Sofern aktiviert, nutzt diese Seite{' '}
        <a
          href="https://umami.is"
          target="_blank"
          rel="noopener noreferrer"
          style={link}
        >
          Umami
        </a>{' '}
        für eine datensparsame, cookielose Reichweitenmessung. Die Umami-Instanz
        läuft auf einer von uns selbst betriebenen Subdomain auf einem Server in
        Deutschland — es findet kein Datentransfer an externe
        Analytics-Dienstleister statt.
      </p>
      <p>
        Erfasst werden ausschließlich aggregierte Werte (Seitenaufrufe,
        Referrer-Domain, Browser-Familie, Land auf Länderebene,
        Bildschirmauflösung). Zur Wiedererkennung wiederkehrender Browser
        innerhalb eines Tages erzeugt Umami einen Hash aus IP-Adresse,
        User-Agent und Domain mit einem täglich rotierenden Salt — die rohe
        IP-Adresse wird nicht gespeichert. Nach Ablauf des Tages ist der
        Hash nicht mehr auf die ursprüngliche IP zurückführbar.
      </p>
      <p>
        Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an
        datensparsamer Reichweitenmessung). Eine Einwilligung ist nicht
        erforderlich, da keine personenbezogenen Daten gespeichert werden.
      </p>

      <h2 style={h2}>Schriftarten</h2>
      <p>
        Alle Schriftarten (Akmorn Grotesque, Instrument Serif, Geist Sans,
        Geist Mono) werden <strong style={strong}>self-hosted</strong>{' '}
        ausgeliefert — keine Verbindung zu Google Fonts oder Adobe Fonts.
      </p>

      <h2 style={h2}>Rechte der betroffenen Personen</h2>
      <p>
        Nach DSGVO stehen dir Auskunfts-, Berichtigungs-, Lösch- und
        Einschränkungsrechte zu (Art. 15-18 DSGVO), Datenübertragbarkeit
        (Art. 20 DSGVO) sowie ein Widerspruchsrecht (Art. 21 DSGVO).
        Du kannst dich jederzeit per E-Mail melden:{' '}
        <a href={`mailto:${content.legal.email}`} style={link}>
          {content.legal.email}
        </a>
        .
      </p>

      <h2 style={h2}>Zuständige Aufsichtsbehörde</h2>
      <p>
        Der Hessische Beauftragte für Datenschutz und Informationsfreiheit
        (HBDI)
        <br />
        Postfach 31 63, 65021 Wiesbaden
        <br />
        E-Mail:{' '}
        <a href="mailto:poststelle@datenschutz.hessen.de" style={link}>
          poststelle@datenschutz.hessen.de
        </a>
      </p>

      <p style={{ marginTop: '64px' }}>
        <Link href="/" style={link}>
          ← Zur Startseite
        </Link>
      </p>
    </article>
  )
}

const page: React.CSSProperties = {
  maxWidth: '720px',
  margin: '0 auto',
  padding: 'clamp(80px, 12vh, 140px) 24px clamp(80px, 12vh, 140px)',
  fontFamily: 'var(--font-body)',
  fontSize: '15px',
  lineHeight: 1.75,
  color: 'var(--fg-default)',
}

const eyebrow: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '11px',
  letterSpacing: '0.20em',
  textTransform: 'uppercase',
  color: 'var(--brand)',
  marginBottom: '24px',
}

const h1: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontWeight: 700,
  fontSize: 'clamp(40px, 5.6vw, 64px)',
  letterSpacing: '-0.035em',
  lineHeight: 1.02,
  margin: 0,
  marginBottom: '48px',
  color: 'var(--fg-default)',
}

const h2: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontWeight: 600,
  fontSize: 'clamp(20px, 2.2vw, 26px)',
  letterSpacing: '-0.022em',
  color: 'var(--fg-default)',
  marginTop: '40px',
  marginBottom: '12px',
  lineHeight: 1.2,
}

const link: React.CSSProperties = {
  color: 'var(--brand)',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
}

const ul: React.CSSProperties = {
  listStyle: 'disc',
  paddingLeft: '20px',
  marginTop: '12px',
  marginBottom: '12px',
}

const strong: React.CSSProperties = {
  color: 'var(--fg-default)',
  fontWeight: 600,
}

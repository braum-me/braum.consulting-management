import type { Metadata } from 'next'
import Link from 'next/link'
import { content } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum von Braum Consulting · Stefan Braum, Sinntal.',
  robots: { index: true, follow: true },
}

export default function ImpressumPage() {
  return (
    <article style={page}>
      <p style={eyebrow}>Rechtliches</p>
      <h1 style={h1}>Impressum</h1>

      <h2 style={h2}>Diensteanbieter</h2>
      <p>
        {content.legal.name}
        <br />
        {content.legal.street}
        <br />
        {content.legal.city}
        <br />
        {content.legal.country}
      </p>
      <p>Steuer-ID: {content.legal.taxId}</p>
      <p>Umsatzsteuerbefreit als Kleinunternehmer nach § 19 UStG.</p>

      <h2 style={h2}>Kontakt</h2>
      <p>
        E-Mail:{' '}
        <a href={`mailto:${content.legal.email}`} style={link}>
          {content.legal.email}
        </a>
        <br />
        LinkedIn:{' '}
        <a
          href={content.legal.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          style={link}
        >
          linkedin.com/in/stefanbraum
        </a>
      </p>

      <h2 style={h2}>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>Stefan Braum (Anschrift wie oben).</p>

      <h2 style={h2}>Online-Streitbeilegung (Art. 14 ODR-VO)</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur
        Online-Streitbeilegung (OS) bereit, erreichbar unter{' '}
        <a
          href="https://ec.europa.eu/consumers/odr/"
          target="_blank"
          rel="noopener noreferrer"
          style={link}
        >
          ec.europa.eu/consumers/odr
        </a>
        .
      </p>

      <h2 style={h2}>Verbraucherstreitbeilegung (§ 36 VSBG)</h2>
      <p>
        Wir sind weder bereit noch verpflichtet, an Streitbeilegungsverfahren
        vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <h2 style={h2}>Hinweis</h2>
      <p>
        Diese Übergangsseite ersetzt die reguläre Website nur vorübergehend.
        Bis dahin erreicht ihr mich am schnellsten auf LinkedIn.
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
  fontSize: '16px',
  lineHeight: 1.7,
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
  lineHeight: 1,
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

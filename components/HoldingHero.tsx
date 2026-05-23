import Image from 'next/image'
import Logo from './Logo'
import MonogramOutline from './MonogramOutline'
import { content } from '@/lib/content'

function PortraitMedia() {
  return (
    <>
      <div className="hero-portrait-glow" />
      <Image
        src="/assets/portrait/stefan-shirt.webp"
        alt="Stefan Braum"
        width={720}
        height={900}
        priority
        className="hero-portrait-img"
        sizes="(max-width: 767px) 60vw, (max-width: 1023px) 36vw, 480px"
      />
    </>
  )
}

export default function HoldingHero() {
  return (
    <main className="hero-stack">
      {/* GIANT Monogramm-Outline — Backdrop-Layer (z 1). */}
      <div aria-hidden className="hero-monogram-wrap">
        <MonogramOutline
          strokeWidth={0.8}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Desktop-Portrait — absolut positioniert, escaping container.
          Hidden auf Mobile/Tablet, dort kommt die inline-Variante. */}
      <div aria-hidden className="hero-portrait-wrap hero-portrait--floating">
        <PortraitMedia />
      </div>

      <div className="hero-content">
        <header className="hero-top hero-reveal" style={{ animationDelay: '120ms' }}>
          <Logo size={70} />
        </header>

        <div className="hero-main">
          <section className="hero-text">
            <p
              className="hero-reveal hero-eyebrow"
              style={{ animationDelay: '320ms' }}
            >
              {content.eyebrow}
            </p>

            <h1 className="hero-headline">
              <span className="hero-reveal" style={{ animationDelay: '440ms', display: 'block' }}>
                {content.headline.line1}
              </span>
              <span className="hero-reveal" style={{ animationDelay: '600ms', display: 'block' }}>
                {content.headline.line2Pre}
                <span className="italic-accent">{content.headline.italic}</span>
                {content.headline.line2Post}
              </span>
            </h1>

            <div
              className="hero-reveal hero-lede"
              style={{ animationDelay: '780ms' }}
            >
              {content.lede.map((line, i) => (
                <p key={i} style={{ margin: 0 }}>{line}</p>
              ))}
            </div>

            <a
              className="cta-primary hero-reveal hero-cta"
              href={content.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ animationDelay: '940ms' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M19 0H5C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" />
              </svg>
              {content.cta.label}
              <span aria-hidden style={{ fontSize: '18px', lineHeight: 1 }}>↗</span>
            </a>
          </section>

          {/* Mobile/Tablet-Portrait — inline im Grid, hidden auf Desktop. */}
          <div
            className="hero-portrait-wrap hero-portrait--inline hero-reveal"
            style={{ animationDelay: '500ms' }}
          >
            <PortraitMedia />
          </div>
        </div>

        <footer
          className="hero-reveal hero-footer"
          style={{ animationDelay: '1120ms' }}
        >
          <span>© 2026 Braum Consulting</span>
          <span aria-hidden style={{ opacity: 0.5 }}>·</span>
          <a href="/impressum">Impressum</a>
          <span aria-hidden style={{ opacity: 0.5 }}>·</span>
          <a href="/datenschutz">Datenschutz</a>
        </footer>
      </div>
    </main>
  )
}

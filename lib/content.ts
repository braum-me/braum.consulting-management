/**
 * Zwei-Modi-Setup:
 * - `coming-soon` (Default) — Übergangsseite während v2-Polish bis Sommer 2026.
 * - `maintenance`            — Kurzzeitiges Wartungsfenster („gleich zurück").
 *
 * Mode wird per ENV gesetzt: `NEXT_PUBLIC_PAGE_MODE=maintenance`.
 * Beide laufen aus demselben Build — nur Texte und Metadaten ändern sich.
 */

type Mode = 'coming-soon' | 'maintenance'

const MODE: Mode =
  (process.env.NEXT_PUBLIC_PAGE_MODE as Mode | undefined) ?? 'coming-soon'

const modes = {
  'coming-soon': {
    eyebrow: 'braum.consulting · Sommer 2026',
    headline: {
      line1:    'Hier entsteht',
      line2Pre: 'etwas, das ',
      italic:   'Ruhe braucht',
      line2Post:'.',
    },
    lede: [
      'Marke, M365, KI, Transformation —',
      'aus einer Hand, ohne Beraterdeutsch.',
      'Bis dahin: direkter Draht.',
    ],
    metaTitle: 'Braum Consulting · Bald wieder erreichbar',
    metaDesc:
      'Hier entsteht etwas, das Ruhe braucht. Marke, M365, KI, Transformation — aus einer Hand, ohne Beraterdeutsch. Bis Sommer 2026.',
  },
  'maintenance': {
    eyebrow: 'braum.consulting · Wartungsfenster',
    headline: {
      line1:    'Kurz weg.',
      line2Pre: '',
      italic:   'Gleich wieder da',
      line2Post:'.',
    },
    lede: [
      'Diese Seite holt einen Moment Luft.',
      'In ein paar Minuten bin ich wieder erreichbar.',
      'Wenn’s nicht warten kann: direkter Draht.',
    ],
    metaTitle: 'Braum Consulting · Kurz weg',
    metaDesc:
      'Wartungsfenster. In ein paar Minuten bin ich wieder erreichbar — bis dahin direkter Draht über LinkedIn.',
  },
} as const

const active = modes[MODE]

export const content = {
  mode: MODE,
  eyebrow:   active.eyebrow,
  headline:  active.headline,
  lede:      active.lede,
  metaTitle: active.metaTitle,
  metaDesc:  active.metaDesc,
  cta: {
    label: 'Auf LinkedIn schreiben',
    href:  'https://www.linkedin.com/in/stefanbraum/',
  },
  legal: {
    name:     'Stefan Braum — Braum Consulting',
    street:   'Schlüchterner Straße 31',
    city:     '36391 Sinntal',
    country:  'Deutschland',
    taxId:    '019 807 60940',
    email:    'info@braum.consulting',
    linkedin: 'https://www.linkedin.com/in/stefanbraum/',
  },
} as const

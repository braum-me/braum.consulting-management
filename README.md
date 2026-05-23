# braum.consulting · Übergangsseite

<p align="center">
  <img src="docs/hero.png" alt="braum.consulting Hero — &lsquo;Hier entsteht etwas, das Ruhe braucht.&rsquo;" width="100%">
</p>

Schmaler Single-Page-Bau, der `braum.consulting` überbrückt, bis das v2-Rewrite
fertig ist. Eine sorgfältig komponierte Page, alles andere wird per `302` auf
die Startseite gelenkt. Lebenszeit: bis Sommer 2026, dann wird der Container
gestoppt und die Domain wandert auf die echte Site.

---

## Stack

| Layer        | Wahl                                                       |
|--------------|------------------------------------------------------------|
| Framework    | **Next.js 16** (App Router, Turbopack, `output: standalone`) |
| Runtime      | React 19, TypeScript strict, Tailwind 4                    |
| 3D / GPU     | `@react-three/fiber` + `three` für die Shader-Plane        |
| Motion       | `motion/react` für den Reveal-Stagger                      |
| Typo         | Geist (npm) + Akmorn Grotesque + Instrument Serif (self-hosted) |
| Deploy       | Docker (multi-stage `node:22-alpine`) auf Coolify          |

---

## Warum diese Architektur?

Eine Übergangsseite würde in 80 % aller Fälle als statisches HTML
in einer S3-Bucket landen. Das ist hier bewusst nicht passiert — aus zwei
Gründen:

1. **Dieselbe Codebasis bedient zwei Use-Cases.** Eine *Coming-Soon*-Page
   (Wochen-/Monatslaufzeit, ruhiger Pitch) und ein *Maintenance*-Fenster
   (Minuten/Stunden während Deploys, „kurz weg") teilen Layout, Fonts,
   Shader, Brand. Was sich ändert: drei Strings und ein Meta-Tag.
   Ein zweites Repo wäre Karteileiche.
2. **Der ENV-Switch ist Production-Practice.** `NEXT_PUBLIC_PAGE_MODE`
   entscheidet zur Buildzeit, welche Inhalte aus `lib/content.ts` aktiv
   sind. Zwei Coolify-Services laufen aus demselben Image, nur die
   Domain wandert je nach Situation.

---

## Decision Log

Drei bewusste Trade-offs, die ich gewählt habe, kurz dokumentiert.

### 1. Turbopack-Daemon-Constraint akzeptiert

Next 16 bindet den Turbopack-Dev-Daemon an einen Project-Root, egal welcher
Port übergeben wird. Lokal lässt sich also nur **ein** Modus auf einmal
laufen. Das ist nervig im Dev, aber:

- In Production sind es zwei eigenständige Container — keine Kollision.
- Ein Workaround mit Multi-Root oder zwei Repos hätte mehr Maintenance
  gekostet als das einmalige `pkill -f next-server && pnpm dev:maint`.
- Dokumentiert, nicht versteckt.

### 2. `302` statt `301` für die Wartungs-Redirects

Alle unbekannten URLs werden in `proxy.ts` mit **`302` (Temporary)** auf
`/` umgeleitet — nicht `301`. Grund: Beim Cutover auf v2 sollen die
ursprünglichen URLs (`/leistungen`, `/kontakt`, …) wieder gecrawlt werden.
Ein `301` würde Suchmaschinen signalisieren, dass diese URLs *permanent*
auf `/` zeigen, und sie aus dem Index entfernen. `302` lässt die
ursprüngliche URL-Hierarchie für Google am Leben.

### 3. Wartungsseite bleibt indexierbar

Die naive Lösung wäre `noindex` Meta + `Disallow: /` in der `robots.txt`.
Bewusst nicht gemacht:

- Bei einer **kurzen** Übergangsphase (Wochen, nicht Monate) richten
  `noindex`/`disallow` mehr Schaden an als Nutzen — Google deindexiert die
  Domain, beim Cutover muss die neue Site wieder von vorne aufgebaut werden.
- Die Coming-Soon-Page ist ein bewusster Pitch, nicht peinlich. Wer in
  Google nach „braum consulting" sucht, sieht eine saubere Aussage und
  einen LinkedIn-Link. Das ist eher Asset als Liability.
- Beim v2-Launch ersetzt Google den Snippet beim nächsten Crawl
  automatisch — das ist sauberer als ein de-/re-Index-Zyklus.

`302` Redirects (siehe oben) sorgen parallel dafür, dass die alte
URL-Hierarchie crawlbar bleibt.

### 4. Self-hosted Fonts statt Google Fonts CDN

Akmorn Grotesque + Instrument Serif liegen als `woff2` im Repo
(`public/fonts/`) und werden via `next/font/local` eingebunden. Das kostet
~300 KB Repo-Größe — bringt aber:

- Keine Third-Party-DNS-Lookups beim First Paint.
- DSGVO-frei (keine IP wandert zu Google).
- Kein Fallback-Theater wenn Google Fonts zickt.

---

## Routing

`proxy.ts` (Next 16 löst `middleware.ts` ab) leitet alle URLs außer den
unten gelisteten mit `302` auf `/` um.

Ausgenommen:

- `/` — die Wartungsseite
- `/impressum`, `/datenschutz`
- `_next/*`, `robots`, `sitemap`, `favicon`, `icon`, `opengraph-image`
- alle Dateien mit Extension (`.svg`, `.png`, `.woff2`, …)

---

## Entwicklung

```bash
pnpm install
pnpm dev          # coming-soon Mode auf Port 3311
pnpm dev:maint    # maintenance Mode auf Port 3322
```

Modus-Wechsel lokal:

```bash
pkill -f "next-server" && pnpm dev:maint   # → Maintenance
pkill -f "next-server" && pnpm dev         # → Coming-Soon
```

## Build

```bash
pnpm build
pnpm start
```

---

## Environment

```env
# Umami (optional, self-hosted, cookieless — leer lassen, wenn nicht aktiv)
NEXT_PUBLIC_UMAMI_WEBSITE_ID=
NEXT_PUBLIC_UMAMI_SCRIPT_URL=

# Modus (default: coming-soon)
NEXT_PUBLIC_PAGE_MODE=
```

---

## Deployment (Coolify)

`Dockerfile` ist multi-stage auf `node:22-alpine`,
`next.config.ts` setzt `output: 'standalone'`.

**Zwei Services aus demselben Image:**

| Service        | ENV                                  | Container-Port |
|----------------|--------------------------------------|----------------|
| coming-soon    | _(keine)_ → Default                  | `3000`         |
| maintenance    | `NEXT_PUBLIC_PAGE_MODE=maintenance`  | `3000`         |

Beide Container laufen intern auf demselben Port — der Unterschied liegt
nur in einer einzigen ENV-Variable. Coolify reverse-proxiet die Domain
je nachdem auf den einen oder anderen Service: normal hängt sie am
coming-soon-Service, vor einem Deploy auf den maintenance-Service
umhängen, danach zurück. Beide bleiben dauerhaft up.

---

## Launch-Cutover

Wenn v2 ready ist:

1. v2 als eigenen Coolify-Service deployen.
2. Domain `braum.consulting` vom coming-soon-Service abziehen.
3. Domain auf v2 legen.
4. coming-soon-Service `stopped` — als Sicherheitsnetz behalten,
   nicht löschen.

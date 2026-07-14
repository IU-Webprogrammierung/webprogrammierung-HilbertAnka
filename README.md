# 🚀 Projekt: Web-Programmierung - Portfolio einer Theatermalerin

## 🌐 Live Demo: [Live Website ansehen](https://iu-webprogrammierung.github.io/webprogrammierung-HilbertAnka/)
---

## 🐝 Bewertungsrelevante Leistungen 

- **Mehrsprachigkeit (DE/EN)** durch JSON-basierte Internationalisierung und persistente Sprachwahl via `localStorage`
- **Dark Mode** mit CSS-Variablen für alle Farbwerte sowie persistenter Theme-Auswahl via `localStorage`
- **Wiederverwendbare UI-Komponenten** (Header & Footer) mit konsistenter Gestaltung
- **Navigation mit Dropdown-System** (inkl. Toggle-Button für Tablet-Ansicht) sowie mobiler Hamburger-Navigation mit JavaScript-Interaktion und State Handling
- **JavaScript Lightbox-System** mit Navigation (Keyboard Support, Next/Prev)
- **Interaktive UI-Elemente**: visuelles Feedback bei Hover (z. B. Farbänderung bei Buttons, Unterstrich in der Navigation, leichte Bewegung bei Bildern)
- **Smooth Scrolling** sowie **Back-to-top-Button** mit Sichtbarkeits-Logik beim Scrollen
- **Scroll-Animationen**: Scale-Effekt (Größenänderung abhängig von Scroll-Position) sowie Reveal-Animationen einzelner nav-elemente (index.html)
- **Weboptimierte Medien** durch WebP-Formate und eingebettetes YouTube-Video
- **Responsive Bildgrößen** via `srcset`/`sizes`: je Bild bis zu 3 Auflösungsstufen (400/800/1600px)
- **Formular mit HTML5-Validierung** (required & E-Mail-Typ)
- **individuelle 404-Seite**
- **Favicon**
- Nutzung von **git-branches** in der 3. Projektphase, sowie **Git-Tags** pro Projektphase
- **Tailwind CSS** probeweise auf `contact.html` angewendet (Branch: `tailwind-experiment`) – da viele Styles (z.B. `h1`, `p`) global definiert sind, wäre eine vollständige Umstellung aufwendiger, daher bleibt es beim Ausprobieren, der Branch wird nicht gemerged

---

## 🛠️ Technische Basis

- **HTML5** (semantische Tags)
- **CSS3** (Flexbox, CSS Grid, Media Queries)
- **Responsive Design** (Breakpoints: 768px und 1024px)
- **JavaScript** für Interaktivität und UI-Logik

---

## 📄 Seitenstruktur

- **Home**: Einführung, Galerie-Teaser, Video, Verlinkung zu weiteren Unterseiten
- **Gallery**: Fotos in Kacheln mit Links zu 6 weiteren Unterseiten (drei-, zwei- oder einspaltig)
- **Studio Insights**: Schritt-für-Schritt-Erklärung der Prospektherstellung
- **About Me**: CV, Foto
- **Contact**: Kontaktformular
- **Impressum & Datenschutz**: Informationen zur Verantwortlichkeit und Datenverarbeitung

---

## 📁 Projektstruktur

├── index.html
├── gallery.html
├── practicalworks.html, graduationproject.html, sleepingbeauty.html,
│   architecture.html, translucent.html, fauxfinishes.html, various.html
├── studioinsights.html
├── aboutme.html
├── contact.html
├── imprintpolicy.html
├── 404.html
├── styles.css
├── components/
│   ├── header.html
│   └── footer.html
├── js/
│   ├── i18n.js
│   ├── dark-mode.js
│   └── main.js
├── lang/
│   ├── de.json
│   └── en.json
├── images/
│   ├── large/
│   └── small/
├── fonts/
└── favicon.ico, favicon.svg, apple-touch-icon.png
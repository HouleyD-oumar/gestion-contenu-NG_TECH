# Design System — UI/UX, couleurs et composants

Ce document présente un squelette léger de design system pour le projet « gestion-contenu ». Il couvre les principes UI/UX, la palette de couleurs (tokens), la typographie, l'espacement, les règles d'accessibilité et le flux de composants (atoms → molecules → organisms).

- Simplicité : priorité à la lisibilité et à l'information pertinente.
- Cohérence : mêmes règles d'espacement, typographie et couleurs sur toutes les pages.
- Hiérarchie visuelle : utiliser contraste, taille et espacement pour guider l'œil.
- Accessibilité : viser WCAG AA (contraste >= 4.5:1 pour le texte normal). Tester les états focus/hover et supports clavier.
- Responsive-first : concevoir pour mobile puis adapter pour desktop.
## Principes UI/UX

- Simplicité : priorité à la lisibilité et à l'information pertinente.
- Cohérence : mêmes règles d'espacement, typographie et couleurs sur toutes les pages.
- Hiérarchie visuelle : utiliser contraste, taille et espacement pour guider l'œil.
- Accessibilité : viser WCAG AA (contraste >= 4.5:1 pour le texte normal). Tester les états focus/hover et supports clavier.
- Responsive-first : concevoir pour mobile puis adapter pour desktop.
- Simplicité : priorité à la lisibilité et à l'information pertinente.
- Cohérence : mêmes règles d'espacement, typographie et couleurs sur toutes les pages.
- Hiérarchie visuelle : utiliser contraste, taille et espacement pour guider l'œil.
- Accessibilité : viser WCAG AA (contraste >= 4.5:1 pour le texte normal). Tester les états focus/hover et supports clavier.
- Responsive-first : concevoir pour mobile puis adapter pour desktop.

### Palette de couleurs (tokens)

This document describes the core colors used across the project.

### Light (soft) palette

| Token | Purpose | Hex |
|---|---:|---:|
| --background | Page background | #F6F7FB |
| --foreground | Main text | #0F172A |
| --card | Surface backgrounds | #F3F4F6 |
| --primary | Primary action | #2B6BA6 |
| --secondary | Secondary action | #6D5FA8 |
| --success | Success states | #16834A |
| --warning | Warning states | #C57A18 |
| --danger | Error / destructive | #B93A3A |
| --info | Informational | #0EA5E9 |

### Dark (soft) palette

| Token | Purpose | Hex |
|---|---:|---:|
| --background | Page background | #0F172A |
| --foreground | Main text | #E6F0FA |
| --card | Surface backgrounds | #0B1220 |
| --primary | Primary action | #1E4E73 |
| --secondary | Secondary action | #56437A |
| --success | Success states | #0F5C37 |
| --warning | Warning states | #D68C2A |
| --danger | Error / destructive | #A43636 |
| --info | Informational | #38BDF8 |

## Design Pattern - UI

### Palette principale (light)

- Bleu Nuit (#0A1931) — utilisé pour navigation et en-têtes (dark backgrounds)
- Blanc (#FFFFFF) — arrière-plan principal
- Noir (#000000) — texte principal

### Actions (CTA)

- Primaire (#185ADB) — actions principales
- Succès (#4CAF50) — validations
- Attention (#FFA500) — modifications
- Danger (#DC3545) — suppressions

### Palette recommandée (tokens)

Light (surface & tokens)

- --background: #F6F7FB
- --card: #FFFFFF
- --foreground: #0B1220
- --muted: #6B7280
- --border: #E6E9EF
- --primary: #185ADB
- --secondary: #6D5FA8
- --success: #16A34A
- --warning: #FFA500
- --danger: #DC3545
- --info: #0EA5E9

Dark (équivalents)

- --background: #07122a
- --card: #0B1220
- --foreground: #E6F0FA
- --muted: #9AA6B2
- --border: #182333
- --primary: #2E7BE3
- --secondary: #5B4B86
- --success: #2EA457
- --warning: #FFB84D
- --danger: #E35A5A
- --info: #60C8F8


## Configuration centralisée (design-system)

Le design system est centré sur :

- `src/app/globals.css` : source unique des tokens (CSS variables).
- `tailwind.config.mjs` : mappe les tokens vers les couleurs Tailwind et génère les utilitaires `ng-`.

Principe : garder les tokens dans `globals.css` (single source of truth) et utiliser les utilitaires générés (`ng-bg-primary`, `ng-text-primary`, etc.) dans les composants.

Exemples d'utilisation :

- Bouton primaire : `className="ng-bg-primary ng-text-primary-foreground"`
- Card : `className="ng-bg-card ng-text-card-foreground ng-rounded-md p-4"`

Si vous modifiez un token dans `globals.css`, les utilitaires Tailwind continueront d'utiliser cette valeur au runtime car ils pointent sur `var(--...)`.

Pour les contributeurs : modifiez d'abord `globals.css` (valeurs), puis exécutez `npm run dev`/`npm run build` — pas besoin de toucher `tailwind.config.mjs` sauf pour ajouter de nouveaux tokens ou plugins.


### Modales

- Fond : `--modal-background` (blanc en light, surface sombre en dark)
- En-tête : clair et séparé; espacement interne via `--modal-padding`
- Formulaires : champs espacés verticalement, labels clairs
- Actions : boutons différenciés par couleur (primaire, secondaire, danger)

### Messages / Toasts

- Position : coin supérieur droit
- Durée : 3 secondes (`--toast-duration: 3000ms`)
- Codes couleurs contextuels: succès / information / avertissement / erreur

### Accessibilité

- Vérifier contraste > 4.5:1 pour texte normal
- Boutons et éléments interactifs : focus visible (anneau) et cible tactile >= 44px


Recommandation de palette (exemple)

- Primary
  - primary-50: #EAF3FF
  - primary-100: #D6EAFF
  - primary-300: #99CCFF
  - primary-500: #0066FF
  - primary-700: #0052CC

- Secondary
  - secondary-50: #F0EEFF
  - secondary-300: #BFB7FF
  - secondary-500: #6C63FF
  - secondary-700: #4F46E5

- Neutral (scale)
  - neutral-50:  #F9FAFB
  - neutral-100: #F3F4F6
  - neutral-300: #D1D5DB
  - neutral-500: #6B7280
  - neutral-700: #374151
  - neutral-900: #0F172A

- Feedback
  - success-500: #16A34A
  - danger-500:  #DC2626
  - warning-500: #D97706

- Surfaces & foreground
  - background: #FFFFFF (light) / #0F172A (dark)
  - surface: #FAFAFB (light) / #111827 (dark)
  - foreground: #0F172A (light) / #FFFFFF (dark)

Action & semantic colors (mapping light/dark)

- Blue (action primary)
  - light: #0066FF
  - dark:  #0066FF (same hue works with white foreground)

- White / Black
  - white: #FFFFFF
  - black: #000000

- Actions
  - success: #16A34A (vert) — dark: same
  - warning: #D97706 (orange) — dark: #F59E0B
  - danger: #DC2626 (rouge) — dark: #FB7185
  - info: #0EA5E9 (cyan) — dark: #38BDF8

Conseils d'utilisation :

- Utiliser `primary-500` pour CTA, `primary-700` pour l'état hover/active, `primary-50/100` pour fonds ou accents légers.
- Utiliser la palette neutral pour typographie, bordures et surfaces.
- Pour l'accessibilité, toujours vérifier contraste (WCAG AA) entre fond et texte et entre états (hover/disabled).

### Accessibilité & contraste

- Toujours viser WCAG AA (contraste >= 4.5:1 pour texte normal). Pour les petites tailles, viser 7:1 si possible.
- Vérifier contrastes pour états : hover, focus, disabled et active.
- Pour CTA :
  - normal : primary-500 text on surface (ou white text on primary-500 si contraste OK)
  - hover : primary-700
  - disabled : utiliser une nuance plus claire ou réduire l'opacité mais garder contraste lisible

Outils : utiliser des checkers (axe, Lighthouse, Contrast Checker) dans le workflow CI si possible.

### Typographie

- Font-families : Inter (préférée), fallback system-ui.
- Utiliser variables CSS pour polices si besoin (définir `--font-sans` dans `globals.css`).
- Échelle (exemple accessible) :
  - h1: 32px / 2rem
  - h2: 24px / 1.5rem
  - h3: 20px / 1.25rem
  - body / p: 16px / 1rem
  - small: 14px / 0.875rem

### Espacement

- Échelle d'espacement (8px base) :
  - xs: 4px
  - sm: 8px
  - md: 16px
  - lg: 24px
  - xl: 32px

Ces valeurs sont exposées comme utilitaires Tailwind (ex: `ng-p-md`, `ng-gap-lg`) ou via les spacing utilities mappées au config.

### Border radius & ombres

- radius-sm: 4px
- radius-md: 8px
- radius-lg: 12px
- ombre légère pour cartes : 0 1px 3px rgba(2,6,23,0.08)

Exposer via utilitaires : `ng-rounded-md`, `ng-shadow-sm`.

### Composants & flow (Atomic Design)

- Atomes : boutons, champs input, labels, icônes.
- Molecules : groupes d'inputs, cartes de preview, listes d'actions.
- Organisms : header, footer, tableaux complexes, panneaux de gestion.

Règles de nommage :

- Exporter des composants simples dans `src/components/ui/`.
- Garder les composants comme des wrappers légers — privilégier l'usage de classes utilitaires (`ng-...`).
- Utiliser `variant`, `size`, `disabled` comme props mais laisser la plupart du styling aux classes utilitaires.

### Exemples d'usage utility-first

Préférence : utiliser les utilitaires préfixés `ng-` (ex: `ng-bg-primary`, `ng-text-foreground`, `ng-rounded-md`) qui s'appuient sur les variables CSS.

Bouton primaire :

```html
<button class="ng-bg-primary ng-text-primary-foreground px-4 py-2 ng-rounded-md ng-shadow-sm hover:ng-bg-primary-700 focus:ng-ring-md">Sauvegarder</button>
```

Card :

```html
<div class="ng-bg-card ng-text-card-foreground ng-rounded-md p-4 ng-shadow-md">
  <h3 class="text-lg font-semibold">Titre</h3>
  <p class="text-sm ng-text-muted-foreground">Description</p>
</div>
```

Input :

```html
<input class="w-full px-3 py-2 ng-rounded-md border ng-border ng-bg-input ng-text-foreground ng-ring-sm" />
```

### Processus de contribution

- Toute nouvelle couleur ou composant doit être ajoutée au design-system, avec une justification d'accessibilité (contraste) et un exemple visuel.

---

Document concis pour démarrer. On peut l'enrichir avec des illustrations, des exemples visuels (Figma) et des tokens supplémentaires (gradients, motion, etc.).


### Intégration Tailwind & shadcn

- Le projet utilise Tailwind CSS : privilégier les classes utilitaires (préfixe `ng-`) pour construire les composants.
- Les variables CSS sont définies dans `src/app/globals.css` et mappées dans `tailwind.config.mjs` pour exposer des utilitaires (ex: `ng-bg-primary`).
- shadcn/ui peut être utilisé pour accélérer le développement, mais adaptez les classes pour utiliser les tokens via utilitaires.

Exemple : bouton primaire (utilitaires)

```tsx
<button className="ng-bg-primary ng-text-primary-foreground px-4 py-2 ng-rounded-md">Sauvegarder</button>
```

---


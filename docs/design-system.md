## Design System — UI/UX, couleurs et composants

Ce document présente un squelette léger de design system pour le projet « gestion-contenu ». Il couvre les principes UI/UX, la palette de couleurs (tokens), la typographie, l'espacement, les règles d'accessibilité et le flux de composants (atoms → molecules → organisms).

### Principes UI/UX

- Simplicité : priorité à la lisibilité et à l'information pertinente.
- Cohérence : mêmes règles d'espacement, typographie et couleurs sur toutes les pages.
- Hiérarchie visuelle : utiliser contraste, taille et espacement pour guider l'œil.
- Accessibilité : viser WCAG AA (contraste >= 4.5:1 pour le texte normal). Tester les états focus/hover et supports clavier.
- Responsive-first : concevoir pour mobile puis adapter pour desktop.

### Palette de couleurs (tokens)

Les tokens ci-dessous sont pensés pour être importés depuis `src/components/ui/colors.ts`.

- primary: #0066FF (utilisé pour actions principales)
- primary-600: #0052CC
- secondary: #6C63FF (accent)
- success: #16A34A
- danger: #DC2626
- warning: #D97706
- neutral-900: #0F172A (texte sombre)
- neutral-700: #374151
- neutral-500: #6B7280
- neutral-300: #D1D5DB
- neutral-100: #F3F4F6
- background: #FFFFFF
- surface: #FAFAFB

Conseils d'utilisation:

- `primary` = action principale (CTA). Prévoir `primary-600` pour hover/active.
- `secondary` = actions secondaires ou accents décoratifs.
- Utiliser `neutral-900` pour texte principal, `neutral-700` pour sous-texte.
- Fond des surfaces (cards/modals) : `surface` ou `neutral-100` selon la profondeur.

### Accessibilité & contraste

- Tester le contraste entre fond et texte. Par exemple, `primary` (#0066FF) sur texte blanc n'atteint pas toujours 4.5:1 pour petits textes — préférer du texte en gras ou des tailles supérieures, ou ajouter un outline.
- Pour les boutons CTA, s'assurer que l'état disabled réduit la luminosité mais conserve un contraste suffisant.

### Typographie

- Font-families : système ou variable (ex: Inter, system-ui).
- Échelle des tailles (exemple)
  - h1: 32px
  - h2: 24px
  - h3: 20px
  - body / p: 16px
  - small: 14px

### Espacement

- Échelle d'espacement (8px base)
  - xs: 4px
  - sm: 8px
  - md: 16px
  - lg: 24px
  - xl: 32px

### Border radius & ombres

- radius-sm: 4px
- radius-md: 8px
- radius-lg: 12px
- ombre légère pour cartes : 0 1px 3px rgba(2,6,23,0.08)

### Composants & flow (Atomic Design)

- Atomes : boutons, champs input, labels, icônes.
- Molecules : groupes d'inputs, cartes de preview, listes d'actions.
- Organisms : header, footer, tableaux complexes, panneaux de gestion.

Règles de nommage :

- Exporter des composants simples dans `src/components/ui/`.
- Utiliser des props `variant`, `size`, `disabled` pour standardiser les variantes.

### Exemples d'usage

Importer les tokens couleur :

```ts
import { colors } from 'src/components/ui/colors';

// utilisation inline
const style = { backgroundColor: colors.primary, color: '#fff' };
```

### Processus de contribution

- Toute nouvelle couleur ou composant doit être ajoutée au design-system, avec une justification d'accessibilité (contraste) et un exemple visuel.

---

Document concis pour démarrer. On peut l'enrichir avec des illustrations, des exemples visuels (Figma) et des tokens supplémentaires (gradients, motion, etc.).

### Intégration Tailwind & shadcn

- Le projet utilise Tailwind CSS : privilégier les classes utilitaires pour construire les composants.
- Utiliser les variables CSS définies dans `src/app/globals.css` (par ex. `--primary`, `--primary-foreground`) dans les classes Tailwind via la syntaxe `bg-[var(--primary)]` pour garantir la cohérence thème clair/sombre.
- shadcn/ui fournit des composants accessibles et prêts à l'emploi. On peut s'en inspirer ou importer certains composants (Dialog, Tooltip, Input) et les adapter aux tokens du projet.
- Règle pratique : créer un composant wrapper dans `src/components/ui/` qui applique les classes communes (taille, radius, focus) et expose des props `variant`, `size`.

Exemple : bouton primaire utilisant Tailwind et variables :

```tsx
<button className="bg-[var(--primary)] text-[var(--primary-foreground)] px-4 py-2 rounded-md">
  Sauvegarder
</button>
```

---


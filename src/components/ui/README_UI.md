UI Utility Guide
=================


But: utiliser exclusivement des classes utilitaires Tailwind mappées aux tokens du design system.

Principes

- Utiliser les variables CSS définies dans `src/app/globals.css` (ex: `--primary`, `--background`).
- Préférer les classes utilitaires Tailwind exposées par `tailwind.config.mjs` (ex: `ng-bg-primary`, `ng-text-foreground`, `ng-rounded-md`).
- Éviter le CSS inline ou les composants qui cachent trop de styles — garder les composants comme des wrappers légers.

Exemples rapides

Bouton primaire:

```html
<button class="ng-bg-primary ng-text-primary-foreground px-4 py-2 ng-rounded-md shadow-sm hover:brightness-90 ng-ring-md">Sauvegarder</button>
```

Card simple:

```html
<div class="ng-bg-card ng-text-card-foreground ng-rounded-md p-4 shadow-md">
  <h3 class="text-lg font-semibold">Titre</h3>
  <p class="text-sm ng-text-muted-foreground">Description</p>
</div>
```

Input standard:

```html
<input class="w-full px-3 py-2 ng-rounded-md border ng-border ng-bg-input ng-text-foreground ng-ring-sm" />
```

Basculer le thème

- Ajouter la classe `.dark` à la racine (`<html class="dark">`) pour activer le thème sombre.

Note: Tailwind est configuré avec `prefix: 'ng-'`, donc toutes les classes utilitaires portent le préfixe `ng-` (ex: `ng-bg-primary`).

Conseils

- Pour des variantes complexes, composez les classes dans `clsx` plutôt que d'écrire un CSS séparé.
- Si un ensemble de classes est réutilisé, créez une petite fonction utilitaire (ex: `cn(...)`) ou un tiny wrapper React qui accepte `className` et renvoie `className` + classes par défaut.

Run dev server

 - Lancer le serveurs de dev (lance Tailwind en watch et Next) :

```powershell
npm run dev
```

Si le port 3000 est pris, Next proposera un port alternatif ou vous pouvez forcer `PORT=3001 npm run dev` selon l'environnement.

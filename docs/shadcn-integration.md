
# Utiliser shadcn/ui dans ce projet — guide concis

But : permettre au développeur de se concentrer sur l'intégration et la personnalisation via `className`. Le pattern attendu : utiliser les composants shadcn comme primitives visuelles et appliquer vos utilitaires `ng-` (qui pointent sur les tokens CSS dans `src/app/globals.css`) via la prop `className`.

Principes rapides

- Ne pas forker massivement les composants shadcn : préférez l'utilisation directe et la personnalisation via `className`.
- Garder `src/app/globals.css` comme source unique des tokens (couleurs, spacing, radius).
- Utiliser les utilitaires préfixés `ng-` (ex: `ng-bg-primary`, `ng-text-foreground`, `ng-rounded-md`) pour appliquer les styles du design-system.

Exemple simple


1. Installer shadcn (si nécessaire) :

```powershell
npx shadcn@latest add
```


1. Utiliser un composant shadcn et personnaliser via `className` :

```tsx
import { Button } from "@/components/ui/button"; // composant shadcn généré

export default function Demo() {
  return (
    <Button className="ng-bg-primary ng-text-white ng-rounded-md px-4 py-2 hover:ng-bg-primary-700">
      Sauvegarder
    </Button>
  );
}
```

Pattern recommandé pour les composants

- Base/variants/size + `className` : la plupart des composants shadcn acceptent `className`. Utilisez cette prop pour appliquer les utilitaires `ng-` et modifier l'apparence.

- Ne pas écrire de styles inline CSS qui contredisent les tokens — préférez les utilitaires (clairs, testables et réutilisables).

Gestion des overrides

- Si vous devez changer un style par défaut du composant shadcn (ex: un padding interne), préférez :
  - passer une classe utilitaire pour écraser le comportement (`className="p-6"`) ; ou
  - étendre le composant via un petit wrapper local si le changement est fréquent.

Exemple de wrapper léger

```tsx
import { Button as ShadButton } from "@/components/ui/button";
import clsx from "clsx";

export function Button({ className, ...props }: any) {
  // Concatène la classe par défaut du design system avec l'override
  return (
    <ShadButton className={clsx("ng-rounded-md ng-shadow-sm", className)} {...props} />
  );
}
```

Bonnes pratiques

- Préférez `className` pour toute personnalisation visuelle.
- Mettez à jour `src/app/globals.css` pour changer définitivement un token (couleur, spacing, radius). Après modification, relancez `npm run dev` si vous souhaitez voir les changements en local.
- Evitez les duplications de logique de style — centralisez dans `globals.css` ou dans de petites classes utilitaires si besoin.

Points à savoir

- shadcn fournit des primitives accessibles et bien pensées, mais :
  - elles utilisent Tailwind classes — adaptez-les en ajoutant vos `ng-` utilities via `className`.
  - si vous souhaitez un contrôle strict, créez de petits wrappers qui injectent les classes `ng-` par défaut.

Conclusion (objectif du guide)

- L'idée est simple : le dev intègre shadcn rapidement et personnalise via `className` en utilisant les utilitaires `ng-` liés aux tokens du design-system. Cela permet d'accélérer le développement sans dupliquer ou forker l'ensemble des composants.

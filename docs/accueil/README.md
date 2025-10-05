# Accueil

Cas d'usage : page d'accueil qui affiche une liste de contenus.

Flux :
- Le composant `ContentList` (client) utilise `useAppDispatch` et `fetchContents`.
- Les filtres (tags / category) sont stockés dans `state.content.filters` via `setFilters`.
- Le slice `content` gère le chargement et la pagination.

Test : ouvrez `/test` et cliquez sur "Fetch contents".

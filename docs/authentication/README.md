# Authentication

Cas d'usage : connexion des utilisateurs et gestion des rôles.

Flux :
- `authSlice` expose le thunk `login` et l'action `logout`.
- L'état `state.auth.user` contient le rôle (`admin|editor|viewer`).
- Le middleware `middleware.ts` protège les routes admin côté serveur via un cookie `token` (exemple).

Test : depuis `/test`, cliquez sur "Login as admin" ou "Login as user" puis observez `state.auth`.

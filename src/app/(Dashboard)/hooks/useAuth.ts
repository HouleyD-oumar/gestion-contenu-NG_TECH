import { useState } from 'react';

export const useAuth = () => {
  // TODO: Remplacer par logique réelle
  const [user] = useState({ id: 1, name: 'Utilisateur', role: 'admin' });
  return user;
};
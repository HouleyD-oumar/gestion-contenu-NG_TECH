import { ReactNode } from 'react';

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  // TODO: Vérifier le rôle de l'utilisateur et rediriger si non autorisé
  return <>{children}</>;
};

export default ProtectedRoute;
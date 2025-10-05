"use client";

import { useAppSelector, useAppDispatch } from "../../store/hooks";
import type { RootState } from "../../store/store";
import { setTestUser, logout } from "../../store/slices/authSlice";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User, LogOut, Shield } from "lucide-react";
import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";

export default function Header() {
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state: RootState) => state.auth);

  const getInitials = (user: { firstName: string; lastName: string }) => {
    return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  };

  const getDashboardUrl = () => {
    if (!user) return "/signin";
    return user.role === "admin" ? "/Dashboard" : "/Dashboard/Gestion";
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  // Fonctions de simulation de connexion pour les tests
  const simulateLogin = (role: "admin" | "editor" | "viewer") => {
    const testUsers = {
      admin: {
        id: "1",
        firstName: "Admin",
        lastName: "User",
        password: "hashed_admin_password",
        email: "admin@example.com",
        role: "admin" as const,
      },
      editor: {
        id: "2",
        firstName: "Editor",
        lastName: "User",
        password: "hashed_editor_password",
        email: "editor@example.com",
        role: "editor" as const,
      },
      viewer: {
        id: "3",
        firstName: "Viewer",
        lastName: "User",
        password: "hashed_viewer_password",
        email: "viewer@example.com",
        role: "viewer" as const,
      },
    };

    dispatch(setTestUser({
      user: testUsers[role],
      token: role === "admin" ? "admintoken" : "usertoken",
    }));
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo/Nom du projet */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Shield className="h-4 w-4" />
            </div>
            <span className="text-xl font-bold">Gestion-Contenu</span>
          </Link>
        </div>

        {/* Navigation centrale - Bouton Publier pour admin/editor */}
        <div className="flex items-center space-x-4">
          {user && (user.role === "admin" || user.role === "editor") && (
            <Button className="bg-primary hover:bg-primary/90">
              Publier
            </Button>
          )}
        </div>

        {/* Contrôles droite - Theme switcher + Menu utilisateur */}
        <div className="flex items-center space-x-2">
          <ThemeSwitcher />
          {user && token ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt={`${user.firstName} ${user.lastName}`} />
                    <AvatarFallback>{getInitials(user)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.firstName} {user.lastName}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                {(user.role === "admin" || user.role === "editor") && (
                  <DropdownMenuItem asChild>
                    <Link href={getDashboardUrl()} className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Tableau de bord</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Déconnexion</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              {/* Boutons de simulation de connexion pour les tests */}
              <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
                <span className="text-xs">Test:</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => simulateLogin("admin")}
                  className="text-xs"
                >
                  Admin
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => simulateLogin("editor")}
                  className="text-xs"
                >
                  Editor
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => simulateLogin("viewer")}
                  className="text-xs"
                >
                  Viewer
                </Button>
              </div>
              <Button variant="ghost" asChild>
                <Link href="/signin">Connexion</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Inscription</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

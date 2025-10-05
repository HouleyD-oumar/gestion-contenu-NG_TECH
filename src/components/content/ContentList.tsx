"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { RootState } from "../../store/store";
import { fetchContents, setPagination } from "../../store/slices/contentSlice";
import type { Content } from "../../types";
import ContentCard from "./ContentCard";
import ContentCardSkeleton from "./ContentCardSkeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { AlertCircle, RefreshCw, Lock, Plus, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function ContentList() {
  const dispatch = useAppDispatch();
  const { items, loading, filters, pagination, error } = useAppSelector(
    (state: RootState) => state.content
  );
  const { user } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(
      fetchContents({
        page: pagination.page,
        perPage: pagination.perPage,
        tags: filters.tags,
        category: filters.category,
      })
    );
  }, [dispatch, filters, pagination.page, pagination.perPage]);

  const handleRetry = () => {
    dispatch(
      fetchContents({
        page: pagination.page,
        perPage: pagination.perPage,
        tags: filters.tags,
        category: filters.category,
      })
    );
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= Math.ceil(pagination.total / pagination.perPage)) {
      dispatch(setPagination({ page: newPage }));
      dispatch(
        fetchContents({
          page: newPage,
          perPage: pagination.perPage,
          tags: filters.tags,
          category: filters.category,
        })
      );
    }
  };

  const handlePerPageChange = (newPerPage: number) => {
    dispatch(setPagination({ perPage: newPerPage, page: 1 })); // Reset to page 1 when changing per page
    dispatch(
      fetchContents({
        page: 1,
        perPage: newPerPage,
        tags: filters.tags,
        category: filters.category,
      })
    );
  };

  // Fonction de simulation d'ajout d'article
  const handleQuickAdd = () => {
    alert("Fonctionnalité d'ajout d'article - Simulation\n\nCette action ouvrirait normalement un formulaire de création d'article.");
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border border-destructive/20 bg-destructive/5 p-8 text-center">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <div className="space-y-2">
          <h3 className="font-semibold text-destructive">Erreur de chargement</h3>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
        <Button onClick={handleRetry} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Réessayer
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Message pour les utilisateurs non connectés */}
      {!user && !loading && (
        <div className="bg-muted/30 border border-muted rounded-lg p-6 text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <Lock className="h-5 w-5" />
            <span className="font-medium">Contenu protégé</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Connectez-vous pour accéder à tous les articles publiés et profiter de fonctionnalités avancées.
          </p>
          <div className="flex items-center justify-center space-x-3">
            <Button asChild>
              <Link href="/signin">
                <Eye className="mr-2 h-4 w-4" />
                Se connecter
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/signup">
                Créer un compte
              </Link>
            </Button>
          </div>
        </div>
      )}

      {/* Action rapide pour admin/editor */}
      {user && (user.role === "admin" || user.role === "editor") && (
        <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
              <Plus className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Action rapide</h3>
              <p className="text-sm text-muted-foreground">
                Ajouter un nouvel article en quelques clics
              </p>
            </div>
          </div>
          <Button onClick={handleQuickAdd} className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un article
          </Button>
        </div>
      )}

      {/* Loading skeleton */}
      {loading && items.length === 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <ContentCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Content grid */}
      {items.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((content: Content) => (
            <ContentCard key={content.id} content={content} />
          ))}
        </div>
      )}

      {/* Pagination classique - Seulement pour utilisateurs connectés */}
      {user && items.length > 0 && pagination.total > pagination.perPage && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Informations de page et sélecteur d'éléments par page - Desktop */}
          <div className="hidden sm:flex items-center gap-4 text-sm text-muted-foreground">
            <span>
              Page {pagination.page} sur {Math.ceil(pagination.total / pagination.perPage)}
              ({pagination.total} résultats au total)
            </span>

            {/* Sélecteur d'éléments par page */}
            <div className="flex items-center gap-2">
              <span className="text-xs">Afficher :</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="w-16">
                    {pagination.perPage}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-20">
                  {[8, 12, 16, 24].map((perPage) => (
                    <DropdownMenuItem
                      key={perPage}
                      onClick={() => handlePerPageChange(perPage)}
                      disabled={loading}
                      className="justify-center"
                    >
                      {perPage}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <span className="text-xs">par page</span>
            </div>
          </div>

          {/* Informations de page - Mobile */}
          <div className="sm:hidden text-sm text-muted-foreground text-center">
            Page {pagination.page} / {Math.ceil(pagination.total / pagination.perPage)}
            ({pagination.total} résultats)
          </div>

          {/* Contrôles de navigation */}
          <div className="flex items-center gap-2">
            {/* Bouton précédent */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page <= 1 || loading}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Précédent</span>
            </Button>

            {/* Sélecteur de page pour mobile */}
            <div className="sm:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="w-16">
                    {pagination.page}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-20">
                  {Array.from({
                    length: Math.min(10, Math.ceil(pagination.total / pagination.perPage))
                  }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <DropdownMenuItem
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        disabled={loading}
                        className="justify-center"
                      >
                        {pageNum}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Numéros de page - Desktop seulement */}
            <div className="hidden sm:flex items-center gap-1">
              {Array.from({
                length: Math.min(5, Math.ceil(pagination.total / pagination.perPage))
              }, (_, i) => {
                const pageNum = Math.max(1, pagination.page - 2) + i;
                if (pageNum > Math.ceil(pagination.total / pagination.perPage)) return null;

                return (
                  <Button
                    key={pageNum}
                    variant={pageNum === pagination.page ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(pageNum)}
                    disabled={loading}
                    className="w-10"
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>

            {/* Bouton suivant */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page >= Math.ceil(pagination.total / pagination.perPage) || loading}
              className="flex items-center gap-1"
            >
              <span className="hidden sm:inline">Suivant</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!loading && items.length === 0 && !error && user && (
        <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border border-dashed p-12 text-center">
          <div className="space-y-2">
            <h3 className="font-semibold">Aucun contenu trouvé</h3>
            <p className="text-sm text-muted-foreground">
              Aucun contenu ne correspond à vos critères de recherche.
            </p>
          </div>
          <Button onClick={handleRetry} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Actualiser
          </Button>
        </div>
      )}

      {/* Empty state pour utilisateurs non connectés */}
      {!loading && items.length === 0 && !error && !user && (
        <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border border-dashed p-12 text-center">
          <div className="space-y-2">
            <h3 className="font-semibold">Contenu disponible après connexion</h3>
            <p className="text-sm text-muted-foreground">
              Connectez-vous pour découvrir tous nos articles et ressources.
            </p>
          </div>
          <Button asChild>
            <Link href="/signin">
              <Eye className="mr-2 h-4 w-4" />
              Se connecter
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}

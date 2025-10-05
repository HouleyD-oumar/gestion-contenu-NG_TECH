
import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "../components/layout/Header";
import Filters from "../components/layout/Filters";
import ContentList from "../components/content/ContentList";
import Footer from "../components/layout/Footer";
import PageSkeleton from "../components/PageSkeleton";

export const metadata: Metadata = {
  title: "Accueil - Gestion-Contenu",
  description: "Découvrez une variété d'articles et de ressources sélectionnés pour vous. Utilisez nos filtres avancés pour trouver exactement ce que vous cherchez.",
  keywords: "contenu, articles, ressources, gestion, filtre",
};

export default function Home() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <div className="space-y-8">
              {/* Section titre et description */}
              <div className="text-center space-y-4 animate-in fade-in-0 slide-in-from-top-4 duration-700">
                <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Découvrez nos contenus
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Explorez une variété d&apos;articles et de ressources sélectionnés pour vous.
                  Utilisez les filtres pour trouver exactement ce que vous cherchez.
                </p>
              </div>

              {/* Filtres */}
              <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-200">
                <Filters />
              </div>

              {/* Liste des contenus */}
              <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-300">
                <ContentList />
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </Suspense>
  );
}

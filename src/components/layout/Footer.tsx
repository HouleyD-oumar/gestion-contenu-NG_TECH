import { Separator } from "../ui/separator";
import { Github, Twitter, Linkedin, Code, Smartphone, Database, Users } from "lucide-react";

export default function Footer() {
  const teamMembers = {
    frontend: [
      "Amadou Diallo",
      "Fatoumata Camara",
      "Mamadou Bah",
      "Aïssata Touré"
    ],
    backend: [
      "Ibrahim Sylla",
      "Mariama Sow",
      "Abdoulaye Barry",
      "Kadiatou Diallo"
    ],
    mobile: [
      "Ousmane Koulibaly",
      "Hawa Keita",
      "Sékou Traoré",
      "Bintou Konaté"
    ]
  };

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Logo et description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <span className="text-sm font-bold">GC</span>
              </div>
              <span className="text-lg font-bold">Gestion-Contenu</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Plateforme moderne de gestion de contenu avec filtrage avancé et interface intuitive.
              Découvrez, gérez et partagez vos contenus efficacement.
            </p>
          </div>

          {/* Équipe Frontend */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Code className="h-4 w-4 text-blue-500" />
              <h4 className="text-sm font-semibold">Frontend</h4>
            </div>
            <div className="space-y-2">
              {teamMembers.frontend.map((member, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Users className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{member}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Équipe Backend */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Database className="h-4 w-4 text-green-500" />
              <h4 className="text-sm font-semibold">Backend</h4>
            </div>
            <div className="space-y-2">
              {teamMembers.backend.map((member, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Users className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{member}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Équipe Mobile */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Smartphone className="h-4 w-4 text-purple-500" />
              <h4 className="text-sm font-semibold">Mobile</h4>
            </div>
            <div className="space-y-2">
              {teamMembers.mobile.map((member, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Users className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{member}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Copyright - Simplifié */}
        <div className="text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Gestion-Contenu. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Schéma de validation Zod ---
const formSchema = z
  .object({
    nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
    email: z.string().email("Adresse e-mail invalide"),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  })

export function CardDemo() {
  // Initialisation du formulaire ---
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  })

 // Juste après la déclaration du schéma :
type FormData = z.infer<typeof formSchema>

// Puis dans ta fonction onSubmit :
const onSubmit = (data: FormData) => {
  console.log("✅ Données valides :", data)
  alert("Inscription réussie !")
}


  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-center">Inscription</CardTitle>
        <CardDescription>
          Créez un compte pour commencer votre aventure avec nous.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="nom">Nom</Label>
            <Input id="nom" type="text" {...register("nom")} />
            {errors.nom && <p className="text-red-500 text-sm">{errors.nom.message}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="prenom">Prénom</Label>
            <Input id="prenom" type="text" {...register("prenom")} />
            {errors.prenom && <p className="text-red-500 text-sm">{errors.prenom.message}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirmation mot de passe</Label>
            <Input id="confirmPassword" type="password" {...register("confirmPassword")} />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            S`inscrire
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col items-center gap-2">
        <CardDescription>
          Vous avez déjà un compte ?
          <Button variant="link" className="px-2">
            Se connecter
          </Button>
        </CardDescription>
      </CardFooter>
    </Card>
  )
}

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <CardDemo />
    </div>
  )
}

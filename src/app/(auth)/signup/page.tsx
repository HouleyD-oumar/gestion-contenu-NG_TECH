"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
// import { z } from "zod"

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

import { inscriptionSchema, InscriptionValidation } from "@/utils/validation"
import Link from "next/link"

export function CardDemo() {
 
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<InscriptionValidation>({
    resolver: zodResolver(inscriptionSchema),
    mode: "onChange", 
  })

 
  const onSubmit = (data: InscriptionValidation) => {
    console.log("Données valides :", data)
    alert("Inscription réussie !")
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-center text-2xl uppercase font-bold ">Inscription</CardTitle>
        
        <CardDescription className="text-center mt-3">
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
            <Label htmlFor="confirmPassword">Confirmation du mot de passe</Label>
            <Input id="confirmPassword" type="password" {...register("confirmPassword")} />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!isValid} 
          >
            S`inscrire
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col items-center gap-2">
        <CardDescription>
          Vous avez déjà un compte ?
          <Button asChild variant="link" className="px-2">
            <Link href="/signin">Se connecter</Link>
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

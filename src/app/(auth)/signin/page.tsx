"use client"

import React, { useState } from "react"
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

import {
  connexionSchema,
  validateConnexionField,
  ConnexionValidation,
} from "@/utils/validation"
import Link from "next/link"

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <CardDemo />
    </div>
  )
}

export function CardDemo() {
  const [emailHelperText, setEmailHelperText] = useState<string>("")
  const [passwordHelperText, setPasswordHelperText] = useState<string>("")

  const [formData, setFormData] = useState<ConnexionValidation>({
    email: "",
    password: "",
  })

  // Validation globale du formulaire
  const isFormValid = () => {
    const result = connexionSchema.safeParse(formData)
    return result.success
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof ConnexionValidation
  ) {
    const newValue = e.target.value
    const updatedData = { ...formData, [field]: newValue }

    setFormData(updatedData)


    const errorMessage = validateConnexionField(field, newValue)
    if (field === "email") {
      setEmailHelperText(errorMessage || "")
    } else {
      setPasswordHelperText(errorMessage || "")
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const validation = connexionSchema.safeParse(formData)
    if (!validation.success) {
      alert("Veuillez corriger les erreurs du formulaire.")
      return
    }

    console.log(" Données valides :", formData)
    alert("Connexion réussie !")
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-center h1  text-xl uppercase font-bold ">Connexion</CardTitle>
        <CardDescription className="text-center mt-3">
          Entrez vos identifiants pour accéder à votre compte.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            {/* --- Email --- */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={formData.email}
                onChange={(e) => handleChange(e, "email")}
              />
              {emailHelperText && (
                <p className="text-sm text-red-500 mt-1">{emailHelperText}</p>
              )}
            </div>

         
            <div className="grid gap-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => handleChange(e, "password")}
              />
              {passwordHelperText && (
                <p className="text-sm text-red-500 mt-1">{passwordHelperText}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={!isFormValid()}
            >
              Connexion
            </Button>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col items-center gap-2">
        <CardDescription>
          Vous n’avez pas de compte ?
          <Button asChild variant="link" className="px-2">
            <Link href="/signup">S’inscrire</Link>
          </Button>
        </CardDescription>
      </CardFooter>
    </Card>
  )
}

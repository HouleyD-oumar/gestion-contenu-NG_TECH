import * as z from "zod";

// src/utils/validation.ts


// Schéma Zod pour la connexion ---
export const connexionSchema = z.object({
  email: z
    .string()
    .min(1, "L'email est requis")
    .email("Format d'email invalide"),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

//  Type TypeScript dérivé du schéma ---
export type ConnexionValidation = z.infer<typeof connexionSchema>;

//  Validation d’un champ individuel ---
export function validateConnexionField<K extends keyof ConnexionValidation>(
  field: K,
  value: ConnexionValidation[K]
): string | undefined {
  const result = connexionSchema.pick({ [field]: true }).safeParse({ [field]: value });
  if (!result.success) {
    return result.error.issues[0].message;
  }
  return undefined;
}




export const formSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse e-mail invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
})



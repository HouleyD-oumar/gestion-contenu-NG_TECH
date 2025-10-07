import * as z from "zod";
// formulaire de connexion ---
export const connexionSchema = z.object({
  email: z
    .string()
    .min(1, "L'email est requis")
    .email("Format d'email invalide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});


export type ConnexionValidation = z.infer<typeof connexionSchema>;


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


// formulaire d'inscription ---
export const inscriptionSchema = z
  .object({
    nom: z.string().min(2, "Le nom doit contenir au moins 2 Lettres"),
    prenom: z.string().min(2, "Le prénom doit contenir au moins 2 lettres"),
    email: z.string().email("Adresse e-mail invalide"),
    password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  })

export type InscriptionValidation = z.infer<typeof inscriptionSchema>




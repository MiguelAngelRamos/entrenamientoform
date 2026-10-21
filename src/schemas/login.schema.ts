import {z} from 'zod';

export const loginSchema = z.object({
  email: z
  .string()
  .trim()
  .min(1, { message: 'El email es obligatorio' })
  .pipe(z.email({ message: 'Formato de email no válido' })),
  password: z
  .string()
  .trim()
  .min(1, { message: 'La contraseña es obligatoria' })
  .min(8, { message: 'Mínimo 8 caracteres' })
})

export type loginSchema = z.infer<typeof loginSchema>;
/** Foto de perfil (imagem) */

import z from "zod";

export const isFileList = (v: unknown): v is FileList =>
  typeof FileList !== "undefined" && v instanceof FileList;

export const isFile = (v: unknown): v is File =>
  typeof File !== "undefined" && v instanceof File;

export function toFiles(val: unknown): File[] {
  if (val == null) return [];
  if (isFileList(val)) return Array.from(val);
  if (Array.isArray(val)) return val as File[];
  if (isFile(val)) return [val];
  return [];
}
// Troque aqui se quiser outro limite
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export const ALLOWED_IMG_MIME = new Set<string>([
  "image/jpeg",
  "image/png",
  "image/webp",
  // se quiser aceitar iPhone: "image/heic", "image/heif"
]);

/** Upload de IMAGEM (1 arquivo obrigatório) */
export const schemaIMG = z.object({
  file: z
    .any()
    .transform<File[] | undefined>((val) => toFiles(val))
    .refine((files) => (files?.length ?? 0) <= 1, {
      message: "Envie apenas 1 arquivo.",
    })
    .transform<File | undefined>((files) => (files && files[0]) || undefined)
    .refine((file) => !file || ALLOWED_IMG_MIME.has(file.type), {
      message: "Use JPG, PNG ou WEBP.",
    })
    .refine((file) => !file || file.size <= MAX_IMAGE_SIZE, {
      message: "Tamanho máximo: 5MB.",
    })
    .refine((file) => !!file, { message: "Envie 1 imagem." }),
});

/** Metadados da foto */
export const profilePhoto = z
  .object({
    img: schemaIMG.optional(),                         // campo de upload // ex: aprovado/ativo
    url: z.string().max(1000).optional(),        // URL após upload
    path: z.string().max(1000).optional(),             // caminho no storage
    alt: z.string().max(120).optional(),               // texto alternativo
  })
  .partial();

export type ProfilePhotoInput = z.input<typeof profilePhoto>;
export type ProfilePhotoOutput = z.output<typeof profilePhoto>;

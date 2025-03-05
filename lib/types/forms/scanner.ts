import { z } from "zod";

export const scannerSchema = z.object({
    id: z.string().min(1, "required")
})

export type TScannerFormSchema = z.infer<typeof scannerSchema>
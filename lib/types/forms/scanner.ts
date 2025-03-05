import { z } from "zod";

export const scannerSchema = z.object({
	employeeNo: z.string().min(1, ""),
});

export type TScannerFormSchema = z.infer<typeof scannerSchema>;

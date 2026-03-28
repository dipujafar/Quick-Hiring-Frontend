import { z } from "zod";

export const applyJobSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(1, "Name is required"),
  email: z.string({ required_error: "Email is required" }).email("Invalid email"),
  resumeUrl: z.string({ required_error: "Resume URL is required" }).url("Invalid resume URL"),
  coverLetter: z.string().optional(),
});

export type FieldType = z.infer<typeof applyJobSchema>;
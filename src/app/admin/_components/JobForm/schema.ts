import { z } from "zod";
export const jobSchema = z.object({
  thumbnailIcon: z
    .any()
    .refine(
      (f) => f instanceof File && f.size > 0,
      "Thumbnail image is required",
    )
    .refine(
      (f) => f instanceof File && f.type.startsWith("image/"),
      "File must be an image",
    ),

  title: z.string().min(1, "Job title is required"),
  description: z.string().min(1, "Job description is required"),
  category: z.string().min(1, "Category is required"),
  company: z.string().min(1, "Company is required"),
  employment_type: z.string().min(1, "Employment type is required"),
  job_type: z.string().min(1, "Job type is required"),
  gender: z.string().min(1, "Gender is required"),
  education: z.string().min(1, "Education is required"),
  salaryMin: z
    .string({ required_error: "Min salary is required" })
    .min(1, "Min salary is required")
    .regex(/^[0-9]+$/, "Must be a number"),
  salaryMax: z
    .string({ required_error: "Max salary is required" })
    .min(1, "Max salary is required")
    .regex(/^[0-9]+$/, "Must be a number"),
  division: z.string().min(1, "Division/State is required"),
  street: z.string().min(1, "Street address is required"),
  deadline: z.string().min(1, "Application deadline is required"),
  experience: z
    .string()
    .min(1, "Minimum experience is required")
    .regex(/^[0-9]+(\.[0-9]+)?$/, "Invalid year format"),
  requirements: z.string().min(1, "Requirements are required"),
  responsibilities: z.string().min(1, "Responsibilities are required"),
  benefits: z.string().min(1, "Benefits are required"),
});

export type FieldType = z.infer<typeof jobSchema>;

// ─── Helpers ─────────────────────────────────────────────────────────────────

export const EMPTY_DEFAULTS: Partial<FieldType> = {
  thumbnailIcon: undefined,
  title: "",
  description: "",
  category: "",
  company: "",
  employment_type: "",
  job_type: "",
  gender: "",
  education: "",
  salaryMin: "",
  salaryMax: "",
  division: "",
  street: "",
  deadline: "",
  experience: "",
  requirements: "",
  responsibilities: "",
  benefits: "",
};

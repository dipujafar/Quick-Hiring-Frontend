import { StaticImageData } from "next/image";

export type TCategory = {
  id: number;
  title: string;
  icon: StaticImageData;
  value: JobCategory;
  available_jobs: number;
  className: string;
};



export type JobCategory =
    | "DESIGN"
    | "SALES"
    | "MARKETING"
    | "FINANCE"
    | "TECHNOLOGY"
    | "ENGINEERING"
    | "BUSINESS"
    | "HUMAN_RESOURCE";

export type JobType = "Onsite" | "Remote";

export type EmploymentType = "Fulltime" | "Parttime";

export type JobStatus = "ACTIVE" | "CLOSED" | "DRAFT";

export type ApplicationStatus = "PENDING" | "REVIEWED" | "ACCEPTED" | "REJECTED";


// ─── Core Types ───────────────────────────────────────────────────────────────


export interface Job {
    _id: string;
    title: string;
    thumbnailIcon: string;
    description: string;
    responsibilities: string;
    requirements: string;
    benefits: string;
    category: JobCategory;
    experience: string;
    education: string[];
    gender: string[];
    salaryMin: string;
    salaryMax: string;
    currency: string;
    street: string;
    division: string;
    job_type: string;
    employment_type: string;
    companyId: string;
    company: string;
    applications?: string[];
    status: JobStatus;
    deadline: string; 
    createdAt: string;
    isFeatured?: boolean;
    updatedAt: string;
}

export interface JobApplication {
    _id: string;
    name  :string,
    email : string
    resumeUrl: string | null;
    coverLetter: string | null;
    status: ApplicationStatus;
    jobId: string;
    job?: Job;
    createdAt: string;
}

export interface IMeta {
    "page": number,
    "limit": number,
    "total": number,
    "totalPage": number
}
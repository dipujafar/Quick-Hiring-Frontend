# QuickHiring — Frontend

> A modern job hiring platform. Browse, filter, and apply for jobs seamlessly. Built with Next.js App Router with full Server-Side Rendering.

---

## 📌 Project Overview

**QuickHiring** is a full-stack job portal built for the online hiring market. The frontend is built entirely with **Next.js App Router** using **Server-Side Rendering (SSR)** for all pages — ensuring fast load times, excellent SEO, and dynamic real-time data on every visit.

The platform has two sides:

- **Public side** — Job seekers can browse all listings, filter by category/type/location, view job details, and submit applications
- **Admin side** — Employers/admins can log in, post jobs, edit/delete listings, feature jobs, and manage all incoming applications

All pages are **fully dynamic** — no static data. Every section fetches live data from the backend on each request.

---

## ✨ Features

### 🏠 Home Page

- **Featured Jobs** — Dynamically displays admin-featured job listings
- **New Jobs** — Latest job postings in real time
- **Jobs by Category** — Shows job count per category, dynamically fetched
- Everything updates automatically as admins add or remove jobs

### 💼 Jobs Page

- Browse all active job listings
- **Filter jobs** by:
  - Category
  - Job Type (Full-time, Part-time, Remote, Freelance)
  - Experience level
  - Salary range
- All filters operate server-side for SEO and performance

### 📄 Job Details Page

- Full job description, requirements, salary, and deadline
- Dynamic OG metadata for social sharing (per job)
- Apply directly from the page

### 🔐 Admin Panel (`/admin`)

- **Login** — Secure admin authentication with JWT cookie
- **Post a Job** — Create new job listings
- **Edit a Job** — Update existing job details
- **Delete a Job** — Remove job listings
- **Feature a Job** — Mark jobs to appear in the homepage featured section
- **View Applications** — See all applicants for each job listing
- All routes protected by middleware — redirects to login if unauthenticated

---

## 🚀 Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js](https://nextjs.org/) | Framework (App Router, SSR) |
| [React](https://react.dev/) | UI Library |
| [Redux Toolkit](https://redux-toolkit.js.org/) | Client-side state management |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |

---

## 📁 Project Structure

```
quick-hiring-frontend/
├── app/
│   ├── (public)/                   # Public routes
│   │   ├── page.tsx                # Home — featured jobs, new jobs, category counts (SSR)
│   │   ├── jobs/
│   │   │   ├── _components/        # JobFilter, Jobs, LoadingJobCard, SearchBar, SmFilter, Sortbar
│   │   │   ├── page.tsx            # All jobs + filters (SSR)
│   │   │   └── [id]/
│   │   │       └── page.tsx        # Job details + apply (SSR)
│   │   └── layout.tsx
│   ├── admin/                      # Admin dashboard (protected)
│   │   ├── _components/            # Shared admin UI components
│   │   ├── (dashboard)/
│   │   │   ├── applications/       # View all applications (SSR)
│   │   │   ├── jobs/               # Jobs list, create, edit (SSR)
│   │   │   └── layout.tsx
│   │   ├── auth/
│   │   │   └── login/              # Admin login page
│   │   └── layout.tsx
│   ├── favicon.ico
│   ├── globals.css
│   └── layout.tsx                  # Root layout (metadata, Redux provider)
├── assets/
│   └── images/
├── components/                     # Reusable UI components
│   ├── animation/
│   ├── modules/                    # Feature-specific modules (home, etc.)
│   ├── shared/                     # Shared components across pages
│   └── ui/                         # Base UI primitives
├── config/                         # App configuration
├── fonts/                          # Custom font setup
├── hooks/                          # Custom React hooks
├── lib/                            # Helper utilities and fetchers
├── types/                          # TypeScript interfaces (Job, Application, etc.)
└── utils/
    ├── data.ts
    ├── modifyFormError.ts
    └── proxy.ts
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) `v18+`
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)
- Backend server running — see [QuickHiring Backend](http://206.162.244.154:7128)

---

### 1. Clone the Repository

```bash
git clone https://github.com/dipujafar/Quick-Hiring-Frontend.git
cd Quick-Hiring-Frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root of the project:

```dotenv
# -----------------------------------------------
# API
# -----------------------------------------------

# Used for Redux client-side requests (exposed to browser)
NEXT_PUBLIC_BASE_API=http://localhost:3001

# Used for SSR server-side fetch (not exposed to browser)
SERVER_BASE_API=http://206.162.244.154:7128/api/v1


# -----------------------------------------------
# SSL
# -----------------------------------------------

NEXT_PUBLIC_HAS_SSL=false
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

```bash
npm run dev        # Start development server (http://localhost:3000)
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

---

## 🔄 Data Fetching Strategy

### ✅ Server-Side — Next.js `fetch`

Every page fetches data on the server for SEO, performance, and real-time accuracy. This is used across all public and admin pages.

### ⚡ Client-Side — Redux Toolkit

Used selectively for client-only interactions such as posting jobs and fetching company data.

---

## 🛡️ Route Protection

`middleware.ts` protects all `/admin/*` routes using the `accessToken` cookie:

```
/admin/*          →  requires accessToken cookie
/admin/auth/login →  public (redirects to /admin/jobs if already logged in)
/admin            →  redirects to /admin/jobs
```

Unauthenticated users are redirected to:

```
/admin/auth/login?next=/admin/the-page-they-tried-to-visit
```

---

## 🌐 SEO & Metadata

| Page | Type | Details |
|---|---|---|
| Home | Static metadata | `export const metadata` |
| Jobs listing | Static metadata | `export const metadata` |
| Job details | Dynamic metadata | `generateMetadata()` with live job data |
| Admin pages | Minimal metadata | No indexing needed |

- OG image size: **1200×630px**
- Robots: `index: true, follow: true` on all public pages

---

## 🔗 Related Repositories

- **Frontend:** [Quick-Hiring-Frontend](https://github.com/dipujafar/Quick-Hiring-Frontend.git)
- **Backend:** [quick_hiring_backend](https://github.com/dipujafar/quick_hiring_backend.git)
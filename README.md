# Cloud Campus Portal

A professional, cloud-enabled **university management dashboard** built with
React + Tailwind CSS. It demonstrates how a real campus application maps onto
**Amazon Web Services**, covering the majority of the *Cloud Computing with AWS*
syllabus — from EC2 and S3 to VPC, IAM, ELB, EBS, CloudWatch, Docker, and
ECS/EKS.

> **Final Project (3 of 3)** for the *Cloud Computing with AWS* internship.

---

## Features

- 🔐 **Login** — mock authentication with a persisted session
- 📊 **Dashboard** — stat cards (students, courses, assignments, storage used)
  plus a course-enrollment **bar chart** and a students-by-course **donut chart**
- 🎓 **Students** — full CRUD with search
- 📚 **Courses** — full CRUD with search
- 📝 **Assignments** — full CRUD with search
- 🗂️ **Resources** — a **simulated Amazon S3 bucket** with drag-and-drop file
  upload and object listing
- ☁️ **AWS Infrastructure** — a visual architecture diagram + a breakdown of
  every AWS service and its role in the system
- ⚙️ **Settings** — profile and cloud preferences (region, notifications)
- 📱 Fully responsive with a modern collapsible sidebar

All data is stored in the browser (localStorage), so the app is **fully
functional with no backend** — CRUD changes and uploads persist across reloads.

---

## Screenshots

> Add screenshots here after running the app locally.

| Dashboard | AWS Infrastructure | Resources (S3) |
|-----------|--------------------|----------------|
| `docs/dashboard.png` | `docs/infrastructure.png` | `docs/resources.png` |

---

## Syllabus / AWS Service Coverage

The **AWS Infrastructure** page explains how the portal maps to each service:

| AWS Service | Role in the portal |
|-------------|--------------------|
| **Amazon EC2** | Hosts the backend / serves the app |
| **Amazon S3** | Object storage for course files (Resources page) |
| **AWS IAM** | Users, roles, least-privilege access control |
| **Amazon VPC** | Isolated network with public/private subnets |
| **Security Groups** | Instance-level virtual firewalls |
| **Elastic Load Balancer** | Distributes traffic across EC2 instances |
| **Amazon EBS** | Persistent block storage for instances |
| **Amazon CloudWatch** | Logs, metrics, dashboards, and alarms |
| **Docker** | Containerizes the frontend and backend |
| **Amazon ECS / EKS** | Container orchestration and scaling |

**Target architecture:**
`Users → Application Load Balancer → EC2 → Express Backend → S3 / MongoDB → CloudWatch`

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS |
| Routing | React Router |
| Charts | Custom, dependency-free SVG / CSS components |
| Data | localStorage mock store (REST-like API adapter) |

---

## Folder Structure

```
project-3-cloud-campus-portal/
├── src/
│   ├── components/
│   │   ├── Layout.jsx          # App shell (sidebar + top bar)
│   │   ├── Sidebar.jsx
│   │   ├── StatCard.jsx
│   │   ├── BarChart.jsx        # Dependency-free charts
│   │   ├── DonutChart.jsx
│   │   ├── Modal.jsx
│   │   ├── ResourceManager.jsx # Generic CRUD table (Students/Courses/…)
│   │   └── ProtectedRoute.jsx
│   ├── context/AuthContext.jsx
│   ├── data/store.js           # Mock data + localStorage REST-like API
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Students.jsx
│   │   ├── Courses.jsx
│   │   ├── Assignments.jsx
│   │   ├── Resources.jsx       # Simulated S3
│   │   ├── Infrastructure.jsx  # AWS service map
│   │   └── Settings.jsx
│   ├── App.jsx                 # Routes
│   └── main.jsx
├── index.html
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## Installation & Local Development

**Prerequisites:** Node.js 18+ and npm.

```bash
cd project-3-cloud-campus-portal
npm install
npm run dev          # http://localhost:5173
```

Sign in with any email and a 4+ character password (prefilled:
`admin@campus.edu` / `demo1234`).

To create a production build:
```bash
npm run build        # outputs to dist/
npm run preview      # preview the built app
```

---

## Deployment (Vercel)

This is a static React app, so it deploys to Vercel in one step.

1. Push the project to GitHub (see below).
2. On [Vercel](https://vercel.com) → **New Project** → import the repo.
3. Framework preset: **Vite** (auto-detected). Build command `npm run build`,
   output directory `dist`.
4. Click **Deploy** — no environment variables required.

> Any static host works too (Netlify, GitHub Pages, AWS S3 + CloudFront).

---

## Pushing to GitHub

```bash
cd project-3-cloud-campus-portal
git init
git add .
git commit -m "Initial commit: Cloud Campus Portal (Final Project)"
git branch -M main
git remote add origin https://github.com/<your-username>/cloud-campus-portal.git
git push -u origin main
```

---

## Notes

- **Charts** are hand-built SVG/CSS components — no charting library — to keep
  the bundle small and dependencies minimal.
- **Mock S3:** the Resources page records uploaded file *metadata* (name, type,
  size) as bucket objects. No file bytes leave the browser, matching the
  project's "mock implementation is acceptable" guidance. Swapping in the real
  AWS SDK `PutObject` call to an S3 bucket would make it live.
- **Reset data:** clear the `cloud-campus-portal` key from your browser's
  localStorage (or use DevTools → Application → Local Storage) to restore the
  seed data.

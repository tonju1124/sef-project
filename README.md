# SEF Project – Research Publications Portal

A full-stack React + Vite application for managing and showcasing academic publications. The app supports multiple roles (student, lecturer, coordinator, admin), publication uploads, verification flows, analytics dashboards, bookmarks, notifications, and profile pages. Built with Supabase for authentication, database, and storage. This is also my first react project.

## Features

- Role-based views: student, lecturer, coordinator, admin
- Publication browsing, details, and bookmarking
- Upload and submission flow
- Verification and moderation screens
- Analytics dashboards (global + coordinator)
- Notifications and user profile pages
- Demo role switcher for rapid UI testing

## Tech Stack

- React 19
- Vite 7
- React Router
- Tailwind CSS
- Supabase (Authentication, Database, Storage)

## Getting Started

### Prerequisites

- Node.js 18+ (recommended) and npm
- A Supabase account and project ([supabase.com](https://supabase.com))

### Setup

1. **Install dependencies:**

```bash
npm install
```

2. **Configure environment variables:**

Create a `.env` file in the root directory with your Supabase credentials:

```env
VITE_SUPABASE_URL= url
VITE_SUPABASE_ANON_KEY= anon key
```

3. **Run the dev server:**
```bash
npm run dev
```

4. **Build for production:**
```bash
npm run build
```

5. **Preview the production build:**
```bash
npm run preview
```

## User Roles

The application supports multiple user roles with different permissions:

- **Admin** — Full system access, user management, announcements
- **Student** — View and upload publications, bookmarks
- **Lecturer** — View and upload publications, bookmarks
- **Coordinator** — Verify publications, department analytics

User roles are managed through Supabase authentication and stored in the database.

## Key Routes

- / — Main page
- /login — Login
- /signup — Sign up
- /upload — Upload publication
- /notifications — Notifications
- /analytics — Global analytics
- /verification — User verification
- /user-publication — User publications
- /profile — User profile
- /bookmark — Bookmarks
- /announcement — Admin announcements
- /adminusermanagement — Admin user management
- /hiddenpublication — Hidden publications
- /verifypublication — Coordinator verification
- /departmentanalytics — Coordinator analytics
- /publication/:id — Publication details

## Project Structure

- src/ — Application source
	- components/ — Reusable UI components
	- context/ — Global state (user context)
	- data/ — Mock data for users and publications
	- *.jsx — Page-level routes

## Database & Backend

This application uses Supabase for:
- **Authentication** — User signup, login, password reset, and email verification
- **Database** — PostgreSQL database for users, publications, bookmarks, notifications, and analytics
- **Storage** — File storage for publication documents and assets

Make sure your Supabase project has the necessary tables and storage buckets configured.

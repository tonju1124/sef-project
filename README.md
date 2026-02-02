# SEF Project – Research Publications Portal

A React + Vite front-end for managing and showcasing academic publications. The app supports multiple roles (student, lecturer, coordinator, admin), publication uploads, verification flows, analytics dashboards, bookmarks, notifications, and profile pages. Data is currently mocked in the client for demo purposes. This is also my first react project.

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
- Recharts (charts)
- ESLint

## Getting Started

Prerequisites: Node.js 18+ (recommended) and npm.

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Demo Roles

Use the on-screen role switcher (bottom-right) to switch between:

- Admin
- Student
- Lecturer
- Coordinator

User data is mocked in [src/data/UserData.js](src/data/UserData.js).

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

## Notes

- This is a front-end demo with mocked data; there is no backend or persistence.
- Update mock data in [src/data/publications.js](src/data/publications.js) and [src/data/UserData.js](src/data/UserData.js).

## License

Private project for coursework/demo use.

# LMS Coworking

## Objective
LMS Coworking is a Learning Management System designed for coworking spaces or corporate environments. The goal is to provide a role-based platform where administrators, managers, instructors, and learners can interact with courses, track progress, and manage learning activities within an organizational hierarchy.

## Key Features
- **Role-Based Dashboards:**
  - **Admin:** Full access to all system features and analytics.
  - **Manager:** View team progress, analytics, and manage learners.
  - **Instructor:** Create and assign courses, view analytics for assigned courses.
  - **Learner:** Enroll in courses, track personal progress.
- **Authentication:** Secure login with role-based redirection.
- **User Hierarchy:** Managers and learners are organized in a hierarchy for reporting and management.
- **Modern UI:** Built with React and Tailwind CSS for a responsive, modern experience.

## Current Status
- Authentication and role-based routing are implemented using mock user data.
- Dashboards for each role are presentational and serve as placeholders for future features.
- The project is scaffolded for future development of course management, analytics, and user features.

## Planned Features
- Course creation, assignment, and enrollment workflows
- Progress tracking and analytics dashboards
- User management and invitations
- API integration for persistent data
- Notification and messaging system

## Tech Stack
- **Frontend:** React 19, React Router v6, Tailwind CSS
- **Build Tool:** Vite
- **Linting:** ESLint

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure
- `src/components/` — Role-based dashboard and login components
- `src/features/` — (Planned) Business logic for analytics, courses, navigation, and users
- `src/mock/` — Mock user data for authentication

## License
© {new Date().getFullYear()} Marln Corp. All rights reserved.

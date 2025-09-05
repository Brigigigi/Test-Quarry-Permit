LGU Quarry Permit Web App
=========================

Overview
--------
- Purpose: Accept online quarry permit applications from citizens/contractors, allow LGU staff to review, approve/reject, and issue permits digitally.
- Stack: Node.js + Express, EJS server-rendered views, Tailwind CDN for styling, JSON file datastore (no external DB), file uploads stored on disk.
- Folders:
  - `server.js`: Express app setup and routing
  - `src/store.js`: JSON datastore utilities and domain operations
  - `src/routes/`: Applicant and Admin route handlers
  - `views/`: EJS templates (public + admin)
  - `public/`: Static assets (CSS)
  - `data/db.json`: JSON database
  - `uploads/`: Uploaded applicant documents

System Design
-------------
- Actors:
  - Applicant: submits applications, uploads documents, receives tracking code, can track status and download permit when issued.
  - Admin (LGU): logs in, reviews applications, changes status (Submitted, Under Review, Approved, Rejected, Permit Issued), adds notes, issues permits.

- Entities:
  - Application: `{ id, trackingCode, status, submissionDate, applicant, quarry, request, attachments[], reviewNotes[], history[], permit|null }`
  - Permit: `{ number, issueDate, expiryDate, conditions, fees, receiptNo, issuedBy }`
  - User: `{ username, password, displayName }` (kept in `db.json` for demo — replace with real auth later)

- Datastore:
  - Simple JSON file (`data/db.json`) read/written synchronously for simplicity. `ensureDb()` initializes if missing/empty/invalid.
  - File uploads saved under `uploads/<applicationId>/` and linked to the application record.

- Flows:
  - Apply: `/apply` — form posts multipart, files saved, application record created, attachments linked, tracking code shown.
  - Track: `/track` — enter tracking code to view live status and permit (when available).
  - Admin:
    - Login: `/admin/login` (demo: `admin` / `admin123`)
    - Dashboard: `/admin` — grouped by status
    - Detail: `/admin/applications/:id` — notes, status updates, and permit issuance
    - Secure file serve: `/admin/files/:id/:filename`

- Security and limitations (demo):
  - Session auth via `express-session` with an in-file user.
  - No rate limits, email, or external persistence — suitable for local demo and prototyping. Add proper auth, persistence, and validations for production.

Setup
-----
1) Install dependencies
   npm install

2) Run in dev mode (auto-reload)
   npm run dev

3) Open the app
   http://localhost:3000

Demo Credentials
----------------
- Admin login: `admin` / `admin123`

Customization
-------------
- LGU info: edit `settings.lgu` in `data/db.json` after first run.
- Session secret: set `SESSION_SECRET` env var.
- Ports: set `PORT` env var.

Next Steps (Productionizing)
---------------------------
- Replace JSON file with a DB and migrations.
- Add proper authentication, roles, and password hashing.
- Add validation, rate limiting, CSRF, file size/type restrictions.
- Add email/SMS notifications and audit logging.


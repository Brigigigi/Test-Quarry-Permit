const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');

function ensureDb() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

  const initial = {
    applications: [],
    users: [
      { username: 'admin', password: 'admin123', displayName: 'LGU Admin' },
    ],
    settings: {
      lgu: {
        name: 'Sample LGU',
        address: '123 Municipal Hall, Sampletown',
        contact: 'lgu@example.gov'
      }
    }
  };

  // If file missing, empty, or invalid JSON -> initialize
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf8');
    return;
  }
  try {
    const stat = fs.statSync(DB_FILE);
    if (stat.size === 0) throw new Error('empty');
    JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch {
    fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf8');
  }
}

function readDb() {
  const raw = fs.readFileSync(DB_FILE, 'utf8');
  return JSON.parse(raw);
}

function writeDb(db) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
}

function createApplication(payload) {
  const db = readDb();
  const id = uuidv4();
  const trackingCode = id.split('-')[0].toUpperCase();
  const now = new Date().toISOString();
  const app = {
    id,
    trackingCode,
    status: 'Submitted',
    submissionDate: now,
    applicant: payload.applicant,
    quarry: payload.quarry,
    request: payload.request,
    attachments: payload.attachments || [],
    reviewNotes: [],
    history: [
      { at: now, action: 'Submitted', by: 'Applicant' }
    ],
    permit: null,
  };
  db.applications.unshift(app);
  writeDb(db);
  return app;
}

function listApplications(filter = {}) {
  const db = readDb();
  let items = db.applications;
  if (filter.status) items = items.filter(a => a.status === filter.status);
  return items;
}

function getApplication(idOrTracking) {
  const db = readDb();
  return db.applications.find(
    a => a.id === idOrTracking || a.trackingCode === idOrTracking
  );
}

function updateApplication(id, updater) {
  const db = readDb();
  const idx = db.applications.findIndex(a => a.id === id);
  if (idx === -1) return null;
  const current = db.applications[idx];
  const updated = { ...current, ...updater };
  db.applications[idx] = updated;
  writeDb(db);
  return updated;
}

function addHistory(id, entry) {
  const app = getApplication(id);
  if (!app) return null;
  app.history.push({ at: new Date().toISOString(), ...entry });
  return updateApplication(id, { history: app.history });
}

function addReviewNote(id, note, by) {
  const app = getApplication(id);
  if (!app) return null;
  app.reviewNotes.push({ note, by, at: new Date().toISOString() });
  return updateApplication(id, { reviewNotes: app.reviewNotes });
}

function setStatus(id, status, by) {
  addHistory(id, { action: `Status: ${status}`, by });
  return updateApplication(id, { status });
}

function issuePermit(id, permit, by) {
  const app = getApplication(id);
  if (!app) return null;
  addHistory(id, { action: 'Permit Issued', by });
  return updateApplication(id, { status: 'Permit Issued', permit });
}

function findUser(username) {
  const db = readDb();
  return db.users.find(u => u.username === username);
}

module.exports = {
  ensureDb,
  readDb,
  writeDb,
  createApplication,
  listApplications,
  getApplication,
  updateApplication,
  addHistory,
  addReviewNote,
  setStatus,
  issuePermit,
  findUser,
  paths: {
    DATA_DIR,
    DB_FILE,
    UPLOADS_DIR,
  }
};

const express = require('express');
const path = require('path');
const fs = require('fs');
const dayjs = require('dayjs');
const {
  listApplications,
  getApplication,
  setStatus,
  addReviewNote,
  issuePermit,
  findUser,
  paths,
} = require('../store');

const router = express.Router();

function requireAuth(req, res, next) {
  if (req.session && req.session.user) return next();
  res.redirect('/admin/login');
}

router.get('/login', (req, res) => {
  res.render('admin/login', { title: 'Admin Login', error: null });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = findUser(username);
  if (!user || user.password !== password) {
    return res.render('admin/login', { title: 'Admin Login', error: 'Invalid credentials' });
  }
  req.session.user = { username: user.username, displayName: user.displayName };
  res.redirect('/admin');
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/admin/login'));
});

router.get('/', requireAuth, (req, res) => {
  const all = listApplications();
  const byStatus = {
    Submitted: all.filter(a => a.status === 'Submitted'),
    'Under Review': all.filter(a => a.status === 'Under Review'),
    Approved: all.filter(a => a.status === 'Approved'),
    Rejected: all.filter(a => a.status === 'Rejected'),
    'Permit Issued': all.filter(a => a.status === 'Permit Issued'),
  };
  res.render('admin/dashboard', { title: 'Admin Dashboard', byStatus });
});

router.get('/applications/:id', requireAuth, (req, res) => {
  const app = getApplication(req.params.id);
  if (!app) return res.status(404).send('Not found');
  res.render('admin/application', { title: 'Application Detail', app, dayjs });
});

router.post('/applications/:id/status', requireAuth, (req, res) => {
  const { status } = req.body;
  setStatus(req.params.id, status, req.session.user.username);
  res.redirect(`/admin/applications/${req.params.id}`);
});

router.post('/applications/:id/note', requireAuth, (req, res) => {
  const { note } = req.body;
  if (note && note.trim()) {
    addReviewNote(req.params.id, note.trim(), req.session.user.username);
  }
  res.redirect(`/admin/applications/${req.params.id}`);
});

router.post('/applications/:id/permit', requireAuth, (req, res) => {
  const { number, issueDate, expiryDate, conditions, fees, receiptNo } = req.body;
  const permit = {
    number,
    issueDate,
    expiryDate,
    conditions,
    fees,
    receiptNo,
    issuedBy: req.session.user.username,
  };
  issuePermit(req.params.id, permit, req.session.user.username);
  res.redirect(`/admin/applications/${req.params.id}`);
});

// Serve uploaded files to admins only
router.get('/files/:id/:filename', requireAuth, (req, res) => {
  const { id, filename } = req.params;
  const filePath = path.join(paths.UPLOADS_DIR, id, filename);
  if (!fs.existsSync(filePath)) return res.status(404).send('Not found');
  res.sendFile(filePath);
});

module.exports = router;


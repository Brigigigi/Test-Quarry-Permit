const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { createApplication, getApplication, paths } = require('../store');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Temp destination until we have id; we'll move later
    cb(null, paths.UPLOADS_DIR);
  },
  filename: function (req, file, cb) {
    const safe = Date.now() + '-' + file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    cb(null, safe);
  }
});

const upload = multer({ storage });

router.get('/apply', (req, res) => {
  res.render('public/apply', { title: 'Apply for Quarry Permit' });
});

router.post('/apply', upload.array('attachments', 5), (req, res) => {
  const applicant = {
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    org: req.body.org || '',
    idType: req.body.idType || '',
    idNumber: req.body.idNumber || '',
  };
  const quarry = {
    siteName: req.body.siteName,
    barangay: req.body.barangay,
    municipality: req.body.municipality,
    province: req.body.province,
    coordinates: req.body.coordinates || '',
  };
  const request = {
    material: req.body.material,
    volume: req.body.volume,
    unit: req.body.unit || 'm3',
    purpose: req.body.purpose || '',
    startDate: req.body.startDate || '',
    endDate: req.body.endDate || '',
    equipment: req.body.equipment || '',
  };

  const tempFiles = (req.files || []).map(f => ({
    originalName: f.originalname,
    filename: path.basename(f.path),
    size: f.size,
    mimetype: f.mimetype
  }));

  const app = createApplication({ applicant, quarry, request, attachments: [] });

  // Move files into per-application folder
  const appDir = path.join(paths.UPLOADS_DIR, app.id);
  if (!fs.existsSync(appDir)) fs.mkdirSync(appDir, { recursive: true });
  const finalFiles = [];
  for (const f of tempFiles) {
    const oldPath = path.join(paths.UPLOADS_DIR, f.filename);
    const newPath = path.join(appDir, f.filename);
    try {
      fs.renameSync(oldPath, newPath);
      finalFiles.push({ ...f, path: path.join('uploads', app.id, f.filename) });
    } catch (e) {
      // ignore
    }
  }

  // Update app with attached files
  require('../store').updateApplication(app.id, { attachments: finalFiles });

  res.render('public/submitted', { title: 'Application Submitted', app });
});

router.get('/track', (req, res) => {
  res.render('public/track', { title: 'Track Application', app: null, error: null });
});

router.post('/track', (req, res) => {
  const code = (req.body.trackingCode || '').trim();
  const app = getApplication(code);
  if (!app) {
    return res.render('public/track', { title: 'Track Application', app: null, error: 'No application found for that tracking code.' });
  }
  res.render('public/track', { title: 'Track Application', app, error: null });
});

router.get('/permit/:id/print', (req, res) => {
  const app = getApplication(req.params.id);
  if (!app || !app.permit) return res.status(404).send('Permit not found');
  res.render('public/permit_print', { title: 'Permit', app });
});

module.exports = router;


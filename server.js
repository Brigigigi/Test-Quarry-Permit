const express = require('express');
const session = require('express-session');
const path = require('path');
const dayjs = require('dayjs');
const { ensureDb } = require('./src/store');
const applicantRoutes = require('./src/routes/applicant');
const adminRoutes = require('./src/routes/admin');

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure data folders exist
ensureDb();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'change-me-secret',
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  res.locals.now = () => dayjs().format('YYYY-MM-DD HH:mm');
  res.locals.session = req.session;
  next();
});

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('public/home', { title: 'LGU Quarry Permits' });
});

app.use('/', applicantRoutes);
app.use('/admin', adminRoutes);

app.use((req, res) => {
  res.status(404).render('public/404', { title: 'Not Found' });
});

app.listen(PORT, () => {
  console.log(`Quarry Permit app listening on http://localhost:${PORT}`);
});


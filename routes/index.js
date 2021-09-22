const express = require('express');
const router = express.Router();
const { postRegister, postLogin, getLogout } = require('../controllers/index');
const { asyncErrorHandler } = require('../middleware');  // Si el archivo se llama 'index', no es necesario colocarlo en el require

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Surf Shop - Home' });
});

/* GET /register */
router.get('/register', function(req, res, next) {
  res.send('GET /register');
});

/* POST /register */
router.post('/register', asyncErrorHandler(postRegister));

/* GET /login */
router.get('/login', function(req, res, next) {
  res.send('GET /login');
});

/* POST /login */
router.post('/login', postLogin);

/* GET /logout */
router.get('/logout', getLogout);

/* GET /profile */
router.get('/profile', function(req, res, next) {
  res.send('GET /profile');
});

/* PUT /profile/:user_id */
router.get('/profile/:user_id', function(req, res, next) {
  res.send('PUT /profile/:user_id');
});

/* GET /forgot */
router.get('/forgot', function(req, res, next) {
  res.send('GET /forgot');
});

/* PUT /forgot */
router.put('/forgot', function(req, res, next) {
  res.send('PUT /forgot');
});

/* GET /reset/:token */
router.get('/reset/:token', function(req, res, next) {
  res.send('GET /reset/:token');
});

/* PUT /reset/:token */
router.put('/reset/:token', function(req, res, next) {
  res.send('PUT /reset/:token');
});

module.exports = router;

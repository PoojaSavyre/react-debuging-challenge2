const express = require('express');
const {
  createUser,
  getUserByEmail,
  createToken,
  getUserByToken,
  deleteToken,
} = require('../data/store');

const router = express.Router();

router.post('/login', (req, res) => {
  const { email, name } = req.body || {};
  if (!email || !name) {
    return res.status(400).json({ error: 'Email and name are required' });
  }
  let user = getUserByEmail(email);
  if (!user) {
    user = createUser(email, name);
  } else {
    user = { ...user, name: name || user.name };
  }
  const token = createToken(user);
  res.json({ user: { id: user.id, email: user.email, name: user.name }, token });
});

router.get('/me', (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  const user = getUserByToken(token);
  if (!user) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
  res.json({ user: { id: user.id, email: user.email, name: user.name } });
});

router.post('/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (token) deleteToken(token);
  res.json({ ok: true });
});

module.exports = router;

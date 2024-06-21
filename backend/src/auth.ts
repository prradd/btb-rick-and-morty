import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();
const secret = 'your_secret_key';

const users = [
  { id: 1, username: 'admin', password: bcrypt.hashSync('admin123', 8), role: 'admin' },
  { id: 2, username: 'user', password: bcrypt.hashSync('user123', 8), role: 'user' },
];

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(404).send('User not found');
  }
  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).send('Invalid Password');
  }
  const token = jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: 86400 });
  res.status(200).send({ id: user.id, username: user.username, role: user.role, token });
});

export default router;

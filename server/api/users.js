import express from 'express';
import users from '../users';

const router = express.Router();

// User Routes
router.get('/', (req, res) => {
  res.send(users);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const selectedUser = users.find((user) => (user.id === parseInt(id)));
  res.send(selectedUser);
});

export default router;

import express from 'express';
import posts from '../posts';

const router = express.Router();

// post Routes
router.get('/', (req, res) => {
  const { userId } = req.query;
  const selectedPosts = userId
    ? posts.filter((post) => (post.albumId === parseInt(userId)))
    : posts;

  res.send(selectedPosts);
});

export default router;

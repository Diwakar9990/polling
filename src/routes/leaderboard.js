import express from 'express';
const router = express.Router();
import leaderboardController from '../controllers/leaderboardController.js';

// Get the leaderboard of top poll options
router.get('/', leaderboardController.getLeaderboard);

export default router;

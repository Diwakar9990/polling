import express from 'express';
const router = express.Router();
import voteController from '../controllers/voteController.js';

// Submit a vote for a poll
router.post('/:id/vote', voteController.votePoll);

export default router;

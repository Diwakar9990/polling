import express from 'express';
const router = express.Router();
import pollController from '../controllers/pollController.js'

// Create a new poll
router.post('/', pollController.createPoll);

// Get results of a specific poll
router.get('/:id', pollController.getPollResults);

export default router;

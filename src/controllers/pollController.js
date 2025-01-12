import pollService from '../services/pollService.js';

const createPoll = async (req, res) => {
    try {
        const { question, options } = req.body;

        if (!question || !Array.isArray(options) || options.length < 2) {
            return res.status(400).json({ error: 'Invalid poll data' });
        }

        // Call the service to create a poll
        const poll = await pollService.createPoll(question, options);
        res.status(201).json(poll);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getPollResults = async (req, res) => {
    try {
        const { id } = req.params;

        // Get poll by ID
        const poll = await pollService.getPollById(id);
        if (!poll) {
            return res.status(404).json({ error: 'Poll not found' });
        }

        // Get poll results
        const results = await pollService.getPollResults(id);
        res.status(200).json({
            poll,
            results,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const pollController = { createPoll, getPollResults };

export default pollController;

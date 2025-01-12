import voteService from '../services/voteService.js';

const votePoll = async (req, res) => {
    try {
        const { id } = req.params;
        const { option } = req.body;

        if (!option) {
            return res.status(400).json({ error: 'Option is required' });
        }

        // Call the service to submit the vote
        await voteService.submitVote(id, option);

        res.status(200).json({ message: 'Vote registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to register vote' });
    }
};

const voteController = { votePoll };
export default voteController;

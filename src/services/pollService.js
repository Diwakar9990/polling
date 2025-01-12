import { db } from '../config/db.js';

const createPoll = async (question, options) => {
    // Validate inputs
    if (!question || !Array.isArray(options) || options.length < 2) {
        throw new Error('Invalid poll data');
    }

    // Insert poll into the database
    const result = await db.query(
        'INSERT INTO polls (question, options) VALUES ($1, $2) RETURNING *',
        [question, JSON.stringify(options)]
    );
    return result.rows[0];
};

const getPollById = async (pollId) => {
    // Fetch poll details
    const poll = await db.query('SELECT * FROM polls WHERE id = $1', [pollId]);

    if (poll.rows.length === 0) {
        throw new Error('Poll not found');
    }

    return poll.rows[0];
};

const getPollResults = async (pollId) => {
    // Fetch aggregated vote counts
    const votes = await db.query(
        'SELECT option, COUNT(*) as count FROM votes WHERE poll_id = $1 GROUP BY option',
        [pollId]
    );

    return votes.rows;
};

// module.exports = {
//     createPoll,
//     getPollById,
//     getPollResults,
// };
const pollService = { createPoll, getPollById, getPollResults };

export default pollService;
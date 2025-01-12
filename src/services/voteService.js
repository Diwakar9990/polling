import { producer } from '../config/kafka.js';
import { db } from '../config/db.js';

const submitVote = async (pollId, option) => {
    // Validate inputs
    if (!option) {
        throw new Error('Option is required');
    }

    // Construct vote message
    const voteMessage = { pollId, option };

    // Send the vote to Kafka
    return new Promise((resolve, reject) => {
        producer.send(
            [{ topic: 'votes', messages: JSON.stringify(voteMessage) }],
            (err, data) => {
                if (err) reject(err);
                else resolve(data);
            }
        );
    });
};

const processVote = async (pollId, option) => {
    // Insert vote into the database
    await db.query('INSERT INTO votes (poll_id, option) VALUES ($1, $2)', [
        pollId,
        option,
    ]);
};

const voteService = {
    submitVote,
    processVote,
};

export default voteService;
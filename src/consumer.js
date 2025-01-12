import { consumer } from './config/kafka.js';
import { db } from './config/db.js';

consumer.on('message', async (message) => {
    const vote = JSON.parse(message.value);

    try {
        await db.query('INSERT INTO votes (poll_id, option) VALUES ($1, $2)', [
            vote.pollId,
            vote.option,
        ]);
        console.log('Vote inserted into database successfully');
    } catch (error) {
        console.error('Error inserting vote into database:', error);
    }
});

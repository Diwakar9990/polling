import { db } from '../config/db.js'

const getLeaderboard = async () => {
    // Aggregate votes across all polls
    const result = await db.query(`
        SELECT option, COUNT(*) as votes
        FROM votes
        GROUP BY option
        ORDER BY votes DESC
        LIMIT 10
    `);

    return result.rows;
};

const leaderboardSerivce = {
    getLeaderboard,
};

export default leaderboardSerivce;

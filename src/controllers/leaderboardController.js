import leaderboardService from '../services/leaderboardService.js';

const getLeaderboard = async (req, res) => {
    try {
        // Call the service to get leaderboard data
        const leaderboard = await leaderboardService.getLeaderboard();
        res.status(200).json(leaderboard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const leaderboardController = { getLeaderboard };
export default leaderboardController;

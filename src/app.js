import express from 'express';
import bodyParser from 'body-parser';

// Import route modules
import pollRoutes from './routes/polls.js';
import voteRoutes from './routes/votes.js';
import leaderboardRoutes from './routes/leaderboard.js';

const app = express();

// Middleware
app.use(bodyParser.json());

// Register routes
app.use('/polls', pollRoutes);
app.use('/votes', voteRoutes);
app.use('/leaderboard', leaderboardRoutes);

const port = process.env.PORT || 3000; // You can use any port you prefer
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;

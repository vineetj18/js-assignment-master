const News = require('../controllers/news');

/**
 * 1. API to post news depending on requestType(Match/Tour) news. 
 * 2. API to get news based on matchId
 * 3. API to get news based on tourId
 * 4. API to get news based on sportId
 */

module.exports = function (app) {
    app.post('/news', async (req, res, next) => {
        try {
            const { requestType, id, title, description } = req.body;
            // Call the News controller to create news for a match
            if (requestType === 'Match') {
                // If the request is for a match, create news for match
                return res.json(await News.createNewsForMatch(id, title, description));
            } else if (requestType === 'Tour') {
                // If the request is for a tour, create news for tour
                return res.json(await News.createNewsForTour(id, title, description));
            } else {
                // Handle invalid requestType
                return res.status(400).json({ error: 'Invalid requestType' });
            }
        } catch (err) {
            return next(err);
        }
    });

    app.get('/news/match/:matchId', async (req, res, next) => {
        try {
            const matchId = req.params.matchId;
            // Call the News controller to fetch news for a match
            const news = await News.getNewsByMatch(matchId);
            return res.json(news);
        } catch (err) {
            return next(err);
        }
    });

    app.get('/news/tour/:tourId', async (req, res, next) => {
        try {
            const tourId = req.params.tourId;
            // Call the News controller to fetch news for a tour
            const news = await News.getNewsByTour(tourId);
            return res.json(news);
        } catch (err) {
            return next(err);
        }
    });

    app.get('/news/sport/:sportId', async (req, res, next) => {
        try {
            const sportId = req.params.sportId;
            // Call the News controller to fetch news for a sport
            const news = await News.getNewsBySport(sportId);
            return res.json(news);
        } catch (err) {
            return next(err);
        }
    });
}

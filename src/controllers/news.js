const NewsModel = require('../models/news');

const createNewsForMatch = async (matchId, title, description) => {
    // Fetch tourId for the given matchId
    const tourId = await NewsModel.getTourIdForMatch(matchId);
    
    if (!tourId) {
        throw new Error('TourId not found for MatchId');
    }

    // Fetch sportId for the fetched tourId
    const sportId = await NewsModel.getSportIdForTour(tourId);

    if (!sportId) {
        throw new Error('SportId not found for TourId');
    }

    // Call the NewsModel to create news for a match
    const newsModel = await NewsModel.createNewsForMatch(matchId, title, description, tourId, sportId);

    if (newsModel) {
        return {
            news: newsModel,
            message: 'News created successfully'
        };
    } else {
        throw new Error('Error creating news');
    }
}

const createNewsForTour = async (tourId, title, description) => {
    // Fetch sportId for the given tourId
    const sportId = await NewsModel.getSportIdForTour(tourId);

    if (!sportId) {
        throw new Error('SportId not found for TourId');
    }

    // Call the NewsModel to create news for a tour
    const newsModel = await NewsModel.createNewsForTour(tourId, title, description, sportId);

    if (newsModel) {
        return {
            news: newsModel,
            message: 'News created successfully'
        };
    } else {
        throw new Error('Error creating news');
    }
}

const getNewsByMatch = async (matchId) => {
    // Call the NewsModel to fetch news for a match
    return await NewsModel.getNewsByMatch(matchId);
}

const getNewsByTour = async (tourId) => {
    // Call the NewsModel to fetch news for a tour
    return await NewsModel.getNewsByTour(tourId);
}

const getNewsBySport = async (sportId) => {
    // Call the NewsModel to fetch news for a sport
    return await NewsModel.getNewsBySport(sportId);
}

module.exports = {
    createNewsForMatch: createNewsForMatch,
    createNewsForTour: createNewsForTour,
    getNewsByMatch: getNewsByMatch,
    getNewsByTour: getNewsByTour,
    getNewsBySport: getNewsBySport
};

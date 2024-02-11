const mysql = require('../lib/mysql');

const createNewsForMatch = async (matchId, title, description, tourId, sportId) => {
    const statement = 'INSERT INTO news (matchId, tourId, sportId, title, description) VALUES (?, ?, ?, ?, ?);';
    const parameters = [matchId, tourId, sportId, title, description];
    const result = await mysql.query(statement, parameters);
    if (result && result.affectedRows > 0) {
        return {
            id: result.insertId,
            title: title,
            matchId: matchId,
            tourId: tourId,
            description: description
        };
    } else {
        return null;
    }
}

const createNewsForTour = async (tourId, title, description, sportId) => {
    const statement = 'INSERT INTO news (tourId, sportId, title, description) VALUES (?, ?, ?, ?);';
    const parameters = [tourId, sportId, title, description];
    const result = await mysql.query(statement, parameters);
    if (result && result.affectedRows > 0) {
        return {
            id: result.insertId,
            tourId: tourId,
            sportId: sportId,
            title: title,
            description: description
        };
    } else {
        return null;
    }
}

const getNewsByMatch = async (matchId) => {
    const statement = 'SELECT * FROM news WHERE matchId = ?;';
    const parameters = [matchId];
    return await mysql.query(statement, parameters);
}

const getNewsByTour = async (tourId) => {
    const statement = 'SELECT * FROM news WHERE tourId = ?;';
    const parameters = [tourId];
    return await mysql.query(statement, parameters);
}

const getNewsBySport = async (sportId) => {
    const statement = 'SELECT * FROM news WHERE sportId = ?;';
    const parameters = [sportId];
    return await mysql.query(statement, parameters);
}

const getTourIdForMatch = async (matchId) => {
    const statement = 'SELECT tourId FROM matches WHERE id = ?;';
    const parameters = [matchId];
    const result = await mysql.query(statement, parameters);

    if (result && result.length > 0) {
        return result[0].tourId;
    }

    return null;
}

const getSportIdForTour = async (tourId) => {
    const statement = 'SELECT sportId FROM tours WHERE id = ?;';
    const parameters = [tourId];
    const result = await mysql.query(statement, parameters);

    if (result && result.length > 0) {
        return result[0].sportId;
    }

    return null;
}

module.exports = {
    createNewsForMatch: createNewsForMatch,
    createNewsForTour : createNewsForTour,
    getNewsByMatch: getNewsByMatch,
    getNewsByTour: getNewsByTour,
    getNewsBySport: getNewsBySport,
    getTourIdForMatch: getTourIdForMatch,
    getSportIdForTour: getSportIdForTour
};

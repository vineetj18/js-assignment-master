const mysql = require('../lib/mysql');

const getAllTours = async () => {
    const statement = 'select * from tours;';
    const parameters = [];
    return await mysql.query(statement, parameters);
}
/**
 * 1. Added indexing in the db for better fetching.
 * 2. Pagination to not overload fetch.
 * 3. Defined fields of matches to not overload fetch.
 * 
 */
const getMatchesByTourName = async params => {
    const page = parseInt(params.page) || 1;        // Current page number (default: 1)
    const pageSize = parseInt(params.pageSize) || 10;       // Number of items per page (default: 10)
    const offset = (page - 1) * pageSize;
    const statement = 'SELECT matches.id, matches.name, matches.tourId, matches.format, matches.startTime, matches.endTime FROM matches LEFT JOIN tours ON matches.tourId = tours.id WHERE tours.name = ? ORDER BY matches.startTime LIMIT ?, ?';
    const parameters = [ params.name,offset,pageSize ];
    return await mysql.query(statement, parameters);
}

module.exports = {
    getAllTours: getAllTours,
    getMatchesByTourName: getMatchesByTourName
}
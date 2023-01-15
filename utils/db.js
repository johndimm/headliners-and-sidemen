// const { response } = require('express');
const { pg, Pool } = require('pg');

const pgOptions = {
    connectionString: process.env.DATABASE_URL_GCE,
    ssl: false // { rejectUnauthorized: false }
}
// console.log(pgOptions)
const pool = new Pool(pgOptions);

// pg will convert dates to datetimes by default, we don't want that.
var types = require('pg').types;
types.setTypeParser(types.builtins.DATE, (str) => str);

async function performSQLQuery(query) {
    console.log('===> performSQLQuery, query: ', query);

    try {
        const response = await pool.query(query);
        return response.rows;
    } catch (error) {
        return error;
        console.log('===> performSQLQuery, error:', error);
    }
}

exports.releaseGroup = function (release_group_id) {
    console.log('releaseGroup:', release_group_id)
	return performSQLQuery(`select * from release_group('${release_group_id}');`);
};

exports.artistReleases = function (artist_id) {
	return performSQLQuery(`select * from artist_releases('${artist_id}');`);
};

exports.lastBefore = function (release_group_id) {
	return performSQLQuery(`select * from last_before('${release_group_id}');`);
};

exports.firstAfter = function (release_group_id) {
	return performSQLQuery(`select * from first_after('${release_group_id}');`);
};

exports.search = function (query) {
	return performSQLQuery(`select * from search('${query}');`);
};

exports.releaseGroupSet = function (release_group_id) {
    // console.log('releaseGroupSet:', release_group_id)
	return performSQLQuery(`select * from release_group_set('${release_group_id}');`);
};

exports.updateIMDbCoverArt = function (imdbid, url) {
    return performSQLQuery(`select * from update_imdb_cover_art('${imdbid}', '${url}');`);   
}

exports.lastBeforeArtist = async function (artist_id, artist_seq) {
	return await performSQLQuery(`select * from last_before('${artist_id}', ${artist_seq});`);
};

exports.firstAfterArtist = async function (artist_id, artist_seq) {
	return await performSQLQuery(`select * from first_after('${artist_id}', ${artist_seq});`);
};
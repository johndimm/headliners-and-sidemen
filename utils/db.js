// const { response } = require('express');
const { pg, Pool } = require('pg');
const pool = new Pool({
    connectionString: 'postgres://acentbrkgzmuti:1b8806c6cf87b567fc08ac96fa4ba5fb8f56bb7fb227bf7f7dad818ab2380af4@ec2-54-145-110-118.compute-1.amazonaws.com:5432/d1blqp06mufn9c',
    ssl: { rejectUnauthorized: false }
});

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

exports.releaseArtists = function (release_group_id) {
	return performSQLQuery(`select * from context.release_artists(${release_group_id});`);
};

exports.artistReleases = function (artist_id) {
	return performSQLQuery(`select * from context.artist_releases(${artist_id});`);
};

exports.lastBefore = function (release_group_id) {
	return performSQLQuery(`select * from context.last_before(${release_group_id});`);
};

exports.firstAfter = function (release_group_id) {
	return performSQLQuery(`select * from context.first_after(${release_group_id});`);
};

exports.search = function (query) {
	return performSQLQuery(`select * from context.search('${query}');`);
};
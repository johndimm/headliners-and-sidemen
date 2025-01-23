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
    console.log('===> performSQLQuery, query: \n', query);

    try {
        const response = await pool.query(query);
        return response.rows;
    } catch (error) {
        return error;
        console.log('===> performSQLQuery, error:', error);
    }
}

exports.releaseGroup = function (release_group_id) {
    // console.log('releaseGroup:', release_group_id)
	return performSQLQuery(`select * from release_group('${release_group_id}');`);
};

exports.artistReleases = function (artist_id) {
	return performSQLQuery(`select * from artist_releases('${artist_id}');`);
};

exports.artistReleasesYear = function (artist_id) {
	return performSQLQuery(`select * from get_artist('${artist_id}');`);
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

exports.search_cw = function (query) {
	return performSQLQuery(`select * from search_cw('${query}');`);
};

exports.search_artist = function (artistId) {
	return performSQLQuery(`select * from search_artist('${artistId}');`);
};

exports.releaseGroupSet = function (release_group_id) {
    // console.log('releaseGroupSet:', release_group_id)
	return performSQLQuery(`select * from release_group_set('${release_group_id}');`);
};

exports.updateIMDbCoverArt = function (imdbid, url) {
    const cmd = `select update_imdb_cover_art('${imdbid}', '${url}');`
    console.log('updateIMDBCoverArt', cmd)
    return performSQLQuery(cmd);
}

exports.getMovies = function (year, genres, title_type, has_cover, min_local_rank, max_local_rank, num_years, query, skim, min_rank, num_ranks) {

    // const g = genres == 'All Genres' ? 'null' : genres

    // console.log("genres:", genres, "g:", g)

    const cmd = `select * from get_movies(
        ${year || 'null'}, 
        ${genres || 'null'}, 
        ${title_type || 'null'}, 
        ${has_cover || 'null'},
        ${min_local_rank || 0},
        ${max_local_rank || 10},
        ${num_years || 5},
        ${query || 'null'},
        ${skim || 'null'},
        ${min_rank || 'null'},
        ${num_ranks || 'null'}
        );`

    // console.log(cmd)
    return performSQLQuery(cmd);  
}

exports.getYearRank = async function(_genre) {
    const cmd_v0 = `select startyear, count(*) as max_rank
    from wall
    where '${_genre}' in ('undefined', 'All Genres') or 
    '${_genre}' = ANY( string_to_array(wall.genres, ',') )  
    group by 1
    ;`

    const cmd = `select year as startyear, max(rank) as max_rank
    -- from genre_year_release_group_rank
    from genre
    where 
      '${_genre}' in ('undefined', 'All Genres') 
      or 
      genre = '${_genre}'
    group by 1
    order by startyear`

    console.log(cmd)
    const results = await performSQLQuery(cmd); 
    console.log(cmd, results)
    return results 
}


exports.getMap = async function(genre, year_bin_size, rank_bin_size) {
   const cmd = `select * from get_map('${genre}', ${year_bin_size}, ${rank_bin_size} )`
   const results = await performSQLQuery(cmd); 
   // console.log(cmd, results)
   return results 
}
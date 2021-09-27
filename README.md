This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Headliners and Sidemen

![release group](public/headliners-and-sidemen-release-group.png)

You have found an album you like and you want more.  Where do you look?

- **"more like this"** shows other albums that people who enjoyed this album have disproportionately liked
- **curated lists** show samples from genres containing thousands of albums
- you can **search** the album title or headliner and browse the hitlist
- by "liking" the album your **personal recommendations** may change slightly

This app presents a new method.

- by exploring the **area around your album**

The *area around your album* is defined in a specific and objective way.   For each artist who played on your album, find the last album they recorded before and the first album they recorded after recording your album.  

The interface lets you navigate the **colaboration graph** of albums.

## Collaboration Graphs

The usual definition has 
- nodes: musicians
- edges: two musicians are connected if they appear on the same album

These graphs are used to calculate degress of separation between musicians.  Examples are the
Six Degrees of Kevin Bacon (actors appearing in movies) and Erdős Number (mathematicians collaborating on math papers).


Here we are using the same data organized in a different way:

- nodes: musicians and albums
- edges: musicians are connected to the albums they recorded for, but they are not connected to each other

Each edge has an important attribute:  the date of the recording.  Often an album has contributions from different dates, so the selection of nearby albums uses each musician's recording dates to find the last before and first after.

## Artist Releases

![artist releases](public/headliners-and-sidemen-artist-releases.png)

Since we have the collaboration graph, we can show the complete history of a musicians appearances, on their own albums and those of other people.  The results are displayed in columns by year.


## Data

The data is from [musicbrainz](https://musicbrainz.org/doc/MusicBrainz_Database).  

Here is the data extraction query, instantiated from a template for this range of 1000 id's.

```
select rg.id as release_group,
  rg.name as title,
  rga.name as headliner, 
  rga.id as headliner_id,
  a.name as artist,
  a.id as artist_id,
  lat.name as instrument, 
  min(make_date(l.begin_date_year, 
       coalesce(l.begin_date_month,1), 
       coalesce(l.begin_date_day,1))) as begin_date, 
  max(make_date(l.end_date_year, 
       coalesce(l.end_date_month,1), 
       coalesce(l.end_date_day,1))) as end_date
from release_group as rg
join release as r on r.release_group = rg.id
join artist as rga on rga.id = rg.artist_credit
join medium as m on m.release = r.id
join track as t on t.medium = m.id
join l_artist_recording as ar on ar.entity1 = t.recording
join artist a on a.id = ar.entity0
join link as l on l.id = ar.link
join link_attribute as la on la.link = l.id
join link_attribute_type as lat on lat.id = la.attribute_type
where rg.id between 1049000 and 1050000
and l.begin_date_year is not null
group by 1,2,3,4,5,6,7
;
```

Sample results:
```
2717	Abbey Road	The Beatles	303	George Harrison	2863	piano	1969-02-25	1969-02-25
2717	Abbey Road	The Beatles	303	George Harrison	2863	synthesizer	1969-08-19	1969-08-19
```

There are 67,615 musicians (artists) connected to 92,044 albums (release groups) through 1,018,092 recordings, extracted from a total of 2,351,000 albums.

Table schema for run-time queries:
```
                         Table "public.context"
    Column     |          Type          | Collation | Nullable | Default 
---------------+------------------------+-----------+----------+---------
 release_group | integer                |           |          | 
 title         | character varying      |           |          | 
 headliner     | character varying      |           |          | 
 headliner_id  | integer                |           |          | 
 artist        | character varying      |           |          | 
 artist_id     | integer                |           |          | 
 instrument    | character varying(255) |           |          | 
 begin_date    | date                   |           |          | 
 end_date      | date                   |           |          | 
 cover_url     | text                   |           |          | 
Indexes:
    "idx_con_aid" btree (artist_id)
    "idx_con_artist" btree (artist)
    "idx_con_rg" btree (release_group)
    "idx_con_title" btree (title)
```

## Implementation

The postgres database is hosted on an e2-micro (2 vCPUs, 1 GB memory) running on Google Compute Engines.

The app is built with nextjs and is hosted on both heroku and vercel.
- [heroku](https://headliners-and-sidemen.herokuapp.com/)
- [vercel](https://headliners-and-sidemen.vercel.app/)

## Postgres

This uses postgres user-defined functions in lieu of an ORM.  That makes it easy to use postgres window functions to get the first album before and next album after.  The javascript API transparently passes SQL query results back to the front end.  See /sql/setup/functions.sql for the function and type definitions.

```
exports.releaseGroup = function (release_group_id) {
	return performSQLQuery(`select * from release_group(${release_group_id});`);
};

exports.artistReleases = function (artist_id) {
	return performSQLQuery(`select * from artist_releases(${artist_id});`);
};

exports.lastBefore = function (release_group_id) {
	return performSQLQuery(`select * from last_before(${release_group_id});`);
};

exports.firstAfter = function (release_group_id) {
	return performSQLQuery(`select * from first_after(${release_group_id});`);
};

exports.search = function (query) {
	return performSQLQuery(`select * from search('${query}');`);
};
```
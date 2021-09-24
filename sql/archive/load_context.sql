
create table context.recording as 
  select *
  from recording
  where 0=1
;
\copy context.recording from 'recording';

create table context.l_recording_release as 
  select *
  from l_recording_release
  where 0=1
;
\copy context.l_recording_release from 'l_recording_release';

create table context.l_artist_recording as 
  select *
  from l_artist_recording
  where 0=1
;
\copy context.l_artist_recording from 'l_artist_recording';

create table context.release as 
  select *
  from release
  where 0=1
;
\copy context.release from 'release';

create table context.artist as 
  select *
  from artist
  where 0=1
;
\copy context.artist from 'artist';


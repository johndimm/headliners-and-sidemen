tables = [
'artist',
'context',
'instrument',
'l_artist_instrument',
'l_artist_recording',
'l_recording_release',
'link',
'link_attribute',
'link_attribute_type',
'medium',
'recording',
'release',
'release_group',
'track'
]


template = """
create table context2.<table> as 
select *
from <table>
where 0=1
;
"""

for table in tables:
    print (table)
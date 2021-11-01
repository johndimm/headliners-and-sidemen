import urllib.request
import json 
import time

from urllib.request import Request, urlopen 


def download_image_info (gid, output):
    #key = process.env['IMDB_RAPIDAPI_KEY']
    key = 'GEuSb6FUftp2lzzZ2wkQkYSGKcFhvkJT'
    imdbid = gid

    cover_url = 'https://movie-database-imdb-alternative.p.rapidapi.com?r=json&i=%s' % imdbid

    #print (gid, cover_url)
    try:
        req = Request(cover_url)
        req.add_header('x-rapidapi-host', 'movie-database-imdb-alternative.p.rapidapi.com')
        req.add_header('x-rapidapi-key', key)
        with urlopen(req) as url:
            try:
                data = json.loads(url.read().decode())
                print (data, file=output)
                #if 'Poster' in data:
                #    image = data['Poster']
                #    if len(image) > 0 and image != 'N/A' and image != 'N':
                #        print("%s\t%s" % (gid, image), file=output)
            except urllib.error.HTTPError as e:
                return print (e)
    except Exception as e:
        return print (e)

def process_list (start, end):
    fname = 'data/gid_url_%s_%s' % (start, end)
    output = open (fname, 'w')
    print (fname)

    f = open ('movies.dat')
    i = 0
    for line in f:
        if (i >= start and i < end):
            #print (line)
            gid = line.strip()
            #print (gid)
            if gid[0:2] == 'tt':
                    download_image_info(gid, output)
                    time.sleep(0.1)
        i += 1
    f.close();
    output.close()

def stripes():
#    process_list(0,1)
#    return

#  573761 movies.dat
    start_on = 12000 
    window = 1000
    for i in range(90):
        print ("i:", i)
        start = i * window
        end = start + window
        if start >= start_on:
            process_list(start, end)

stripes()

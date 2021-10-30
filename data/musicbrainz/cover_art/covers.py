import urllib.request, json 
import time

def download_image_info (gid, output):
    cover_url =  'https://coverartarchive.org/release-group/%s?fmt=json' % gid
    print (gid, cover_url)
    try:
        with urllib.request.urlopen(cover_url) as url:
          try:
            data = json.loads(url.read().decode())
            images = data['images']
            if len(images) > 0:
                 print("%s\t%s" % (gid, images[0]['thumbnails']['small']), file=output)
          except urllib.error.HTTPError as e:
            return print (e)
    except Exception as e:
        return print (e)

def process_list (start, end):
    fname = 'data/gid_url_%s_%s' % (start, end)
    output = open (fname, 'w')
    print (fname)

    f = open ('gid.tsv')
    i = 0
    for line in f:
        (gid, begin_date) = line.strip().split('\t')
        if (i >= start and i < end):
          download_image_info(gid, output)
          time.sleep(0.2)
        i += 1
    f.close();
    output.close()

def stripes():
#    process_list(0,1)
#    return

    start_on = 201000 # 137000
    for i in range(300):
        start = i * 1000
        end = start + 1000
        if start >= start_on:
            process_list(start, end)

stripes()

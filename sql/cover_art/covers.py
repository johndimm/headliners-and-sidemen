import urllib.request, json 
import time

def download_image_info (id, gid, output):
    cover_url =  'https://coverartarchive.org/release-group/%s?fmt=json' % gid
    print (id, cover_url)
    try:
        with urllib.request.urlopen(cover_url) as url:
            data = json.loads(url.read().decode())
            images = data['images']
            if len(images) > 0:
                 print("%s\t%s\t%s" % (id, gid, images[0]['thumbnails']['small']), file=output)
    except urllib.error.HTTPError as e:
        # "e" can be treated as a http.client.HTTPResponse object
        return print (e)

def process_list (start, end):
    fname = 'data/gid_url_%s_%s' % (start, end)
    output = open (fname, 'w')
    print (fname)

    f = open ('gid.tsv')
    i = 0
    for line in f:
        i += 1
        (id, gid) = line.strip().split('\t')
        if (int(id) > start and int(id) < end):
          #print ("id:%s, gid:%s" % (id, gid))
          download_image_info(id, gid, output)
          time.sleep(0.2)
        #if (i > 3):
        #    return
    f.close();
    output.close()

def stripes():
    for i in range(2351):
        start = i * 1000
        end = start + 1000
        if start >= 2300000: # 886000: # 796000:
            process_list(start, end)

stripes()

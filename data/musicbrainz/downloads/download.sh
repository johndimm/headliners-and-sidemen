ftp -nv ftp.musicbrainz.org < get_latest.ftp 
LATEST=`cat LATEST`

cp get_latest.ftp download_data.ftp
echo "cd $LATEST" >> download_data.ftp
echo "get mbdump.tar.bz2" >> download_data.ftp
echo "get mbdump-cover-art-archive.tar.bz2" >> download_data.ftp

ftp -nv ftp.musicbrainz.org < download_data.ftp

import numpy as np
import sys

first_year = 1922

def p(msg):
    sys.stdout.write(msg)

def header():
    years = np.arange(first_year,2023,1)
    p('director\tvalue\tstart\t')
    for year in years:
        p(f"{year}\t")
    print()

def main():
    header()
    f = open ('director_movie_year.tsv')
    this_director = None
    for r in f:
        fields = r.strip().split('\t')
        director, year, movie, value, min_start_year = fields[0:5]
        year = int(year)
        #print ("movie:", movie)

        if director != this_director:
            print()
            this_year = first_year
            this_director = director
            p(director + "\t" + value + "\t" + min_start_year + "\t")

        p("\t" * (year - this_year))
        #if year == this_year:
        #    p(", ")
        this_year = year

        image_url = "https://m.media-amazon.com/images/M/MV5BN2UzMTdhNmYtMWNmZi00MGQ3LWIxMzQtNTAyOGM0MWZiM2U0XkEyXkFqcGdeQXVyNzk3ODM4NQ@@._V1_SX300.jpg"
        p(f'"=image("{image_url}")"\t')
        p(f"{movie}")
               
        # print (f"{director} {year} {movie}")

main()
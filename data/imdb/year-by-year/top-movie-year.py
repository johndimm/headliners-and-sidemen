import json


def years():
    f = open('top_movie_year.tsv')
    years = []
    movies = []
    thisyear = None

    for r in f:
        r = r.strip()
#        year, cover_url, primaryTitle, genres, tconst, averageRating, numVotes, rating, rank = r.split('\t')
        p = r.split('\t')
        year = p[0]
        cover_url = p[1]
        primaryTitle = p[2]
        genres = p[3]
        tconst = ''
        if len(p) >= 5:
            tconst = p[4]
 

        # print (str(p))

        if len(p) >= 5:
            if thisyear == None:
                thisyear = year
            if year != thisyear:
                years.append({
                    "year": thisyear,
                    "movies": movies
                })
                thisyear = year
                movies = []

            movies.append({
                "primaryTitle": primaryTitle,
                "cover_url": cover_url,
                "tconst": tconst,
                "genres": genres
            })

    f.close()

    return years
    # print (json.dumps(years, indent=2))


def report(years):
    print("""
        <style>
           .all_years { white-space: nowrap; width: 30000px; y-overflow: hidden; text-align: center; font-family: sans-serif; }
           .year_heading { width: 100%; height: 25px; text-align: center; margin-bottom: 20px;}
           .year_content { width: 100%; overflow: auto; height: calc(100% - 50px)}
          
           .year_column { width: 190px; font-family: sans-serif; letter-spacing: 10px; background: lightgray; display: inline-block; height: 20px; padding-top: 5px; }
           .movie_column { float: left; width: 200px; }

           .movie_div { width: 200px; white-space: wrap; text-align: font-family: sans-serif; margin-bottom: 10px;}
           .cover { max-width: 180px; }
           .genres { font-size: 8pt;}
           a { color: inherit;  text-decoration: none; }

        </style>
           """)

    print("<div class='all_years'>")

    print("<div class='year_heading'>")
    for year_movies in years:
        year = year_movies['year']

        print("<div class='movie_column'>")
        print(f"<div class='year_column'>{year}</div>")
        print("</div>")
    print("</div>")




    print("<div class='year_content'>")
    for year_movies in years:

        movies = year_movies['movies']
        year = year_movies['year']

        print("<div class='movie_column'>")
        rank = 0
        for movie in movies:
            rank += 1
            if rank < 10:
                primaryTitle = movie['primaryTitle']
                cover_url = movie['cover_url']
                tconst = movie['tconst']
                genres = movie['genres']
                image = ''
                # print (f"(cover_url: {cover_url})")
                if cover_url not in (None, ''):
                    image = f"<img class='cover' src={cover_url} onerror=\"this.style.display='none'\"/>"

                url = f"https://movies-and-actors.vercel.app/release_group/{tconst}"

                print(f"""
                    <div class='movie_div'>
                        <a href={url} target="_blank">
                            {image}
                            <div>{primaryTitle}</div>
                            <div class='genres'>{rank} -- {genres}</div>
                        </a>
                    </div>
                    """)
        print("</div>")

    print("</div>")
    print("</div>")


def main():
    report(years())


main()


"""
    print("<div class='year_heading'>")
    for year_movies in years:
        year = year_movies['year']

        print("<div class='year_column'>")
        print(f"<b>{year}</b>")
        print("</div>")
    print("</div>")
"""

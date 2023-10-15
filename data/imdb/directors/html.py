import numpy as np
import sys
from math import floor

first_year = 1922


def p(msg):
    sys.stdout.write(msg)


def printCells(cells):
    print("<tr>")
    for cell in cells:
        print(f"<td valign='top'>{cell}</td>")
    print("</tr>")


def printHead():
    print('''
           <html>
           <head>
             <meta charset="UTF-8">
           <style> 
              body { font-family: sans-serif }
              td { text-align: center }
              a { text-decoration: none }        
              .movie { font-size: 10pt}
              .director { font-size: 18pt } 
              .stars {
                  font-size: 6pt; 
                  color: yellow; 	
                 -webkit-text-stroke-width: 1px;
                 -webkit-text-stroke-color: black;   
              }
              .half { 
                 color: lightgray;
              }
              .xhalf {
                  background: linear-gradient(to right, blue 60%, #FFFFFF 40%);
                 -webkit-background-clip: text;
                 -webkit-text-fill-color: transparent;
                 font-size: 6pt; 
              }
           </style
           </head>
           <body>
           ''')


def main():
    printHead()
    print("<table><tdata>")
    # header()
    f = open('director_movie_year.tsv')
    printMovies(f)
    print("</tdata></table>")
    print("</body></html>")


def printMovies(f):
    this_director = None
    cells = []
    for r in f:
        fields = r.strip().split('\t')
        director, year, movie, value, min_start_year, cover_url, tconst, averageRating = fields[
            0:8]
        year = int(year)
        #print ("movie:", movie)
        star = '★'
        half_star = f"<span class='half'>{star}</span>"
        stars = '<div class="stars">'
        five = float(averageRating) / 2.0
        for i in range(floor(five)):
            stars += star
        if five - floor(five) > 0.5:
            stars += half_star
        stars += '</div>'

        if director != this_director:
            printCells(cells)
            cells = []

            this_director = director
            cells.append(f"<div class='director'>{director}</div>")

        url = f"https://movies-and-actors.vercel.app/release_group/{tconst}"
        poster = ''
        if cover_url:
            poster = f'<img width="150" src="{cover_url}" />'

        title = f'<div class="movie">{movie}</div>'
        cells.append(f"<a href={url}>{poster} {stars} {title}</a>")
        # else:
        #    poster = ''


main()

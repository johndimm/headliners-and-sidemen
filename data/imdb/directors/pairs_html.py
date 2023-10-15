import numpy as np
import sys
from math import floor

first_year = 1922


def p(msg):
    sys.stdout.write(msg)


def printCells(output, cells):
    print("<tr>", file=output)
    for cell in cells:
        print(f"<td valign='top'>{cell}</td>", file=output)
    print("</tr>", file=output)


def printHead(output):
    print('''
           <html>
           <head>
             <meta charset="UTF-8">
           <style> 
              body { font-family: sans-serif }
              td { text-align: center }
              a { text-decoration: none }        
              .movie { font-size: 10pt}
              .director { font-size: 10pt } 
              .stars {
                  font-size: 6pt; 
                  color: yellow; 	
                 -webkit-text-stroke-width: 1px;
                 -webkit-text-stroke-color: black;   
              }
              .half { 
                 color: white;
                -webkit-text-stroke-color: gray;   
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
           ''', file=output)


def main():

    output = open("pairs.html", "w")
    printHead(output)
    print("<table><tdata>", file=output)
    # header()
    f = open('groups_with_movies.tsv')

    printMovies(f, output)
    f.close()
    print("</tdata></table>", file=output)
    print("</body></html>", file=output)
    output.close()



def printMovies(f, output):

    last_a_nconst = None
    last_b_nconst = None
    cells = []
    nrecs = 0
    for r in f:
        nrecs += 1
        sys.stdout.write(f"{nrecs}\r")
        if nrecs > 10000:
            return
        
        fields = r.strip().split('\t')
        #a_nconst, a_primaryname, a_category, b_nconst, b_primaryname, b_category, start, end, rating, num_movies, #tartyear, primarytitle, genres, cover_url, tconst, averagerating, numvotes = fields[0:17]

        #a_nconst, a_primaryname, collaborator_names, collaborators, a_category, start, end, rating, num_movies, startyear, primarytitle, genres, cover_url, tconst, averagerating, numvotes

        A_nconst, A_primaryName, collaborator_names, collaborators, A_category, start, end, rating, num_movies, startYear, primaryTitle, genres, cover_url, tconst, averageRating, numVotes = fields[0:16]

        
        # print (f"averageRating={averageRating}")
        # director, year, movie, value, min_start_year, cover_url, tconst, averageRating = fields[0:8]

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

        if last_a_nconst != A_nconst or last_b_nconst != collaborator_names:
            printCells(output, cells)
            cells = []

            last_a_nconst = A_nconst
            last_b_nconst = collaborator_names

            cells.append(f"<div class='director'>{A_primaryName} <font size='2'>{A_category}</font></div>")
            cells.append(f"<div class='director'>{collaborator_names} <font size='2'></font></div>")

        url = f"https://movies-and-actors.vercel.app/release_group/{tconst}"
        poster = ''
        if cover_url:
            poster = f'<img width="150" src="{cover_url}" />'

            # When these 2 lines are indented, print only movies with posters.
            title = f'<div class="movie">{primaryTitle}</div>'
            cells.append(f"<a href={url}>{poster} {stars} {title}</a>")
        # else:
        #    poster = ''
    printCells(output, cells)

main()

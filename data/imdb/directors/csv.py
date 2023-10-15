import numpy as np
import sys

first_year = 1922


def p(msg):
    sys.stdout.write(msg)

def printCells(cells):
    print ("<tr>")
    for cell in cells:
        print (f"<td>{cell}</td")
    print ("</tr>")

def header():
    cells = []
    years = np.arange(first_year,2023,1)
    cells.append('director')
    cells.append('rating')
    cells.append('start')
    for year in years:
        cells.append(year)
    printCells(cells)

def main():
    header()
    f = open ('director_movie_year.tsv')
    print ("<table><tdata>")
    printMovies(f)
    print ("<tdata></table")

def printMovies(f):
    this_director = None
    cells = []
    for r in f:
        fields = r.strip().split('\t')
        director, year, movie, value, min_start_year = fields[0:5]
        year = int(year)
        #print ("movie:", movie)

        if director != this_director:
            printCells(cells)
            this_year = first_year
            this_director = director
            cells.append(director)
            cells.append(value)
            cells.append(min_start_year)


        for i in range (year - this_year):
            cells.append('')
        #if year == this_year:
        #    p(", ")
        this_year = year
        cells.append(movie)
               

main()
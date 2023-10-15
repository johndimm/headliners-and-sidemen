import json

def years():
    f = open ('rank_year.tsv')
    years = []
    people = []
    thisyear = None

    yearcount = 0
    for r in f:
        r = r.strip()
        year, nconst, primaryName, category, sum_value = r.split('\t')
        yearcount += 1
        if thisyear == None:
            thisyear = year
        if year != thisyear:
            years.append({
                "year": thisyear, 
                "people": people
                })
            thisyear = year
            people = []
            yearcount = 0

        if yearcount <= 100:
            people.append({
                "primaryName": primaryName, 
                "category": category, 
                "nconst":nconst
                })

    f.close()

    return years
    #print (json.dumps(years, indent=2))



def report (years):
    print ("""
        <style>
           .year_column { float: left; width: 250px; }
           .all_years { white-space: nowrap; width:50000px }
           .category {font-size: 8pt;}

        </style>
           """)
    
    print ("<div class='all_years'>")

    for year_people in years:
        people = year_people['people']
        year = year_people['year']

        print ("<div class='year_column'>")
        print (f"<div><b>{year}</b></div>")
        for person in people:
            primaryName=person['primaryName']
            category=person['category']
            nconst=person['nconst']
            print (f"<div class={nconst}>{primaryName} <span class='category'>{category}</span></div>")
        print ("</div>")

    print ("</div>")

def main():
    report (years())

main()
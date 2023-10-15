zooms = [500, 500, 380, 281, 224, 181, 156, 136, 121, 105]
width = 1185


def main():
    for i in range(len(zooms)):
        zoom = zooms[i]
        years = i + 1
        factor = round(zoom / (width/years), 2)
        #print(f"years:{years}, width: {width}, zoom: {zoom}, factor:{factor}")
        #print(years2zoom(years, width, factor))
        print(factor, ",")


def years2zoom(years, width, factor):
    zoom = (width/years) * factor
    return round(zoom)


main()

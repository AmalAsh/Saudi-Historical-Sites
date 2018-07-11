#Saudi Arabia Historical Sites
## Overview
This is a single page application showing historical locations across Saudi Arabia as a version of the neighborhood map project. This application used React, Google maps and Wikipedia API.

## Requirements:
* npm

## Features:

* Search the available locations.
* Click on the markers to display information about if from Wikipedia API.
* Click on the list items to display its information on the map.

##APIs:
* Google Maps API: used to render the map [more](https://cloud.google.com/maps-platform/)
* Wikipedia API: used to fetch information about the location [more](https://www.mediawiki.org/wiki/API:Main_page)


## How to Run:

1. Run the command `npm install` to install the project dependencies
2. Run the app with `npm start`
3. The app will start in the default browser

## How to run in production mode:

1. Run the command `npm run build` to run the app in production mode.
2. Python 2: python -m SimpleHTTPServer 8000
Python 3: python3 -m http.server 8000
3. The app will start in the default browser

## Working off-line:
To be able to view the app offline, follow the steps:
1. Go to google developer tool
2. Go to the application section
3. Check the "offline" box

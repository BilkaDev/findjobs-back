
# Findjobs - backend
## Application Description
This is the server for the findjobs application.
It is used for storing data and sending responses to the client.

view online: https://findjobs.bilka.networkmanager.pl \
source code: (https://github.com/BilkaDev/findjobs-front)

## Technology:
node js - v16.15.1 \
express - v4.18.1 \
mysql2 - v2.3.3 \
typescript - v4.6.4 

## Endpoints:
User: \
get /api/user/:id  get user \
post /api/user/singup create user \
post /api/user/login login \
Ad: /
get /api/job/ get all ads \
get /api/job/:adId get an ad with an ID \
get /api/job/search/:name get all ads with an search name \
get /api/job/user/:id get users ads \

these paths require authorization: \
post /api/job/ create ad. \
patch /api/job/:id edit ad an id.
delete /api/job/:id delete ad from server.



## In the project directory, you can run:
### `tsnd index.ts`

To start with, you need to create a config.ts file in the config directory. \
and add the data to the database connection. \
And allow http for corsOrigin. \
The database code is added to the config folder.

The sample file is in config/config.example.ts

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.


### `tsc` bulid the app.
Builds the app for production to the `build` folder.\
Your app is ready to be deployed!

# Instructions
for local development:

create .env in the /client directory with the following entry
or set the equivalent environment variable:

```
REACT_APP_BASE_URL="our_backend_url/"
PORT=1111
```

The backend URL can be either our flip3 API or localhost.


Make sure you have all dependencies by running:
`npm install`

Start the development server with:
`npm run start`

Or for running remotely, install "forever" with:
`npm install forever`

Then run:
`node_modules/forever/bin/forever start -c "npm start" ./ > output.log`

Access the app at http://localhost:1111

The logs will be output to the "output.log" file. 

Note: This will run the server in development mode (slow)



Heroku:

url: https://osu-cs361-longbourn.herokuapp.com/
heroku: https://dashboard.heroku.com/apps/osu-cs361-longbourn

using connected (slow) mysql db
database connection info can be obtained from heroku environment variable:
  CLEARDB_DATABASE_URL

or the individual fields for connecting can be taken from the variables:
  DB_DATABASE
  DB_HOST
  DB_PASSWORD
  DB_USER

the other two environment variables used by the heroku app are:
NODE_ENV (production on heroku)
REACT_APP_BASE_URL

deploying:
get access to heroku application
checkout the heroku branch from the group github repository
run:
  heroku login
add heroku remote if not done:
  heroku git:remote -a osu-cs361-longbourn
deploy:
  git push heroku heroku:master
(executes the scripts in package.json from the project's root directory)

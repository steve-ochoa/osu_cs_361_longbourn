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

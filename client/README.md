for local development with flip backend:

create .env in the /client directory with the following entry:
```REACT_APP_BASE_URL="our_backend_url/"
PORT=1111```

or set the equivalent environment variable.

make sure you have all dependencies by running:
`npm install`

start the development server with:
`npm run start`

or for running remotely, install "forever" with:
`npm install forever`
then run:
`node_modules/forever/bin/forever start -c "npm start" ./ > output.log`

access the app at http://localhost:1111

the logs will be output to the "output.log" file. 

Note: This will run the server in development mode (slow)

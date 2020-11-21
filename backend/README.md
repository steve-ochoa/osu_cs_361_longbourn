# Experts Finder Backend API

## Project setup
Make sure you have Node.js v14.9.0 installed.
```
myShell$ node --version
v14.9.0
```

Install dependencies:
```
npm install
```

### dotenv Required
Request from team or create your own .env file with credential environment variables and place in the same dir as server.js:
```
.env
```

### Run
Default port is 6997. 

```
node server.js
```

or to run with forever:
```
nohup node_modules/forever/bin/forever server.js > output.log &
```

Logs will be output to `output.log`. 

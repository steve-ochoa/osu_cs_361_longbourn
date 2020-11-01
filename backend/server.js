// Config env vars from .ENV file
dotenv = require('dotenv');
const result = dotenv.config()
 
if (result.error) {
  throw result.error
}
 
console.log(result.parsed)

// Setup Express
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Healthcheck route
app.get('/status', (req, res) => {
  res.json({ message: "Status OK." });
});

// Load routes
require('./app/routes/expert.routes')(app);
require('./app/routes/contact_details.routes')(app);
require('./app/routes/skill.routes')(app);
require('./app/routes/course.routes')(app);
require('./app/routes/company.routes')(app);

// Start server
const PORT = process.env.PORT || 6997;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

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
const path = require('path');

const app = express();

/* serve the built react app */
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Healthcheck route
app.get('/status', (req, res) => {
  res.json({ message: "Status OK." });
});

// Entity routes
require('./app/routes/expert.routes')(app);
require('./app/routes/contact_details.routes')(app);
require('./app/routes/skill.routes')(app);
require('./app/routes/course.routes')(app);
require('./app/routes/company.routes')(app);

// Relationship routes
require('./app/routes/expert_course.routes')(app);
require('./app/routes/expert_skill.routes')(app);
require('./app/routes/expert_company.routes')(app);

// Search Query Routes
require('./app/routes/expert_query.routes')(app);

// Start server
const PORT = process.env.PORT || 6997;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

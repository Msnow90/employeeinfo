/*
=======================================
    Packages, Dependencies, Config.
=======================================
*/
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressSanitizer = require('express-sanitizer');
const path = require('path');

const config = require('./config');
const port = process.env.PORT || config.port;
const dbUrl = (process.env.NODE_ENV == 'develop') ? config.devDBUrl : config.prodDBUrl;

const apiRoutes = require('./routes');

const MongoConnection = require('./models/utils/connection');

MongoConnection.connect(dbUrl, config.dbName);
 
/*
============================
        Express Setup
============================
*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());

app.use(express.static(path.resolve(__dirname, 'public')));

/*
=======================
        Routes
=======================
*/

app.use(apiRoutes);

app.get('/*', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
})

app.use((err, req, res, next) => {
    console.log('error is: ', err)
    // more elaborate error handling can take place here
    res.send('Server error has occurred.')
})


app.listen(port, () => {
    console.log(`Server is now listening on port ${port}...`)
})


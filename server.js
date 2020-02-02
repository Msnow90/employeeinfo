/*
=======================================
    Packages, Dependencies, Config.
=======================================
*/

const app = require('express')();
const bodyParser = require('body-parser');
const expressSanitizer = require('express-sanitizer');

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

/*
=======================
        Routes
=======================
*/

app.use(apiRoutes);

app.use((err, req, res, next) => {
    console.log('error is: ', err)
    // more elaborate error handling can take place here
    res.send('Server error has occurred.')
})


app.listen(port, () => {
    console.log(`Server is now listening on port ${port}...`)
})


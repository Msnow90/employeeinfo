const MongoConnection = require('./models/utils/connection');
const Employee = require('./models/employee');

const config = require('./config');

MongoConnection.connect(config.devDBUrl, config.dbName);



var employeesToSeed = [
    {
        name: 'Mario and Luigi',
        occupation: 'Game Characters',
        skills: ['Jumping', 'Running', 'Plumbing']
    },

    {
        name: 'Jon Snow',
        occupation: 'Commander of the Night\'s Watch',
        skills: ['Not knowing', 'Leading', 'King stuff']
    }, 
    
    {
        name: 'Matt\'s dog',
        occupation: 'Scraps and crumbs eater',
        skills: ['Eating a pound of food per second', 'smelling bad', 'sleeping']
    }
]

// set a timeout to ensure our database connects before operations take place
setTimeout(() => {

    Employee.createMany(employeesToSeed, (err, result) => {
        if (err)
            console.log('Error during seeding: ', err);
    
        else {
            console.log('Seeding complete!')
            process.exit(0);
        }
    })
}, 3000)




# Employee Info - Instructions!!!

Perform a git clone from the repository, then navigate to the main directory from a terminal.

First run 'npm install' to install all necessary dependencies.
Next run 'npm run build' to run webpack, which will bundle our front end react app.

*** If you want to manually seed a few employees, run 'npm run seed'.

Run 'npm start' to fire up the server, which will be listening on port 8080.

Navigating to 'localhost:8080/' from a browser will show all employees currently in the database.

## Basic Architecture

Node.js, MongoDB (Using our own custom ORM), Express, React

## Database Models

One database connection is established at start of server. That database is kept open and passes it's reference into our models files.

We use a base model file to create an ORM for our mongodb collection. This allows us to designate lifecycle hooks and data type validation. We can then take that base model and make more specific adjustments for each collection.

The methods involved in the BaseModel are:

 - find(query, callback)
 - findOne(query, callback)
 - createOne(object, callback)
 - updateOne(query, newObject, callback)
 - deleteOne(query, callback)
 - updateMany(query, newObject, callback)
 - createMany(objectArray, callback)
 - deleteMany(query, callback)

 *** Life cycle methods are:

 - beforeCreate
 - beforeUpdate
 - beforeDelete
 - beforeCreateMany
 - beforeUpdateMany
 - beforeDeleteMany

 All these methods can be adjusted for each specific model (ex: employees)

## Routes

*** All routes related to api are prepended with /api

### Employees:

*** Prepended by /employees (/api/employees)

Route | Verb | Description
--- | --- | ---
/ | GET | Returns array of all employees
/:id | GET | Returns an employee by id
/ | POST | Creates an employee
/:id | PUT | Update an employee based on id
/:id | DELETE | Delete an employee based on id

*** Attached to the repo is a postman collection containing all routes necessary for the app.

## Security

Using express-sanitizer to check all incoming data through request urls and data bodies. This will cleanup any harmful characters, scripts, etc - to prevent any cross site scripting. Or reflected cross site scripting.
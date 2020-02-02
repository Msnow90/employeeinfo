# Employee Info - Instructions!!!

Testing our app.

## Basic Architecture

Node.js, MongoDB (Using our own custom ORM), Express, React

## Database Models

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

## Security

Using express-sanitizer to check all incoming data through request urls and data bodies.
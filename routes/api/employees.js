const router = require('express').Router();
const Employee = require('../../models/employee');
const ObjectID = require('mongodb').ObjectID;

router.get('/', (req, res, next) => {

    Employee.find({}, (err, employees) => {
        if (err)
            return next(err);
        res.json(employees);
    })
})

router.get('/:id', (req, res, next) => {
    var id = req.sanitize(req.params.id);

    Employee.findOne({ _id: ObjectID(id) }, (err, employee) => {
        if (err)
            return next(err)
        res.json(employee);
    })
})


router.post('/', (req, res, next) => {

    var newEmployee = {
        name: req.sanitize(req.body.name),
        occupation: req.sanitize(req.body.occupation),
        skills: req.sanitize(req.body.skills).split(',')
    }

    Employee.createOne(newEmployee, (err, result) => {
        if (err)
            return next(err);
        res.json(result);
    })
})


router.put('/:id', (req, res, next) => {
    var id = req.sanitize(req.params.id);
    var employeePropsToUpdate = Object.keys(req.body);

    var employeeObjToUpdate = {};

    employeePropsToUpdate.forEach(prop => {
        employeeObjToUpdate[prop] = req.sanitize(req.body[prop]);
    })

    console.log('empobj is', employeeObjToUpdate)

    
    Employee.updateOne({ _id: ObjectID(id) }, employeeObjToUpdate, (err, result) => {
        if (err)
            return next(err);
        res.json(result);
    })
})

router.delete('/:id', (req, res, next) => {
    var id = req.sanitize(req.params.id);

    Employee.deleteOne({ _id: ObjectID(id) }, (err, result) => {
        if (err)
            return next(err);

        res.json(result);
    })
})
 

module.exports = router;




// findOne: (query) => {
//     return handleCall(collection.findOne, [query]);
// },

// createOne: (obj) => {
//     this.virtuals.beforeCreate(obj);
//     return handleCall(collection.insertOne, [collection, obj]);
// },

// updateOne: (oldObj, newObj) => {
//     this.virtuals.beforeUpdate(oldObj, newObj);
//     return handleCall(collection.updateOne, [collection, oldObj, newObj]);
// },

// deleteOne: (obj) => {
//     this.virtuals.beforeDelete(obj);
//     return handleCall(collection.deleteOne, [collection, obj]);
// },

// updateMany: (oldObjsArr, newObjsArr) => {
//     this.virtuals.beforeUpdateMany(oldObjsArr, newObjsArr);
//     return handleCall(collection.updateMany, [collection, oldObjsArr, newObjsArr]);
// },

// createMany: (objsArr) => {
//     this.virtuals.beforeCreateMany(objsArr);
//     return handleCall(collection.insertMany, [collection, objsArr]);
// },

// deleteMany: (objsArr) => {
//     this.virtuals.beforeDeleteMany(objsArr);
//     return handleCall(collection.deleteMany, [collection, objsArr]);
// },

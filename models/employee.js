const BaseModel = require('./BaseModel');


function Employee() {

    var EmployeeSchema = {
        name: 'string',
        occupation: 'string'
    }


    var EmployeeModel = new BaseModel('employees', EmployeeSchema)

    /*
    Can overwrite employee class here

    ex:

    employeeCollection.hooks.beforeUpdate = function(){...}
    */


    return EmployeeModel;
}


module.exports = Employee();
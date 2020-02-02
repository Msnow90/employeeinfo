function isDataTypesEnforced(schema, objToValidate) {

    var propertyNamesOfSchema = Object.keys(schema); // returns an array of property names
    var possibleErrors = [];

    propertyNamesOfSchema.forEach(prop => {
        var datatype = schema[prop];

        // would add more datatypes, but I'm just showing proof of concept
        switch(datatype) {
            case 'string':
                if (typeof objToValidate[prop] != datatype)
                    possibleErrors.push(`Property '${prop}' is not of data type: ${datatype}.`);
                break;
            
            case 'array':
                if (!Array.isArray(objToValidate[prop]))
                    possibleErrors.push(`Property '${prop}' is not of data type: ${datatype}.`);
                break;
        }

    })

    if (possibleErrors.length == 0)
        return true;

    return possibleErrors;
}


module.exports = isDataTypesEnforced;
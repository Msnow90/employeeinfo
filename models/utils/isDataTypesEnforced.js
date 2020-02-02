function isDataTypesEnforced(schema, objToValidate) {

    var propertyNamesOfSchema = Object.keys(schema); // returns an array of property names
    var possibleErrors = [];

    propertyNamesOfSchema.forEach(prop => {
        var datatype = schema[prop];

        if (typeof objToValidate[prop] != datatype)
            possibleErrors.push(`Property '${prop}' is not of data type: ${datatype}.`)
    })

    if (possibleErrors.length == 0)
        return true;

    return possibleErrors;
}


module.exports = isDataTypesEnforced;
const mongo = require('mongodb').MongoClient;

const config = require('../config');
const dbUrl = (process.env.NODE_ENV == 'develop') ? config.devDBUrl : config.prodDBUrl;


// ========= Utils Functions ============== //
const getCollection = require('./utils/connection').getCollection;

const _isDataTypesEnforced = require('./utils/isDataTypesEnforced'); // validates all specified property and datatypes for each object



/*
Params:
@collectionName - refers to string name of collection
@schema - is an object which contains datatypes for all possible fields of documents to be enforced

returns - A promise which resolves to our reformatted 'NewModel' object
*/

function BaseModel(collectionName, schema) {

    var collection = function () {
        return getCollection(collectionName)
    };

    /*
    Can overwrite the original collection object here
    */

    this.schema = schema; // will create a new instance of base model in specific models
    
    this.hooks = {
        beforeCreate: (obj) => {
            // will return an array of errors if any, or true if passed
            var didPassOrErrors = _isDataTypesEnforced(this.schema, obj);
            
            if (didPassOrErrors != true)
                throw new Error(didPassOrErrors);
        },

        beforeUpdate: () => {

        },

        beforeDelete: () => {

        },

        beforeCreateMany: () => {

        },

        beforeUpdateMany: () => {

        },

        beforeDeleteMany: () => {

        }
    }


    var NewModel = {

        find: (query, cb) => {
            collection().find(query).toArray((err, result) => handleCb(err, result, cb));
        },

        findOne: (query, cb) => {
            collection().findOne(query, (err, result) => handleCb(err, result, cb));
        },

        createOne: (obj, cb) => {
            this.hooks.beforeCreate(obj);
            collection().insertOne(obj, (err, result) => handleCb(err, result, cb));
        },

        updateOne: (query, newObj, cb) => {
            this.hooks.beforeUpdate(query, newObj);
            collection().updateOne(query, {$set: newObj}, (err, result) => handleCb(err, result, cb));
        },

        deleteOne: (query, cb) => {
            this.hooks.beforeDelete(query);
            collection().deleteOne(query, (err, result) => handleCb(err, result, cb));
        },

        updateMany: (query, newObj, cb) => {
            this.hooks.beforeUpdateMany(query, newObj);
            collection().updateMany(query, newObj, (err, result) => handleCb(err, result, cb));
        },

        createMany: (objsArr, cb) => {
            this.hooks.beforeCreateMany(objsArr);
            collection().insertMany(objsArr, (err, result) => handleCb(err, result, cb));
        },

        deleteMany: (query, cb) => {
            this.hooks.beforeDeleteMany(query);
            collection().deleteMany(query, (err, result) => handleCb(err, result, cb));
        },
    }


    function handleCb(err, result, cb) {
        if (err)
            return cb(err, null);
        else
            return cb(null, result);
    }



    return NewModel;
}

module.exports = BaseModel;

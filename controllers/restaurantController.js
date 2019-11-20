const Db = require('mongodb').Db;
const MongoClient = require('mongodb').MongoClient;
const propertiesReader = require('properties-reader');
const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');

var properties = propertiesReader('./properties/constants.properties');
const dataBaseRoute = properties.get('main.mongo.dataBaseRoute');
const ingenieriaCollection = properties.get('main.mongo.Ingenieria');

const eventos = properties.get('main.mongo.eventos');

module.exports.create = (jsonRecord) => {
    return createEvent(jsonRecord);
};

async function createEvent(deviceRecord) {
    console.log(deviceRecord.name)
    MongoClient.connect(dataBaseRoute, {
            native_parser: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        function(err, client) {
            if (err) throw err;
            var db = client.db(ingenieriaCollection);
            db.collection('eventos').insertOne({
                    name: deviceRecord.name,
                    place: deviceRecord.place
                },
                (err, resultado) => {
                    let result = {};
                    if (err) {
                        result.response = 0;
                        result.message = `Error al crear el usuario ${err}`
                            //In case of an error
                        return (result);
                    } else {
                        result.response = 1;
                        result.message = `Record creado exitosamente`
                            //Return the new result
                        return (result);
                    }

                });
            client.close();
        });

}
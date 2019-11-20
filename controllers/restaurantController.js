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
    return createRestaurant(jsonRecord);
};

async function createRestaurant(deviceRecord) {
    MongoClient.connect(dataBaseRoute, {
            native_parser: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        function(err, client) {
            if (err) throw err;
            var db = client.db(ingenieriaCollection);
            db.collection('participantes').insertOne({
                    nickname: deviceRecord.nickname,
                    password: deviceRecord.password,
                    name: deviceRecord.name,
                    address: deviceRecord.address,
                    phone: deviceRecord.phone,
                    city: deviceRecord.city,
                    product: deviceRecord.product,
                    price: deviceRecord.price,
                    event: deviceRecord.event
                },
                (err, resultado) => {
                    let result = {};
                    if (err) {
                        result.response = 0;
                        result.message = `Error al crear el participante ${err}`
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
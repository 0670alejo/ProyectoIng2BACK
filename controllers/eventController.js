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
        function (err, client) {
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

module.exports.list = (jsonUser) => {

    return new Promise((resolve, reject) => {

        MongoClient.connect(dataBaseRoute, {
            native_parser: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
            function (err, client) {
                if (err) throw err;

                var db = client.db(ingenieriaCollection);

                let result = {};
                db.collection('eventos').find({
                    // 'time': {
                    //     '$gte': isoString
                    // }
                }).limit(50).toArray(function (err, docs) {

                    if (err) {
                        result.response = 0;
                        result.message = `Error al buscar records  ${err}`
                        client.close();
                        //In case of an error
                        reject(result);
                    } else if (docs.length === 0) {
                        result.response = -1,
                            result.message = 'No existen warnings en la BD'
                        client.close();
                        reject(result)
                    } else {
                        result.response = 1;
                        result.data = docs;
                        result.message = `Records encontrados exitosamente`
                        //Return the new result
                        client.close();
                        resolve(result);

                    }

                });
            });

    });
}

module.exports.delete = (jsonRecord) => {
    return deleteEvent(jsonRecord);
};

async function deleteEvent(deviceRecord) {
    console.log(deviceRecord.name)
    MongoClient.connect(dataBaseRoute, {
        native_parser: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
        function (err, client) {
            if (err) throw err;
            var db = client.db(ingenieriaCollection);
            db.collection('eventos').deleteOne({
                name: deviceRecord.name,
            },
                (err, resultado) => {
                    let result = {};
                    if (err) {
                        result.response = 0;
                        result.message = `Error al borrar el usuario ${err}`
                        //In case of an error
                        return (result);
                    } else {
                        result.response = 1;
                        result.message = `Record borrado exitosamente`
                        //Return the new result
                        return (result);
                    }

                });
            client.close();
        });

}

module.exports.update = (jsonRecord) => {
    return updateEvent(jsonRecord);
};

async function updateEvent(deviceRecord) {
    MongoClient.connect(dataBaseRoute, {
        native_parser: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
        function (err, client) {
            if (err) throw err;
            var db = client.db(ingenieriaCollection);
            db.collection('eventos').updateOne({
                name: deviceRecord.name,
            }, { $set: { "place": deviceRecord.place } },
                (err, resultado) => {
                    let result = {};
                    if (err) {
                        result.response = 0;
                        result.message = `Error al borrar el usuario ${err}`
                        //In case of an error
                        return (result);
                    } else {
                        result.response = 1;
                        result.message = `Record borrado exitosamente`
                        //Return the new result
                        return (result);
                    }

                });
            client.close();
        });

}
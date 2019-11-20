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


module.exports.list = (jsonUser) => {

    return new Promise((resolve, reject) => {

        MongoClient.connect(dataBaseRoute, {
                native_parser: true,
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            function(err, client) {
                if (err) throw err;

                var db = client.db(ingenieriaCollection);

                let result = {};
                db.collection('participantes').find({
                    // 'time': {
                    //     '$gte': isoString
                    // }
                }).limit(50).toArray(function(err, docs) {

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
    return deleteRestaurant(jsonRecord);
};

async function deleteRestaurant(deviceRecord) {
    console.log(deviceRecord.name)
    MongoClient.connect(dataBaseRoute, {
            native_parser: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        function(err, client) {
            if (err) throw err;
            var db = client.db(ingenieriaCollection);
            db.collection('participantes').deleteOne({
                    name: deviceRecord.name,
                },
                (err, resultado) => {
                    let result = {};
                    if (err) {
                        result.response = 0;
                        result.message = `Error al borrar el participante ${err}`
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
    return updateRestaurante(jsonRecord);
};

async function updateRestaurante(deviceRecord) {
    MongoClient.connect(dataBaseRoute, {
            native_parser: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        function(err, client) {
            if (err) throw err;
            var db = client.participantes(ingenieriaCollection);
            db.collection('participantes').updateOne({
                    nickname: deviceRecord.nickname,
                    password: deviceRecord.password,
                    name: deviceRecord.name,
                    address: deviceRecord.address,
                    phone: deviceRecord.phone,
                    city: deviceRecord.city,
                    product: deviceRecord.product,
                    price: deviceRecord.price,
                    event: deviceRecord.event
                }, {
                    $set: {
                        "nickname": deviceRecord.nickname,
                        "password": deviceRecord.password,
                        "name": deviceRecord.name,
                        "address": deviceRecord.address,
                        "phone": deviceRecord.phone,
                        "city": deviceRecord.city,
                        "product": deviceRecord.product,
                        "price": deviceRecord.price,
                        "event": deviceRecord.event
                    }
                },
                (err, resultado) => {
                    let result = {};
                    if (err) {
                        result.response = 0;
                        result.message = `Error al actualizar el participante ${err}`
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
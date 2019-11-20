const express = require('express')
const app = express()
const bodyParser = require('body-parser');

const eventController = require('../controllers/eventController.js');


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});

//Middleware to recieve big files and prevent problems
app.use(bodyParser.json({
    limit: "50mb"
}));
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
}));

app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies

app.use(express.static(__dirname + '/static', {
    dotfiles: 'allow'
}))

app.listen(3001, () => {
    console.log('Started on port 3001');
});

app.post('/saveEvent', function (req, res) {
    let result = eventController.create(req.body);

    res.send(JSON.stringify(result, null, 2));
});

app.post('/listEvents', function (req, res) {
    eventController.list(req.body).then((result) => {
        res.status(201).send({
            result
        })
    }).catch(function (e) {
        res.status(422).send({
            e
        });
    });

});

app.post('/deleteEvent', function (req, res) {
    let result = eventController.delete(req.body);
    res.send(JSON.stringify(result, null, 2));
});

app.post('/updateEvent', function (req, res) {
    let result = eventController.update(req.body);
    res.send(JSON.stringify(result, null, 2));
});
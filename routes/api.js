var express = require('express');
var router = express.Router();
const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/beers';
var client = new pg.Client(connectionString);


var queryMap = {};
queryMap["beer"] = {
    "GET": "SELECT * FROM beer",
    "POST": "INSERT INTO beer (name, type) VALUES ($1, $2)"
};
queryMap["brewery"] = {
    "GET": "SELECT * FROM brewery",
    "POST": "INSERT INTO brewery (name, established) VALUES ($1, $2)"
};

function getResult(query, res) {
    client.connect(function(err) {
        if (err) throw err;
        client.query(query, function(err, result) {
            if (err) throw err;
            res.send(result["rows"]);
        });
    })
};

function postResult(query, arr, res) {
    client.connect(function (err, client, done) {
        if (err) throw err;
        client.query(query, arr);
        res.send("POST Okay");
    });
}

router.get('/', function(req, res, next) {
    res.send("Default entry to API");
});


router.get('/beers', function(req, res, next) {
    getResult(queryMap["beer"]["GET"], res);
});

router.post('/beers', function(req, res, next) {
    const data = {name: req.body.name, type: req.body.type};
    postResult(queryMap["beer"]["POST"], [data.name, data.type], res);
});

router.get('/brewery', function(req, res, next) {
    getResult(queryMap["brewery"]["GET"], res);
});

router.post('/brewery', function(req, res, next) {
    const data = {name: req.body.name, established: req.body.established};
    postResult(queryMap["brewery"]["POST"], [data.name, data.established], res);
});

module.exports = router;

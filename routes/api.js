var express = require('express');
var router = express.Router();
const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/beers';
var config = {
  user: 'Doko', //env var: PGUSER 
  database: 'beers', //env var: PGDATABASE 
  host: 'localhost', // Server hosting the postgres database 
  port: 5432, //env var: PGPORT 
  max: 10, // max number of clients in the pool 
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed 
};
var pool = new pg.Pool(config);


var queryMap = {};
queryMap["beer"] = {
    "GET": "SELECT * FROM beer where id=$1",
    "POST": "INSERT INTO beer (name, type) VALUES ($1, $2) returning id"
};
queryMap["brewery"] = {
    "GET": "SELECT * FROM brewery where id=$1",
    "POST": "INSERT INTO brewery (name, established) VALUES ($1, $2) returning id"
};

function getResult(query, res, id) {
    pool.connect(function(err, client, done) {
        if (err) throw err;
        client.query(query, [id], function(error, result) {
            if (error) throw error;
            res.send(result["rows"]);
        });
    })
};

function postResult(query, arr, res) {
    client.connect(function (err, client, done) {
        if (err) throw err;
        client.query(query, arr, function(error, result) {
            if (error) throw error;
            console.log(result);
        });
        res.send("POST Okay");
    });
}

router.get('/', function(req, res, next) {
    res.send("Default entry to API");
});


router.get('/beers', function(req, res, next) {
    res.send("Get entry to Beers");
});

router.post('/beers', function(req, res, next) {
    const data = {name: req.body.name, type: req.body.type};
    postResult(queryMap["beer"]["POST"], [data.name, data.type], res);
});

router.get("/beers/:id", function(req, res) {
    getResult(queryMap["beer"]["GET"], res, req.params.id);
});

router.get('/brewery', function(req, res, next) {
    getResult(queryMap["brewery"]["GET"], res, req.params.id);
});

router.post('/brewery', function(req, res, next) {
    const data = {name: req.body.name, established: req.body.established};
    postResult(queryMap["brewery"]["POST"], [data.name, data.established], res);
});

module.exports = router;

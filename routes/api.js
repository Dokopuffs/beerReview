var express = require('express');
var router = express.Router();
const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/beers';
var client = new pg.Client(connectionString);

function getResult(query, res) {
    client.connect(function(err) {
        if (err) throw err;
        client.query(query, function(err, result) {
            if (err) throw err;
            res.send(result["rows"]);
        });
    })
};

/* GET home page. */
router.get('/beers', function(req, res, next) {
    getResult("SELECT * FROM beer", res);
});

router.post('/beers', function(req, res, next) {
    const data = {name: req.body.name, type: req.body.type};
    client.connect(function (err, client, done) {
        if (err) throw err;
        client.query("INSERT INTO beer (name, type) VALUES ($1, $2)", [data.name, data.type]);
        res.send("POST Okay");
    });
});

module.exports = router;

const pg = require('pg');
var client = new pg.Client();


var execQuery = function(query) {
    client.query(query, function(err, result) {
        if (err) throw err;
        console.log(result);
    });
};

client.connect( function(err) {
    if (err) throw err;
    
});
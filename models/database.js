/**
 * Objects:
 *  Beer: Name, Type
 *  Brewery: Name, Established
 *  User: Name, Created
 * 
 * Relations:
 *  Beer <> Brewery: First brewed
 *  User <> Beer: Description, Rating
 */

const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/beers';
var client = new pg.Client(connectionString);

var execQuery = function(query) {
    client.query(query, function(err, result) {
        console.log(query);
        if (err) throw err;
        console.log(result);
    });
};

client.connect();
console.log("Starting creating tables...");
execQuery("CREATE TABLE beer(id SERIAL PRIMARY KEY, name VARCHAR(30) NOT NULL, type VARCHAR(30))");
execQuery("CREATE TABLE brewery(id SERIAL PRIMARY KEY, name VARCHAR(30) NOT NULL, established INTERVAL YEAR, location VARCHAR(30))");
execQuery("CREATE TABLE users(id SERIAL PRIMARY KEY, name VARCHAR(30) NOT NULL, created TIMESTAMP)");
execQuery("CREATE TABLE brewed(beer_id INTEGER REFERENCES beer (id), brewery_id INTEGER REFERENCES brewery (id), first_brewed DATE, PRIMARY KEY (beer_id, brewery_id))");
execQuery("CREATE TABLE post(id SERIAL PRIMARY KEY, description TEXT NOT NULL, rating INTEGER, user_id INTEGER REFERENCES users (id), beer_id INTEGER REFERENCES beer (id))");
console.log("Finished creating tables");
client.end();
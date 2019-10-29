const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createPool({ //conect to your mysql database here
  host     : "crimespot.col5uuryj2bd.us-west-1.rds.amazonaws.com",
  user     : "admin",
  password : "crimespotadmin",
  port     : "3306",
  database : 'CrimeSpot'
});


const app = express();
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));
app.get('/ParkingViolations', function (req, res) {
    connection.getConnection(function (err, connection) {
        if(err) throw err;
    connection.query('SELECT latitude, longitude FROM ParkingViolations', function (error, results, fields) { //run mysql query here
      if (error) throw error;
      res.send(results)
    });
  });
});
app.get('/Danger', function (req, res) {
  connection.getConnection(function (err, connection) {
      if(err) throw err;
  connection.query('SELECT latitude, longitude FROM Assault\
                    UNION SELECT latitude, longitude FROM AssaultDW\
                    UNION SELECT latitude, longitude FROM SexualAssault\
                    UNION SELECT latitude, longitude FROM Kidnapping\
                    UNION SELECT latitude, longitude FROM WeaponsOffense', function (error, results, fields) { //run mysql query here
    if (error) throw error;
    res.send(results)
  });
});
});
app.get('/Theft', function (req, res) {
  connection.getConnection(function (err, connection) {
      if(err) throw err;
      connection.query('SELECT latitude, longitude FROM Theft\
                        UNION SELECT latitude, longitude FROM TheftofVehicle\
                        UNION SELECT latitude, longitude FROM TheftfromVehicle\
                        UNION SELECT latitude, longitude FROM Robbery\
                        UNION SELECT latitude, longitude FROM BreakingEntering', function (error, results, fields) { //run mysql query here
    if (error) throw error;
      res.send(results)
    });
  });
});

app.listen(process.env.PORT || 3000, () => {
 console.log('routes.js is running');
});


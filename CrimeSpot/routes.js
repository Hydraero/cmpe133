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
                    UNION SELECT latitude, longitude FROM Robbery\
                    UNION SELECT latitude, longitude FROM SexualAssault\
                    UNION SELECT latitude, longitude FROM Theft\
                    UNION SELECT latitude, longitude FROM WeaponsOffense', function (error, results, fields) { //run mysql query here
    if (error) throw error;
    res.send(results)
  });
});
});

app.listen(3000, () => {
 console.log('Go to http://localhost:3000/[crimetype] so you can see the data.');
});

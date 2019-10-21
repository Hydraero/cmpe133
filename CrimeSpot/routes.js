const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createPool({ //conect to your mysql database here
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'CrimeData'
});


const app = express();
app.get('/CrimeData', function (req, res) {
    connection.getConnection(function (err, connection) {
        if(err) throw err;
    connection.query('SELECT latitude, longitude FROM ParkingViolations', function (error, results, fields) { //run mysql query here
      if (error) throw error;
      res.send(results)
    });
  });
});

app.listen(3000, () => {
 console.log('Go to http://localhost:3000/CrimeData so you can see the data.');
});

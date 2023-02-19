var http = require('http');
var path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const cron = require('node-cron');
const haversine = require('haversine')

const deviceRouter = require('./routes/device-router');
const db = require('./db/conn');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({
  origin: 'localhost:3000'
}));
app.use(bodyParser.json())

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    res.render('index.jade');
    
})

app.use('/api', deviceRouter);



app.listen(3000, () => {
  console.log(`Server running on port 3000`)

})


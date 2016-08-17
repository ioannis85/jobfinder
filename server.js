'use strict';
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jobModel = require('./models/job');
const config = require('./config.'+(process.env.NODE_ENV||"js"));

app.set('views',__dirname);
app.set('view engine','jade');
app.use(express.static(__dirname + '/public'));
app.get('/api/jobs',(req,res) => {
 jobModel.model.find({},(req, collection) => {
    res.send(collection);
 });

});
app.get('*',(req,res) => {
res.render('index');
});



const port = config.port;
mongoose.connect(config.mongoUrl);
const connection = mongoose.connection;
connection.once('open',() => {
  console.log('connected succesfully');
  jobModel.seedJobs();
});

app.listen(port,function(){
  console.log(config);
  console.log(config.port);
console.log('server is up!!!');
});

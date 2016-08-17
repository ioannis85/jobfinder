'use strict';
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jobModel = require('./models/job');


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

const port = process.env.PORT || 3000;
const host = process.env.IP || '127.0.0.1';

mongoose.connect('mongodb://admin:1234@ds161475.mlab.com:61475/jobfindertest');
const connection = mongoose.connection;
connection.once('open',() => {
  console.log('connected succesfully');
  jobModel.seedJobs();
});

app.listen(port,function(){
  console.log(port);
  console.log(host);
console.log('server is up!!!');
});

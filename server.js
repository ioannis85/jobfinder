'use strict';
var express = require('express');
var app = express();
var jobModel = require('./models/job');
var config = require('./config.'+(process.env.NODE_ENV||"js"));
var jobsData = require('./jobs-data');


app.set('views', __dirname);
app.set('view engine','jade');
app.use(express.static(__dirname + '/public'));

app.get('/api/jobs',(req,res) => {

  jobsData.findJobs().then((collection)=>{
    res.send(collection);
  })
});

app.get('*',(req,res) => {
  res.render('index');
});

var port = config.port;

jobsData.connectDB(config.mongoUrl).then(()=>{
  console.log('connected succesfully');
  jobsData.seedJobs();
})

app.listen(port,function(){
  console.log(config);
  console.log(config.port);
  console.log('server is up!!!');
});

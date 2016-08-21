'use strict';
var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = Promise;

var Job =   mongoose.model('Job');

function findJobs(query){
  return new Promise((resolve, reject) => {
    Job.find(query||{}).exec((err, collection) =>{
      if(err){
        reject(err);
      }
      resolve(collection);
    });
  });
}
module.exports.findJobs = findJobs;

module.exports.connectDB = (url)=>{
return mongoose.connect(url);
}

var jobs = [ {title:'Cook', description : 'You will be making bagels'},
        {title:'Programmer', description : 'Node Programmer'},
        {title:'Programmer', description : 'sr. Software developer C#'},
          {title:'Programmer', description : 'sr. Software developer Go'}
  ];

  module.exports.seedJobs = () => {
    return new Promise((resolve, reject) => {
    Job.find({})
      .exec((error, collection) => {
        if(collection.length === 0){
          Promise.map(jobs,(job)=>{
            Job.create(job)
            .catch((err)=> reject(err));
          })
          .then(()=> {
            resolve();
          });
        }
      });
    });
  }

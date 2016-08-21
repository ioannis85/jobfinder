'use strict';
const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;

const Job =   mongoose.model('Job');

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

const jobs = [ {title:'Cook', description : 'You will be making bagels'},
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

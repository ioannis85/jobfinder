'use strict';
const expect = require('chai').expect;
const mongoose = require('mongoose');
const jobModel = require('../models/job');
const Promise = require('bluebird');
mongoose.Promise = Promise;

function resetJobs(){
  return  mongoose.connection.collections['jobs'].drop();
}

function findJobs(query){
  return new Promise((resolve, reject) => {
    jobModel.model.find(query).exec((err, collection) =>{
      if(err){
        reject(err);
      }
      resolve(collection);
    });
  });
}


describe('get jobs',()=>{

  let jobs;

  before((done)=>{
    mongoose.connect('mongodb://localhost/jobfinder')
    .then(resetJobs)
    .then(jobModel.seedJobs)
    .then(findJobs)
    .then((jobList)=>{
      jobs = jobList;
      done();
    });
  });

  it('Should never be empty since jobs are seeded',()=>{
      expect(jobs.length).to.be.at.least(1);
  });

  it('Must has a title',()=>{
    expect(jobs[0].title).to.not.be.empty;
  });

  it('Must has a description',()=>{
    expect(jobs[0].description).to.not.be.empty;
  });

});

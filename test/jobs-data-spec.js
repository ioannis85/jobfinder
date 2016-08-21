'use strict';
var expect = require('chai').expect;
var mongoose = require('mongoose');
var jobModel = require('../models/job');
var Promise = require('bluebird');
var jobsData = require('../jobs-data');
mongoose.Promise = Promise;

function resetJobs(){
  return new Promise((resolve, reject) => {
      mongoose.connection.collections['jobs'].drop(resolve, reject);
  });
}

describe('get jobs',()=>{
  var jobs;
  before((done)=>{
    jobsData.connectDB('mongodb://localhost/jobfinder')
   .then(resetJobs)
    .then(jobsData.seedJobs)
    .then(jobsData.findJobs)
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

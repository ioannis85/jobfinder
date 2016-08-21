'use strict';
const expect = require('chai').expect;
const mongoose = require('mongoose');
const jobModel = require('../models/job');
const Promise = require('bluebird');
const jobsData = require('../jobs-data');
mongoose.Promise = Promise;

function resetJobs(){
  return  mongoose.connection.collections['jobs'].drop();
}

describe('get jobs',()=>{
  let jobs;
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

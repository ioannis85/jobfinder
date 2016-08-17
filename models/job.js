'use strict';

const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
title : {type:String},
description :{ type: String}
});

const Job = mongoose.model('Job',jobSchema);
exports.model = Job;
exports.seedJobs = () => {
  Job.find({}).exec((error, collection) => {
    if(collection.length === 0){
      Job.create({title:'Cook', description : 'You will be making bagels'});
      Job.create({title:'Programmer', description : 'Node Programmer'});
      Job.create({title:'Programmer', description : 'sr. Software developer C#'});
    }
  });
};
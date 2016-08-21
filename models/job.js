'use strict';
const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;
const jobSchema = mongoose.Schema({
title : {type:String},
description :{ type: String}
});
mongoose.model('Job',jobSchema);

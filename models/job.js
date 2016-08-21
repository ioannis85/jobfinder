'use strict';
var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = Promise;
var jobSchema = mongoose.Schema({
title : {type:String},
description :{ type: String}
});
mongoose.model('Job',jobSchema);

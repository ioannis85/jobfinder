'use strict';
const express = require('express');
const app = express();

app.set('views',__dirname);
app.set('view engine','jade');
app.use(express.static(__dirname + '/public'));
app.get('*',(req,res) => {
res.render('index');
});

app.listen(3000,function(){
console.log('server is up!!!');
});

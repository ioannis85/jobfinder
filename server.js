'use strict';
const express = require('express');
const app = express();

app.set('views',__dirname);
app.set('view engine','jade');
app.use(express.static(__dirname + '/public'));
app.get('*',(req,res) => {
res.render('index');
});

const port = process.env.PORT || 3000;
const host = process.env.IP || '127.0.0.1';

app.listen(port,host,function(){
  console.log(port);
  console.log(host);
console.log('server is up!!!');
});

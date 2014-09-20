var fs = require('fs');
var json = JSON.parse(fs.readFileSync('config.txt'));
var port = json.Port;
var host = json.Host;
var express = require('express');
var callerCatDetails = require('./caller.js');


var app = express.createServer();
app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(__dirname + '/views/html_pages'));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine','jade');

app.get("/",function(request,response){
	response.render('index.html');
});

app.get("/home",function(request,response){
	var username = request.query['username'];
	var password = request.query['password'];
	callerCatDetails.getEntireDetails(username,password,function(Results){
		console.log(Results);		
		response.render('mapTest',{Results:Results,username:username});
		//response.json(Results);
	});
});

app.listen(port,host);
var express=require("express");
var bodyParser=require("body-parser");


const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Mediplus');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})

var app=express()


app.use(bodyParser.json());
app.use(express.static('src'));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.post('/sign_up', function(req,res){
	var name = req.body.name;
	var email =req.body.email;
	var date = req.body.date;
	var phone =req.body.phone;
	var msg =req.body.msg;

	var data = {
		"name": name,
		"email":email,
		"date":date,
		"phone":phone,
		"msg":msg
	}
db.collection('details').insertOne(data,function(err, collection){
		if (err) throw err;
		console.log("Record inserted Successfully");
	});
		
	return res.redirect('doctorloginpage.html');
})


app.get('/',function(req,res){
res.set({
	'Access-control-Allow-Origin': '*'
	});
return res.redirect('index.html');
}).listen(3000)


console.log("server listening at port 3000");
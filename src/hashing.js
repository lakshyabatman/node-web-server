const {SHA256}= require('crypto-js');
const jwt=require('jsonwebtoken');
 
var message= "I am batman";
var hash= SHA256(message).toString();

console.log(hash);
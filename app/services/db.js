const mysql = require('mysql');
const config = require('../../db_config');

const connection = mysql.createConnection(config.db);
connection.connect(function(err) {  
  if (err){
  	console.log(err)
  	return false;
  } //throw err;  
  console.log("Connected!");  
});
module.exports = {
  connection
}
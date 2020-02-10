var mysql = require('mysql');


var connect1 = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'hrm3'
});

connect1.connect(function(err) {
    if (err) throw err;
});

module.exports = connect1;
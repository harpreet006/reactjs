class Users{
	constructor(email,password){
		this.userEmail = email;
		this.userPassword = password;
	}

	addUser(firstName,lastName,email,password,premission){
		let sql = `INSERT INTO users (firstname,lastname,email,password,premission,role) VALUES ('${firstName}','${lastName}','${email}','${password}','${premission}','User')`;
		return sql;
	}
	getUsers(){
		let sql = `SELECT * FROM users ORDER BY id DESC`;
		return sql;
	}

	deleteUser(userId){
		let sql = `DELETE FROM users WHERE id=${userId}`;
		return sql;
	}
	userLogin(email,password){
		let sql = `SELECT * FROM users WHERE email='${email}'`;
		return sql;
	}

	forgotPassword(email,password){
		let sql = `SELECT * FROM users WHERE email='${email}'`;
		return sql;
	}

	userRole(userId){
		let sql = `SELECT * FROM users WHERE id=${userId}`;
		return sql;
	}
	
}

module.exports = Users;

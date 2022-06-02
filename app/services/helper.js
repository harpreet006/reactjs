const bcrypt = require('bcryptjs');


module.exports = {
	generateHash:function(password){
	    return bcrypt.hashSync(password,bcrypt.genSaltSync(8));
	},
	authentication:function(session){
		if((session.userInfo && session.userInfo.loggedin===true) && (session.userInfo &&session.userInfo.loggedin !="")){
			return true;
		}else{
			return false;
		}
	},
}

var _mm = require('util/mm.js')
var user = {
	logout: function(resolve,reject){
		_mm.request({
			url 	:_mm.getServerURL('user/logout.do'),
			method	:'POST',
			success	:resolve,
			error	:reject
		})
	},
	checkLogin: function(resolve,reject){
		_mm.request({
			url:_mm.getServerURL('user/get_user_info.do'),
			method	:'POST',
			success	:resolve,
			error	:reject
		})
	},
	
}
module.exports = user;
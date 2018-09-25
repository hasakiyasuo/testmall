var _mm = require('util/mm.js')
var user = {
	login: function(data,resolve,reject){
		_mm.request({
			url 	:_mm.getServerURL('/user/login.do'),
			data	:data,
			method	:'POST',
			success	:resolve,
			error	:reject
		})
	},
	//登录状态下重置密码
	updatePassword:function(userInfo,resolve,reject){
		_mm.request({
			url 	:_mm.getServerURL('/user/reset_password.do'),
			data	:userInfo,
			method	:'POST',
			success	:resolve,
			error	:reject
		})
	},
	logout: function(resolve,reject){
		_mm.request({
			url 	:_mm.getServerURL('/user/logout.do'),
			method	:'POST',
			success	:resolve,
			error	:reject
		})
	},
	checkLogin: function(resolve,reject){
		_mm.request({
			url:_mm.getServerURL('/user/get_user_info.do'),
			method	:'POST',
			success	:resolve,
			error	:reject
		})
	},
	//检查用户名
	checkUserName: function(username,resolve,reject){
		_mm.request({
			url 	:_mm.getServerURL('/user/check_valid.do'),
			data	:{
				type:'username',
				str : username
			},
			method	:'POST',
			success	:resolve,
			error	:reject
		})
	},
	//注册接口
	register: function(userinfo,resolve,reject){
		_mm.request({
			url 	:_mm.getServerURL('/user/register.do'),
			data 	: userinfo,
			method	:'POST',
			success	:resolve,
			error	:reject
		})
	},
	//获取用户信息
	getUserInfo:function(resolve,reject){
		_mm.request({
			url 	:_mm.getServerURL('/user/get_information.do'),
			method	:'POST',
			success	:resolve,
			error	:reject
		})
	},
	//更新个人信息
	updateUserInfo:function(userInfo,resolve,reject){
		_mm.request({
			url 	:_mm.getServerURL('/user/update_information.do'),
			data	:userInfo,
			method	:'POST',
			success	:resolve,
			error	:reject
		})
	},
	//根据用户名获取用户问题接口
	getQuestion:function(username,resolve,reject){
		_mm.request({
			url 	:_mm.getServerURL('/user/forget_get_question.do'),
			data 	:username,
			method	:'POST',
			success	:resolve,
			error	:reject
		})
	},
	//检查密码提示问题答案
	checkAnswer:function(userInfo,resolve,reject){
		_mm.request({
			url 	:_mm.getServerURL('/user/forget_check_answer.do'),
			data 	: userInfo,
			method	:'POST',
			success	:resolve,
			error	:reject
		})
	},
	resetPassword:function(userInfo,resolve,reject){
		_mm.request({
			url 	:_mm.getServerURL('/user/forget_reset_password.do'),
			data 	: userInfo,
			method	:'POST',
			success	:resolve,
			error	:reject
		})
	},
	
}
module.exports = user;
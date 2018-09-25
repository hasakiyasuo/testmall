require('page/common/nav-simple/index.js')
require('page/common/footer/index.js')
require('page/common/nav/index.js')
require('./index.css')
var pass = require('./index.css')
var navSide = require('page/common/nav-side/index.js')
var _mm = require('util/mm.js')
var _user = require('service/user-service.js')
var header = require('page/common/header/index.js')


var page= {
	init			: function(){
		this.onLoad();
		this.bindEvent();

	},
	onLoad :function(){
		navSide.init({
			name:'user-pass-update'
		});
		// this.loadUserInfo();
	},
	//添加编辑按钮
	bindEvent: function(){
		var _this = this
		$(document).on('click','.btn-submit',function(){
			
			var userInfo = {
				password		: 	$.trim($('#password').val()),
				passwordNew		: 	$.trim($('#password-new').val()),
				passwordConfirm	: 	$.trim($('#password-confirm').val()),
			}
			 validateResult = _this.validateForm(userInfo);			 
		 if(validateResult.status){
			_user.updatePassword({
					passwordOld : userInfo.password,
					passwordNew : userInfo.passwordNew
				},function(res,msg){
					_mm.successTips(msg)					
				},function(errMsg){
					alert(errMsg)
				})
			}
			else{
				_mm.errorTips(validateResult.msg)
			}
		})
	},
	//加载用户信息
	
	//验证字段信息
	validateForm:function(userInfo){
		var result = {
			staus : false,
			msg	  : " "
		}
		//验证密码不能为空
			if(!_mm.validate(userInfo.password,'require')){
			result.msg='原密码不能为空'
			return result
		};
		//验证新密码的长度
			if(!userInfo.passwordNew||userInfo.passwordNew.length<6){
			result.msg='密码长度不得小于6位'
			return result
			};
		//验证两次输入密码是否一致
			if(userInfo.passwordNew !== userInfo.passwordConfirm){
			result.msg='确认密码和输入密码不一致'
			return result
			};
		result.status = true;
		result.msg    = '验证通过';
		return result;
	}
};
$(function(){
	page.init();
});
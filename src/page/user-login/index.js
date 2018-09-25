'use strict'
require('page/common/nav-simple/index.js')
require('page/common/footer/index.js')
var _user = require('service/user-service.js')
var _mm = require('util/mm.js')
require('./index.css')
var formError= {
	show: function(errMsg){
		$('.error-item').show().find('.errmesg').text(errMsg)
	},
	hide: function(){
		$('.error-item').hide().find('.errmesg').text('')
	},
}

var page= {
	init			: function(){
		this.bindEvent();
	},
	bindEvent		: function(){
		//点击登录提交按钮
		var _this= this;
		$('#submit').click(function(){
			
			_this.submit();
		})
		//按下回车进行提交
		$(".user-content").keyup(function(e){
			if(e.keyCode === 13){
				_this.submit();
			}
		})
	},
	// //提交表单
	submit			: function(){
		var _this = this
		var formData 	= {
			username	: $.trim($('#username').val()),
			password	: $.trim($('#password').val())
		}
		
		var formResult 	= _this.formValidata(formData);
	
		if(formResult.status){

			_user.login(formData,function(err){
				
				window.location.href= _mm.getURLparam('redirect')||'./index.html'
			},function(errMsg){
				//错误提示
				formError.show(''+errMsg)
			})
		}
		//验证失败
		else{
			formError.show(formResult.msg)
		}

	},
	//表单字段验证
	formValidata	: function(formData){
	
		var result = {
			staus : false,
			msg	  : " "
		}
		if(!_mm.validate(formData.username,'require')){
			result.msg='用户名不能为空'
			return result
		}
		if(!_mm.validate(formData.password,'require')){
			result.msg='密码不能为空'
			return result
		}
		result.status = true;
		result.msg    = '验证通过';
		return result;
	}
};
$(function(){
	page.init();
});
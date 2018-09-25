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
		//点击注册提交按钮
		var _this= this;
		//验证username
		$("#username").blur(function(){

			var username = $.trim($(this).val());
			//如果用户名为空不做验证
			if(!username){
				return;
			}
			
			_user.checkUserName(username,function(msg){
				
				formError.hide()
			},function(errMsg){
				formError.show(errMsg)
			})
		})
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
			username		: $.trim($('#username').val()),
			password		: $.trim($('#password').val()),
			passwordConfirm	: $.trim($('#password-confirm').val()),
			phone			: $.trim($('#phone').val()),
			email			: $.trim($('#email').val()),
			question		: $.trim($('#question').val()),
			answer			: $.trim($('#answer').val()),

		}
		
		var formResult 	= _this.formValidata(formData);
	
		if(formResult.status){

			_user.register(formData,function(err){
				
				window.location.href='./result.html?type=register';
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
		};
		if(!_mm.validate(formData.password,'require')){
			result.msg='密码不能为空'
			return result
		};
		if(!_mm.validate(formData.passwordConfirm,'require')){
			result.msg='确认密码不能为空'
			return result
		};
		if(formData.passwordConfirm!==formData.password){
			result.msg='输入密码不一致'
			return result
		}
		if(!_mm.validate(formData.email,'email')){
			result.msg='邮箱格式错误'
			return result
		}
		if(!_mm.validate(formData.phone,'phone')){
			result.msg='手机格式错误'
			return result
		}
		if(!_mm.validate(formData.question,'require')){
			result.msg='密码问题不能为空'
			return result
		}
		if(!_mm.validate(formData.answer,'require')){
			result.msg='密码问题答案不能为空'
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
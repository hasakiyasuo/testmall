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
	data:{
		username:'',
		question:'',
		answer	:'',
		token	:''
	},
	init			: function(){
		this.onload();
		this.bindEvent();
	},
	onload			: function(){
		this.loadStepUsername();
	},
	bindEvent		: function(){
		//点击登录提交按钮
		var _this= this;
		//输入用户名按钮的点击
		$("#submit-username").click(function(){
			var username=$.trim($("#username").val());
			if(username){
				console.log(username)
				_user.getQuestion({username},function(res){
					_this.data.username = username;
					_this.data.question = res;
					console.log(_this.data.question)
					_this.loadStepQuestion();
				},function(errMsg){
					console.log(errMsg)
					formError.show(errMsg)

				})
			}
			else{
				formError.show('请输入正确的用户名')
			}
		})
		//输入密码提示问题的点击
		$("#submit-question").click(function(){
			var answer=$.trim($("#question").val());
			if(answer){
				_user.checkAnswer({
					username:_this.data.username,
					question:_this.data.question,
					answer 	:answer
				},function(res){
					_this.data.answer = answer;
					_this.data.token  = res;
					_this.loadStepPassword();
				},function(errMsg){
					formError.show(errMsg)

				})
			}
			else{
				formError.show('请输入正确的用户名')
			}
		})
		//输入新密码后的按钮点击
		$("#submit-password").click(function(){
			var password=$.trim($("#password").val());
			//密码不为空
			if(password &&password.length>=6){
				_user.resetPassword({
					username 	:_this.data.username,
					passwordNew	:password,
					forgetToken :_this.data.token
				},function(res){
					window.location.href = "./result.html?type=pass-reset"
				},function(errMsg){
					formError.show(errMsg)

				})
			}
			else{
				formError.show('请输入不少于6位的新密码')
			}
		})
	},
	//加载输入用户名验证
	loadStepUsername  	:function(){
		$(".step-username").show()
	},
	//根据用户名和提示问题进行下一步
	loadStepQuestion	:function(){
		formError.hide();
		$('.step-username').hide().siblings('.step-question').show().find('.question').text(this.data.question);

	},
	loadStepPassword 	:function(){
		formError.hide();
		$('.step-question').hide().siblings('.step-password').show();

	},
	

};
$(function(){
	page.init();
});
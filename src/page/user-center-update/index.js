require('page/common/nav-simple/index.js')
require('page/common/footer/index.js')
require('page/common/nav/index.js')
require('./index.css')
var navSide = require('page/common/nav-side/index.js')
var _mm = require('util/mm.js')
var _user = require('service/user-service.js')
var header = require('page/common/header/index.js')
var templateIndex = require('./index.string')
var page= {
	init			: function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad :function(){
		navSide.init({
			name:'user-center'
		});
		// this.loadUserInfo();
	},
	//添加编辑按钮
	bindEvent: function(){
		var _this = this
		$(document).on('click','.btn-submit',function(){
			
			var userInfo = {
				phone	: 	$.trim($('#phone').val()),
				email	: 	$.trim($('#email').val()),
				question: 	$.trim($('#question').val()),
				answer	: 	$.trim($('#answer').val()),
			}

			validateResult = _this.validateForm(userInfo);

			if(validateResult.status){
				_user.updateUserInfo(userInfo,function(res){
					_mm.successTips(res.msg)
					window.location.href = "./user-center.html"
				},function(errMsg){
					_mm.errorTips(errMsg)
				})
			}
			else{
				_mm.errorTips(validateResult.msg)
			}
		})
	},
	
	//验证字段信息
	validateForm:function(userInfo){
		var result = {
			staus : false,
			msg	  : " "
		}
		if(!_mm.validate(userInfo.phone,'phone')){
			result.msg='手机号格式错误'
			return result
		};
			if(!_mm.validate(userInfo.email,'email')){
			result.msg='邮箱格式错误'
			return result
		};
			if(!_mm.validate(userInfo.question,'require')){
			result.msg='问题不能为空'
			return result
		};
			if(!_mm.validate(userInfo.answer,'require')){
			result.msg='答案不能为空'
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
require('./index.css')
var _mm = require('util/mm.js')
var user = require('service/user-service.js')
var _cart = require('service/cart-service.js')
var _user = {
	init:function(){
		this.bindEvent();
		this.loadUserInfo();
		this.loadCartCount();
		return this;
	},
	//登录注册部分
	bindEvent:function(){
		//登录事件
		$('.js-login').click(function(){
			_mm.doLogin();
		});
		$('.js-register').click(function(){
			window.location.href = "./register.html"
		});
		$('.js-logout').click(function(){
			user.logout(function(res){
				window.location.reload()
			},function(errMsg){
				_mm.errorTips(errMsg)
			})
		});
	},
	//加载用户信息
	loadUserInfo:function(){
		user.checkLogin(function(res){
			$('.user.not-login').hide().siblings('.user.login').show().find('.username').text(res.username)
		},function(errMsg){
			_mm.errorTips(errMsg)
		})
	},
	//加载购物车数量
	loadCartCount:function(){
		_cart.getCartCount(function(res){
			$('.nav .cart-cont').text(res||0)
		},function(errMsg){
			$('.nav .cart-cont').text(0)
		})
	}
}
module.exports = _user.init();
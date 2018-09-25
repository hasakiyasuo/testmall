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
	},
	onLoad :function(){
		navSide.init({
			name:'user-center'
		});
		this.loadUserInfo();
	},
	//加载用户信息
	loadUserInfo:function(){
		
		var userHtml = '';
		_user.getUserInfo(function(res){
		userHtml = _mm.renderHtml(templateIndex,res);
		$('.panel-body').html(userHtml);
		},function(errMsg){
			_mm.errorTips(errMsg)
		})
		
	}
};
$(function(){
	page.init();
});
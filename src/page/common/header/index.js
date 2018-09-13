require('./index.css')
var _mm = require('util/mm.js')
//通用页面头部
var header = {
	init:function(){
		this.bindEvent();	
	},
	//回写搜索值
	onLoad : function(){
		var keyword = _mm.getUrlParam('keyword');
		if(keyword){
			$("#search-input").val(keyword)
		};
	},
	bindEvent:function(){
		var _this = this;
		$('#search-btn').click(function(){
			_this.searchSubmit();
		})
		//输入回车做搜索提交
		$('#search-input').keyup(function(e){
			
			if(e.keyCode == 13){
				_this.searchSubmit();
			}
		})
	},
	searchSubmit : function(){
		var keyword = $.trim($('#search-input').val());
		if(keyword){
			//如果有keyword会提交到list页
			window.location.href = './list.html?keyword='+keyword;
		}else{
			//如果没有传递参数就返回home
			_mm.goHome();
		}
	}
}
header.init();
module.exports = header;


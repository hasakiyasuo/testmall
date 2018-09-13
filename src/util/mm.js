
var Hogan = require('hogan.js')
var conf = {
	serverHost : '',
}
var _mm = {
	request:function(param){
		var _this = this;
		$.ajax({
			type 		:  param.method	||'get',
			url			:  param.url	||'',
			dataType	:  param.type 	||'json',
			data 		:  param.data 	||'',
			success		:  function(res){
				if(0 === res.status){
					typeof param.success ==='function'&&param.success(res.data,res.msg)
				}
				//没有登录状态需要强制登录
				else if(10 === res.status){
					_this.doLogin();
				}
				else if(1 === res.status){
					typeof param.error==='function'&&param.error(res.msg)
				}
			},
			error:function(err){
					typeof param.error==='function'&&param.error(err.status)
			}
		})
	},
	doLogin : function(){
		window.location.href = './login.html?redirct ='+encodeURIComponent(window.location.href)
	},
	//获取host地址
	getServerURL : function(path){
		return conf.serverHost +path
	},
	//获取url参数
	getURLparam : function(name){
		var reg = new RegExp('(^|&)' +name + '=([^&]*)(&|$)');
		var result = window.location.search.substr(1).match(reg);
		return result?decodeURIComponent(result[2]):null
	},
	//渲染html模板
	renderHtml : function(htmlTemplate,data){
		
		var template = Hogan.compile(htmlTemplate);
			html = template.render(data);
		return html
	},
	successTips : function(msg){
		alert(msg||'操作成功');
	},
	errorTips   :function(msg){
		alert(msg||'操作失败');
	},
	//字段验证，支持非空，手机，邮箱验证
	validate : function(value,type){
		var value = $.trim(value);
		//非空验证
		if('require' === type){
			return !!value;
		}
		//手机验证
		if('phone' === type){
			return /^1\d{10}$/.test(value)
		}
		//邮箱验证
		if('email' === type){
			return /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(value)
		}
	},
	goHome : function(){
		window.location.href = './index.html';
	}
}
module.exports = _mm
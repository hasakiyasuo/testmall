require('page/common/nav-simple/index.js')
require('page/common/footer/index.js')
require('./index.css')
var _mm = require('util/mm.js')
$(function(){
	var type = _mm.getURLparam('type') || 'default',
	$element = $('.'+type+'-success').show();
})

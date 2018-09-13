var _mm = require('util/mm.js')
var cart = {
	getCartCount: function(resolve,reject){
		_mm.request({
			url 	:_mm.getServerURL('/cart/get_card_product_count.do'),
			success	:resolve,
			error	:reject
		})
	},
}
module.exports = cart

const path              = require('path');
const webpack           = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin   = require('html-webpack-plugin');
// const plugins = new webpack.ProvidePlugin({
//     $: "jquery",
//     _: "underscore"
// });
//环境变量
 var WEBPACK_ENV         = process.env.WEBPACK_ENV||'dev';
  var getHtmlConfig = function(name){
    return{
       template  :'./src/view/'+name+'.html',
      filename  : 'view/'+name+'.html',
      inject    : true,
      hash      : true,
      chunks    :['common',name]

    }
  }
var config = {
  entry: {
      'common':['./src/page/common/index.js'],
      'index' :['./src/page/index/index.js'],
			'login' :['./src/page/login/login.js']},
  output: {
     path       : './dist',
     publicPath : '/dist/',
     filename   : '[name].js',
   
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
      { test: /\.(png|jpg|gif)\??.*$/, loader:'url-loader?limit=2040&name=resource/[name].[ext]' }
    ]
  },
  plugins: [
  	new webpack.optimize.CommonsChunkPlugin({
  	 name: 'common',
  	 filename: 'js/base.js'
 	}),
  new ExtractTextPlugin("css/[name].css"),
  new HtmlWebpackPlugin(getHtmlConfig('index')),
   new HtmlWebpackPlugin(getHtmlConfig('login'))
  ],
};
module.exports = config;
if('dev' === WEBPACK_ENV){
  config.entry.common.push('webpack-dev-server/client?http://localhost:8088')
}
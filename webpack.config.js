var webpack = require('webpack');
var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
  entry: ['webpack/hot/dev-server', path.resolve(__dirname, 'app/index.jsx')],
  output: {
    path: path.resolve(__dirname, 'build'),//文件输出的位置与require的dest相同；
    filename: 'bundle.js',//输出文件的名字
     publicPath:'/'

     // path: path.join(__dirname, "assets", "[hash]"),
     //    publicPath: "assets/[hash]/",
     //    filename: "output.[hash].bundle.js",
     //    chunkFilename: "[id].[hash].bundle.js"
  },
  module: {
    loaders: [
      {
        test: /.scss$/,
        loader: ExtractTextPlugin.extract("style", 'css!sass')//css分离
      },
      {
        test:/\.css$/,loader:'style!css'
      },
      {
        test:/\.js$/,
        loader:'babel',
        exclude:/node_modules/
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,//处理图片的格式
        loader: 'url-loader?limit=8199&name=imgs/[hash:8].[name].[ext]'//图片小于8kb转bese64
      },
      {//对格式的文件进行处理
        test: /\.jsx?$/,//正则匹配文件处理类型
         exclude: /node_modules/,//屏蔽不需要处理的文件

        loader: 'babel',//babel处理
        query: {
          presets:['es2015','react']//额外的设置选项,对es2105和babel进行处理
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({//压缩
      compress: {
        warnings: false//删除警告
      },
      output: {
        comments: false,  // 删除注释
      },
    }),
     new ExtractTextPlugin("app.css", {//分离css并创建一个app.css包含所有样式
          allChunks: true,
          disable: false
      }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.DedupePlugin(),// 查找相等或近似的模块，避免在最终生成的文件中出现重复的模块
    new webpack.optimize.OccurenceOrderPlugin()// 按引用频度来排序 ID，以便达到减少文件大小的效果
  ],
  devServer: {
    contentBase: "build",//本地服务器所加载的页面所在的目录
    colors: true,//终端中输出结果为彩色
    historyApiFallback: true,//但页面不跳转
    inline: true//实时刷新
  
  }
};
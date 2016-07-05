var path = require('path');

module.exports={
	entry:path.resolve(__dirname,'app.jsx'),
	output:{
		path:path.resolve(__dirname,'public'),
		filename:'build.js',
	},
	
	module: {
	    loaders:[
	      { test: /\.css$/, loader: 'style-loader!css-loader' },
	      { test: /\.js[x]?$/, exclude: /node_modules/, loader: 'babel-loader' },
	    ]
	  },
	  watch: true
};
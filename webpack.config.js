const path = require("path");

module.exports = { 
    mode: 'development',
    entry: path.resolve(__dirname, "src/index.ts"),
    
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'public'),
        publicPath: 'public'
    },

    devtool: 'inline-source-map',

    devServer: {
        open: true,
        contentBase: path.resolve(__dirname, "public")
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ],
    },

    resolve: {
        extensions: ['.ts', '.js']
    }
}
var path = require("path")
var webpack = require("webpack")
var VueLoaderPlugin = require('vue-loader/lib/plugin')

function resolve(dir) {

    return path.join(__dirname, '..', dir)
}

var webpackConfig = {

    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: '/node_modules',
                include: [resolve('src'), resolve('test')]
            },
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                include: /src|packages/,
                enforce: 'post',
                use: [{
                    loader: "istanbul-instrumenter-loader",
                    options: {
                        esModules: true
                    },
                }]
            },
            {
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader',
                    // options: {
                    //     preLoaders: {
                    //         js: 'istanbul-instrumenter-loader?esModules=true'
                    //     }
                    // }
                }]
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new VueLoaderPlugin()
    ]
}

module.exports = webpackConfig
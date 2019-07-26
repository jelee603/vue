var webpackConfig = require('../../build/webpack.test.config');

module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['mocha', 'sinon-chai', 'phantomjs-shim'],
        reporters: ['spec', 'coverage'],
        files: ['index.js'],
        preprocessors: {
            './index.js': ['webpack', 'sourcemap']
        },

        webpackMiddleware: {
            noInfo: true
        },

        webpackServer: {
            noInfo: true
        },
        webpack: webpackConfig,
        coverageReporter: {
            dir: './coverage',
            reporters: [
                { type: 'lcov', subdir: '.' },
                { type: 'text-summary' }
            ]
        }
    })
}
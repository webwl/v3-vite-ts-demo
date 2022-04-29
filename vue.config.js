const path = require('path')

module.exports = {
    // devServer: {
    //     port: '3000',
    //     https: false,
    //     proxy: {
    //         '/api': {
    //             target: 'http://124.220.34.251:5250',
    //             changeOrigin: true,
    //             secure: false,
    //             pathRewrite: {
    //                 '^/api': '',
    //             },
    //         },
    //     },
    // },
    transpileDependencies: ['vuetify'],
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                // 存放less变量文件的路径
                path.resolve(__dirname, './src/assets/less/parameter.less'),
            ],
        },
    },
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    modifyVars: {
                        'primary-color': '#ec6800',
                    },
                    javascriptEnabled: true,
                },
            },
        },
    },
}

'use strict'
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const productionGzipExtensions = ['js', 'css']
module.exports = {
    productionSourceMap: false,
    configureWebpack(config) {
        if (process.env.NODE_ENV === 'production') {
            let CompressionPlugin =  new CompressionWebpackPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8,
                deleteOriginalAssets: false, //删除源文件，不建议

            })
            config.plugins.push(CompressionPlugin)

        }else {
            return {
                plugins: [
                    // new BundleAnalyzerPlugin(),  // 使用默认配置
                    new BundleAnalyzerPlugin({
                        analyzerMode: 'server',
                        analyzerHost: '127.0.0.1',
                        analyzerPort: '8888',
                        reportFilename: 'report.html',
                        defaultSizes: 'parsed',
                        openAnalyzer: true,
                        generateStatsFile: false,
                        statsFilename: 'stats.json',
                        statsOptions: null,
                        excludeAssets: null,
                    })

                ],
            }
        }
    },
    chainWebpack: (config) => {
        /* 添加分析工具*/
        config.plugins.delete('prefetch')
    }

}

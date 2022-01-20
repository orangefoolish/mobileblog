module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://www.huanggou.top:9000',
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    publicPath: './',
}

module.exports = {
    transpileDependencies: true,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8090/',
                // target: 'http://ace3c9fc9de9248f9adafd7fbf98953f-369489494.ca-central-1.elb.amazonaws.com:8090/',
                ws: true,
                changeOrigin: true
            }
        }
    }
}
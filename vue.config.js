const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.geojson$/,
                    loader: 'json-loader'
                }
            ]
        }
    },
    publicPath: process.env.NODE_ENV === "production" ? "/simple-weather-map/" : "/",
})

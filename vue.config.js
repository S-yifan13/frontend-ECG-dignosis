const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
const { ChakraLoaderPlugin } = require('chakra-loader')

module.exports = {
	configureWebpack: {
		plugins: [
			new ChakraLoaderPlugin()
		]
	}
}

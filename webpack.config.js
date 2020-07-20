const EsmWebpackPlugin = require('@purtuga/esm-webpack-plugin');
const path = require('path');

module.exports = {
    entry: ['./src/index.js'],
    output: {
        libraryTarget:"umd",
        path: path.resolve(__dirname, 'src/common'),
        filename: 'index.js'
    },
    plugins: [
        new EsmWebpackPlugin()
    ]
}

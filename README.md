js工具包

npm publish



# getMergeObject

> 合并两个对象数组，例如 
obj1 = {
    devtool: '#eval-source-map',
    resolve: {
    alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': path.join(__dirname, 'src')
    },
    extensions: ['.js', '.vue', '.json']
}
obj2 = {
    mode: 'development',
    entry: ['babel-polyfill', './src/app.js'],
    output: {
        path: path.resolve(__dirname, 'dist/view/vue'), // 项目的打包文件路径
        publicPath: '/', // 通过devServer访问路径
        filename: '[name].[chunkhash].js'
    }
}

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```













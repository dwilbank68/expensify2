### Development

    npm run dev-server

### Run jest in watch mode

    npm test -- --watch
    
    // extra hyphens associate 'watch' with 'test' instead of with 'npm'

### build for production

    npm run build:prod

### return index.html to be handled by react-router-dom instead of server returning 404

    //webpack.config.js will return index.html when request path is 404

    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true           <----
    }
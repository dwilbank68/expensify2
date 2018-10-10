const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env, argv) => {

    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');     // 1

    return {
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js|jsx$/,
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                // use: ['style-loader', 'css-loader', 'sass-loader']
                use: CSSExtract.extract({
                    use: [
                        {
                            loader:'css-loader',
                            options: {sourceMap:true}
                        },
                        {
                            loader:'sass-loader',
                            options: {sourceMap:true}
                        }
                    ]
                })
            }]
        },
        plugins: [CSSExtract],
        devtool: isProduction ? 'source-map' : 'inline-source-map', // 2
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true
        }
    };
};

// 1 -  argument is the name of the file you want to be created during build
// 2 -  in production, bundle.js.map will be created, and only loaded if user
//      opens up their Dev Tools
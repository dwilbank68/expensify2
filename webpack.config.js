const path = require('path');
const webpack = require('webpack');                             // 4
const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {                          // 4
    require('dotenv').config({path:'.env.test'});
} else if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({path:'.env.development'});
}

module.exports = (env, argv) => {

    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');     // 1

    return {
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public', 'dist'),
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
        plugins: [
            CSSExtract,
            new webpack.DefinePlugin({                               // 4
                'process.env.FIREBASE_API_KEY':             JSON.stringify(process.env.FIREBASE_API_KEY),
                'process.env.FIREBASE_AUTH_DOMAIN':         JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                'process.env.FIREBASE_DATABASE_URL':        JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                'process.env.FIREBASE_PROJECT_ID':          JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                'process.env.FIREBASE_STORAGE_BUCKET':      JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
            })
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map', // 2
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,                               // 3
            publicPath: '/dist/'
        }
    };
};

// 1 -  argument is the name of the file you want to be created during build
// 2 -  in production, bundle.js.map will be created, and only loaded if user
//      opens up their Dev Tools
// 3 -  For development, serves /public/index.html every time 404
//      For production, do the same thing in server.js with app.get('*'...
// 4 -  this is to pass NODE_ENV to the client side, inside of bundle.js
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const pkg = require('../../package.json');

module.exports = {
  context: __dirname,
  entry: './src/index.js',
  mode: process.env.NODE_ENV || 'development',
  devServer: {
    port: 3000,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  output: {
    path: path.resolve(__dirname, '../../dist-agent-shell'),
    publicPath: 'http://localhost:3000/',
    clean: true
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
    alias: {
      '@prudential/api-client': path.resolve(__dirname, '../../libs/api-client/src/index.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({})
    }),
    new ModuleFederationPlugin({
      name: 'agentShell',
      remotes: {
        customerMfe: 'customerMfe@http://localhost:3001/remoteEntry.js',
        productMfe: 'productMfe@http://localhost:3002/remoteEntry.js',
        paymentMfe: 'paymentMfe@http://localhost:3003/remoteEntry.js',
        policyMfe: 'policyMfe@http://localhost:3004/remoteEntry.js'
      },
      shared: {
        react: { singleton: true, requiredVersion: pkg.dependencies.react },
        'react-dom': { singleton: true, requiredVersion: pkg.dependencies['react-dom'] },
        'react-redux': { singleton: true, requiredVersion: pkg.dependencies['react-redux'] },
        '@reduxjs/toolkit': { singleton: true, requiredVersion: pkg.dependencies['@reduxjs/toolkit'] },
        'react-router-dom': { singleton: true, requiredVersion: pkg.dependencies['react-router-dom'] }
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};

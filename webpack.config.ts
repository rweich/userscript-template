import * as path from 'path';
import * as webpack from 'webpack';

import WebpackUserscript from 'webpack-userscript';
import headers from './src/Header';

const config = (environment: unknown, options: { mode: string; env: unknown }): webpack.Configuration => {
  const isDevelopment = options.mode === 'development';

  return {
    /* eslint-disable sort-keys */
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    target: 'web',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
      rules: [
        {
          exclude: /node_modules/,
          test: /\.tsx?$/,
          use: ['ts-loader'],
        },
      ],
    },
    devServer: {
      disableHostCheck: true,
      headers: {
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Origin': '*',
      },
      host: 'localhost',
      https: false,
      port: 11944,
    },
    plugins: [
      new WebpackUserscript({
        headers,
        pretty: true,
        proxyScript: {
          baseUrl: 'http://localhost:11944/',
          enable: isDevelopment,
          filename: '[basename].proxy.user.js',
        },
      }),
    ],
    optimization: {
      minimize: false,
    },
    /* eslint-enable sort-keys */
  };
};

export default config;

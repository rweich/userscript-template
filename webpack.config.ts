import path from 'node:path';

import { VueLoaderPlugin } from 'vue-loader';
import * as webpack from 'webpack';
import WebpackUserscript from 'webpack-userscript';

import generateHeaders from './src/Header';

const config = (
  environment: { BUILD_VERSION?: string },
  options: { mode: string; env: unknown },
): webpack.Configuration => {
  const isDevelopment = options.mode === 'development';
  const headers = generateHeaders(isDevelopment, environment.BUILD_VERSION || undefined);

  return {
    /* eslint-disable sort-keys */
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    target: 'web',
    output: {
      filename: `${headers.name}.js`,
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    resolve: {
      extensions: ['.js', '.vue', '.json', '.ts'],
      alias: {
        '@': path.resolve(__dirname, 'src/'),
      },
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/],
          },
        },
        {
          test: /\.css$/i,
          use: ['vue-style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpg)$/,
          loader: 'url-loader',
        },
        {
          test: /\.s[ac]ss$/,
          exclude: /\.lazy\.s[ac]ss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass'),
              },
            },
          ],
        },
        {
          test: /\.lazy\.s[ac]ss$/,
          use: [
            { loader: 'style-loader', options: { injectType: 'lazyStyleTag' } },
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass'),
              },
            },
          ],
        },
      ],
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      disableHostCheck: true,
      headers: {
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Origin': '*',
      },
      host: 'localhost',
      https: false,
      port: 11_944,
    },
    plugins: [
      new WebpackUserscript({
        headers: headers,
        pretty: true,
        proxyScript: {
          baseUrl: 'http://localhost:11944/',
          enable: isDevelopment,
          filename: '[basename].proxy.user.js',
        },
      }),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      new VueLoaderPlugin(),
    ],
    optimization: {
      minimize: false,
    },
    /* eslint-enable sort-keys */
  };
};

export default config;

import WebpackUserscript from 'webpack-userscript';

function generateHeaders(isDevelopment: boolean): WebpackUserscript.HeaderObject {
  /* eslint-disable sort-keys */
  return {
    name: 'userscript-template',
    description: 'a userscript-template',
    version: isDevelopment ? '[version].[buildTime]' : '[version]',
    author: 'rweich',
    namespace: 'https://github.com/rweich',
    license: 'MIT',
    match: ['*://www.google.com/*'],
    connect: ['www.google.com'],
    noframes: true,
    'run-at': 'document-end',
  };
  /* eslint-enable sort-keys */
}

export default generateHeaders;

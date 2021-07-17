import WebpackUserscript from 'webpack-userscript';

function generateHeaders(isDevelopment: boolean, buildVersion?: string): WebpackUserscript.HeaderObject {
  /* eslint-disable sort-keys */
  return {
    name: 'userscript-template',
    description: 'a userscript-template',
    version: (buildVersion !== undefined ? buildVersion : '[version]') + (isDevelopment ? '.[buildTime]' : ''),
    author: 'rweich',
    namespace: 'https://github.com/rweich',
    license: 'MIT',
    match: ['*://www.google.com/*'],
    connect: ['www.google.com'],
    noframes: true,
    'run-at': 'document-end',
    grant: ['GM.registerMenuCommand'],
  };
  /* eslint-enable sort-keys */
}

export default generateHeaders;

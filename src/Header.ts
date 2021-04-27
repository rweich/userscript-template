import WebpackUserscript from 'webpack-userscript';

/* eslint-disable sort-keys */
const headers: WebpackUserscript.HeaderObject = {
  name: 'the-name',
  description: 'the-description',
  version: '[version].[buildTime]',
  author: 'the-author',
  namespace: 'https://the.name.space',
  license: 'MIT',
  match: ['*://www.your.match/*'],
  connect: ['www.your.match'],
  grant: ['GM.xmlHttpRequest'],
  noframes: true,
  'run-at': 'document-end',
};
/* eslint-enable sort-keys */

export default headers;

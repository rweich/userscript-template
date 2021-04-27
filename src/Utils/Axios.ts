import axios from 'axios';
import xhrAdapter from 'axios-userscript-adapter/dist/esm';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
axios.defaults.adapter = xhrAdapter;

export default axios;

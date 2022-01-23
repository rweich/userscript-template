import { PluginFunction } from 'vue';

import Logger from '../Logger';

const VueLogger: PluginFunction<undefined> = (Vue) => {
  Vue.prototype.$logger = Logger.getLogger('vue');
};

export default VueLogger;

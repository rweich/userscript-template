import Logger from '../Logger';
import { PluginFunction } from 'vue';

const VueLogger: PluginFunction<undefined> = (Vue) => {
  Vue.prototype.$logger = Logger.getLogger('vue');
};

export default VueLogger;

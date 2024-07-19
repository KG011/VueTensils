import _Checkbox from './src/checkbox.vue'
import {withInstall} from'@kg01/utils/with-install'
const Checkbox=withInstall(_Checkbox)
export default Checkbox
export * from './src/checkbox'

declare module 'vue' {
  export interface GlobalComponents {
    ZCheckbox: typeof Checkbox
  }
}
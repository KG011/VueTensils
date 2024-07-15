import _icon from './src/icon.vue'
import {withInstall} from'@kg01/utils/with-install'
const Icon=withInstall(_icon)
export default Icon
export * from './src/icon'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ZIcon: typeof Icon.default
  }
}
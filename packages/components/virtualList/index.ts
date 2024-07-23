import _virtualList from './src/virtualList.vue'
import { withInstall } from "@kg01/utils/with-install";
const virtualList=withInstall(_virtualList)
export default virtualList

declare module 'vue' {
  export interface GlobalComponents {
    ZVirtualList: typeof virtualList
  }
}
export * from './src/virtualList'

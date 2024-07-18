import _virtualList from './src/virtualList'
import { withInstall } from "@kg01/utils/with-install";
const virtualList=withInstall(_virtualList)
export default virtualList

declare module 'vue' {
  export interface GlobalComponents {
    zvVrtualList: typeof virtualList.default
  }
}
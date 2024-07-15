import { DefineComponent } from 'vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ZIcon: DefineComponent<{}, {}, any>
  }
}
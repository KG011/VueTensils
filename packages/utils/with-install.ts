import { Plugin,DefineComponent } from 'vue'

export type SFCWithInstall<T> = T & Plugin
export function withInstall<T>(component: T){
    (component as SFCWithInstall<T>).install=(app:any)=>{
        const {name}=component  as unknown as {name:string}
        
        app.component(name, component)//将组件注册为全局组件
    }
    return component as SFCWithInstall<T>

}
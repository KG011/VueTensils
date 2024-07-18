declare module '*.vue' {
    import { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
  }
  
  declare global {
    namespace JSX {
      interface IntrinsicElements {
        // 在这里添加你需要的 HTML 元素和属性
        [elemName: string]: any;
      }
    }
  }
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "VueTensils",
  description: "A Vue Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '使用指南', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: '目录',
        items: [
          { text: '快速开始', link: '/markdown-examples' },
          { text: 'Runtime API 用例', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})

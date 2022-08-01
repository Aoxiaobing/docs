import { defaultTheme, defineUserConfig } from 'vuepress'

export default defineUserConfig ({
  base: "/vuepress-note/",
  port: 9527,
  lang: "zh-CN",
  title: "🎉",
  description: "Hello H.z",
  theme: defaultTheme({
    sidebarDepth: 2,
    sidebar: [
      '/documents/uniapp.md'
    ]
  })
})
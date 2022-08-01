---
lang: zh-CN
title: Uniapp
---

## Gitee uniapp模板
HTTPS: [https://gitee.com/hellolad/uniapp-init-template.git](https://gitee.com/hellolad/uniapp-init-template.git)

SSH: [git@gitee.com:hellolad/uniapp-init-template.git](git@gitee.com:hellolad/uniapp-init-template.git)


## 其他资源
[uniapp官网](https://uniapp.dcloud.io/)

icons图标集合
- [uView Icons](https://www.uviewui.com/components/icon.html)
- [uni-icons](https://uniapp.dcloud.io/component/uniui/uni-icons.html)
- [iconfont](https://www.iconfont.cn/manage/index?spm=a313x.7781069.1998910419.20&manage_type=myprojects&projectId=3557616&keyword=&project_type=&page=)

canvas 表格图，雷达图，柱状图，扇面图
- [uCharts](https://www.ucharts.cn/v2/#/guide/index)

canvas 生成海报
- [lime-painter](https://ext.dcloud.net.cn/plugin?id=2389)

## Interceptor 拦截器
[interceptor 文档](https://uniapp.dcloud.io/api/interceptor.html)
#### 拦截跳转
```js
uni.addInterceptor('navigateTo', {
  invoke(args) {
    console.log('args', args)
    return false // 不想跳转的话就返回false
  }
})
```
#### 拦截request

```js
uni.addInterceptor('request', {
  invoke(args) {
    args.url = getRequestHost() + args.url
    args.header = {
      'u-token': "123"
    }
  },
  success(args) {
    args.data.code = 1 // 拦截成功后 修改数据
  }
})
```
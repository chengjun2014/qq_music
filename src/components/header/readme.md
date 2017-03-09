# 头部组件

-----------

## 应用示例

<head-comp :show-logo=true :show-back=false back-text='返回' title="产品详情"  :show-name=false></head-comp>

## 参数说明

> 左侧信息
show-logo: 显示顶部logo，默认值`false`(仅首页需要显示)
show-back: 显示左侧返回箭头，默认值`true`
back-text: 左侧返回箭头后紧跟的文字，默认值`'返回'`

> 中间信息
title: 顶部居中标题

> 右侧信息(显示依赖全局的login信息)
show-name: 显示右侧用户名，默认值`false`
show-home-icon: 显示右侧主页icon，默认值`false`
show-img: 显示右侧用户头像，默认值`true`
show-register: 显示注册入口，默认值`false`
show-login: 显示登陆入口，默认值`false`



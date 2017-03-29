# 一个假的qq音乐Vue SPA qq_music

> 我可能做了一个假的qq音乐demo， 本demo参考`https://y.qq.com`开发的，难怪跟网上其他人的案例界面不一样。。。Orz

## Build Setup

``` bash
# 安装依赖
npm install

# serve with hot reload at localhost:8080 启动服务
npm run dev （会自动启动浏览器运行项目）

# build for production with minification
npm run build （对这里已经优化了配置文件使 build 生成的文件可以在本地查看，或作为静态页面线上预览）

# build for production and view the bundle analyzer report
npm run build --report

```
## 功能实现

首页：banner滚动效果实现，电台下级页面未接入（配的活动页或列表页，情况太复杂没有固定的借口）

排行榜：完成榜单列表和榜单歌曲list，并可播放榜单歌曲，榜单页播放按钮可播放当前专辑第一首歌曲

搜索页：搜索功能完成，并完成歌手的个人页面，添加搜索框回车提交；热词点击即触发搜索

播放页：歌曲正常播放，歌词同步高亮／滚动；播单显示正常；未做播放控制／收藏功能，播发完自动切换到停止状态

搜索结果页：搜索结果正常显示／跳转到对应播放页面

搜索历史去重／排序

自定义 `localstorage` 方法，添加／删除／清空数据；

优化 `localstorage` 可存／取数组类型（通过序列化和反序列化）


> 个人闲暇时间里做的，希望跟大家共同进步————持续更新／优化

## 目前存在的问题

组件划分还不够精细，这个需要更多经验和对产品的理解

代码优化还有待加强

数据请求可以用api.js统一管理，组件只关心参数和返回值即可

action管理可以通过dispatch 或commit触发获取数据

## 优点

用到了比较新且全面的 `Vue` 相关的技术栈，

1. "vue": "^2.1.10",
2. "vue-awesome-swiper": "^2.3.2",
3. "vue-resource": "^1.2.0",
4. "vue-router": "^2.2.0",
5. "vuex": "^2.1.2"

代码格式比较整齐（换过一次IDE，可能个别文件缩紧不统一，见到时候会调整回来）


## 案例截图（gif图片放到线上有点卡，如果新看的更流畅可以吧这个图片下载到你本地打开）

![image](https://github.com/chengjun2014/qq_music/blob/master/playing.png)

![image](https://github.com/chengjun2014/qq_music/blob/master/music.gif)







<p align="center">
  <img width="148" src="https://lidexun.github.io/ichat/icon.svg">
</p>

### ichat(一对一聊天/前后端分离)

[线上项目,在线预览地址](http://lidexun.gitee.io/ichat/#/)

> 写在最前！你可以看到用 Vue3 写一个即时通讯应用，在浏览器中实现 wx 同样离线聊天数据，利用浏览器 indexedb 保存大量聊天数据在本地，持续更新到完整聊天室的功能~持续更新中

### 如何启动项目打开 chat / server

- 安装依赖项
  - npm/yran/pnpm install
- 启动服务
  - npm run dev
- 安装并且启动 mongoDB
  - 修改 server/config 下的 MONGODB_URL 为本地地址

### 技术栈

前端：`Vue3`+`Vant`+`Vite`

后端：`Nodejs(express)`+`mongoDB`

通信：`Websocket`

## 功能

- [x] 注册登录功能
- [x] 消息列表
- [x] 聊天室
- [x] 聊天功能(文字)
- [x] 聊天功能(表情)
- [x] 搜索用户
- [ ] 更多功能

# 预览图

![image](https://github.com/lidexun/image/blob/master/ichat_view.png)

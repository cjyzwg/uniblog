# 博客前后端均已开源，前端uniapp，后端golang

## 简介
前端地址：[uniblog](https://github.com/xusenlin/forest-blog)  
后端地址：[cjblog](https://github.com/cjyzwg/forestblog)  
博客地址：[博客](https://blog.hexiefamily.xin)  
配合 [**blog**](https://github.com/cjyzwg/forestblog) ,借鉴[**WeHalo**](https://github.com/aquanlerou/WeHalo)样式开发出来的 **简约风** uniapp版博客，可供多端使用。
| QQ交流群: 469064015   | 微信群  |
| :------------: | :------------: |
| <img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-6rawjgd8tdtl4007ee/2adf2950-54a4-11eb-8ff1-d5dcf8779628.png" width="150"/>  | <img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-6rawjgd8tdtl4007ee/cc772630-54b0-11eb-8a36-ebb87efcf8c0.JPG" width="150" />  |

## 快速开始

### 前端部分:

1. git clone https://github.com/cjyzw/uniblog 或者打开[**插件市场**](https://uniapp.dcloud.io/quickstart-hx?id=%e8%bf%90%e8%a1%8cuni-app)点击右侧导入插件/下载zip
2. 打开Hbuilder本项目，右击关联云空间，选择阿里云，将db_init.json部署到云存储中。**注：打开[**unicloud控制台**](https://unicloud.dcloud.net.cn/),选择阿里云服务空间/云数据库/token表，点击管理修改typ,appid,secret即可**
3. 用Hbuilder打开本项目中mainfest.json填写对应小程序的appid
4. 点击Hbuilder工具栏/运行，运行到某某小程序，**注: 记得下载对应的小程序运行工具**
5. config/index.js中，ipAddress填写调取markdown文件的博客地址
6. App.vue中，找到bannerimglist，修改地址，可以将轮播图中的图片替换，设置个人logo图片，修改homeImg

**注：必须是HTTPS的因为，所有小程序官方规定，需要把博客地址``如：https://blog.hexiefamily.xin``和``https://v2.jinrishici.com``以及``https://vkceyugu.cdn.bspapp.com``添加到微信，qq，字节头条等公众平台的 ``request 合法域名``中**  
**如果博客地址不会配置https协议可以看[**这里**](https://blog.hexiefamily.xin/article?path=%2fSSH%2facme%e7%94%9f%e6%88%90https%e5%8d%8f%e8%ae%ae%e6%93%8d%e4%bd%9c%e6%96%b9%e6%b3%95.md)**

```
globalData: {
	  windowHeight: uni.getSystemInfoSync().windowHeight,
	  windowWidth:uni.getSystemInfoSync().windowWidth,
    //全局变量
    userInfo: null,
	openid:'',
    skin: null,
    roleFlag: false,
    jrscurl: "https://v2.jinrishici.com",
    BlogName: "代码改变生活",
    highlightStyle: "dracula",
    //代码高亮样式，可用值default,darcula,dracula,tomorrow
    adminOpenid: "",
	homeImg:'/static/image/cat.png',
	bannerimglist:[
		'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-6rawjgd8tdtl4007ee/a93bb8b0-50dd-11eb-a16f-5b3e54966275.jpg',
		'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-6rawjgd8tdtl4007ee/a8638120-50dd-11eb-a16f-5b3e54966275.jpg',
		'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-6rawjgd8tdtl4007ee/aa0fd190-50dd-11eb-bd01-97bc1429a9ff.jpg',
		'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-6rawjgd8tdtl4007ee/aade6c30-50dd-11eb-a16f-5b3e54966275.jpg',
		'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-6rawjgd8tdtl4007ee/ab9d7670-50dd-11eb-a16f-5b3e54966275.jpg'
	]
  }
```

**注：例子中无appid，所以无法在手机上运行，如果需要预览，真机调试填上自己的小程序 appid哦~,具体各类小程序如何运行可以访问 [**运行**](https://uniapp.dcloud.io/quickstart-hx?id=%e8%bf%90%e8%a1%8cuni-app)
 
### 后端部分：

1. git clone http://github.com/cjyzwg/forestblog  cjblog
2. cd cjblog
3. go mod tidy(前提已经开启export GO111MODULE=on）
4. go run main.go
打开浏览器，访问http://localhost:8081 即可
5.删除resources/blog_docs/content中所有内容，分类名为文件夹名如：DNS，文件为名为：a.md
6.所有配置项在config.json中，均可以修改
```
{
  "port": 8081,
  "pageSize": 7,
  "descriptionLen": 200,
  "author": "Chensir",
  "webHookSecret": "cj",
  "timeLayout": "2006.01.02 15:04",
  "siteName": "Chensir's Personal Blog",
  "documentPath": "resources/blog_docs",
  "htmlKeywords": "forest blog,Golang,前端",
  "htmlDescription": "Chensir's Personal blog",
  "categoryListFileNumber": 6,
  "themeColor": "#9c27b0",
  "dashboardEntrance": "/admin",
  "themeOption": ["#673ab7","#f44336","#9c27b0","#2196f3","#607d8b","#795548"]
}
```
**注：请确保go版本在1.11以上**

#### 注意事项：
1. 所有的笔记都是markdown文件,.md结尾
2. 服务端代码中不涉及mysql部分，本着简洁的目的，通过生成的cache文件来访问，若要添加，可自行添加或者联系我
3. 可将此代码部署到服务器，或者部署到本机，服务器代理转发到本机即可

## 演示

博客地址:[https://blog.hexiefamily.xin/](https://blog.hexiefamily.xin/)
| 微信小程序   | qq小程序  | 抖音小程序  |
| :------------: | :------------: | :------------: |
| <img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-6rawjgd8tdtl4007ee/fc813490-54b2-11eb-bd01-97bc1429a9ff.png" width="150"/>  | <img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-6rawjgd8tdtl4007ee/f30699a0-54b2-11eb-97b7-0dc4655d6e68.png" width="150" />  |<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-6rawjgd8tdtl4007ee/0a347020-54b3-11eb-b680-7980c8a877b8.jpg" width="150" />  |


## 功能

- [x] 文章展示
- [x] 评论展示
- [x] 搜索文章功能
- [x] 文章评论功能
- [x] 评论功能内容识别
- [x] 友链展示
- [x] 点赞功能（云函数）
- [x] 文章浏览统计功能（云函数）
- [ ] 用户回复评论追评功能
- [ ] 生成海报
- [ ] 博主查看评论功能
- [ ] 博主回复评论功能
- [ ] 支付宝小程序抽屉功能修复...

## 感谢

UniBlog的诞生离不开下面这些项目：

- **[WeHalo](https://github.com/aquanlerou/WeHalo)： 一个简约清爽的开源博客微信小程序。**
- **[ColorUI](https://github.com/weilanwl/ColorUI)：鲜亮的高饱和色彩，专注视觉的小程序组件库**
- **[ForestBlog](https://github.com/xusenlin/forest-blog)：golang简约版的博客应用**

## 其他

- [<font color=#0099ff>startmyblog</font>](https://github.com/cjyzwg/startmyblog)： 使用flutter做的app，调取后端做接口。  
- [<font color=#0099ff>qrcp_pass</font>](https://github.com/cjyzwg/qrcp_pass)： 解决跨平台传文件，不用经过微信压缩即可传视频。  
## 捐赠

> 如果 **UniBlog** 圆了你在微信/qq/抖音小程序或app各个平台中的梦想了，可以众筹作者买哇哈哈（注：捐赠请备注哈）

| 支付宝  | 微信  |
| :------------: | :------------: |
| <img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-6rawjgd8tdtl4007ee/cc230830-54af-11eb-97b7-0dc4655d6e68.jpg" width="150"/>  | <img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-6rawjgd8tdtl4007ee/cce51fb0-54af-11eb-bdc1-8bd33eb6adaa.jpg" width="150" />  |
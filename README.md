# 博客前后端均已开源，前端uniapp，后端golang
### 后端：
1. git clone http://github.com/cjyzwg/cjblog 
2. cd cjblog
3. go mod tidy (前提是开启export GO111MODULE=on）
4. go run main.go
5. 打开浏览器，访问http://localhost:8081 即可

### 注意事项：
1. 所有的笔记都是markdown文件结尾
2. 代码中不涉及mysql部分，觉得没什么必要，本着简洁的目的，通过生成的cache文件来访问，若要添加，可自行添加或者联系我
3. 可将此代码部署到服务器，或者部署到本机，服务器代理转发到本机即可
4. 如果要结合前端部署小程序，需要https协议哦～可以看这个教程，将http转为https

### 前端:

1. git clone https://github.com/cjyzw/uniblog 或者点击右侧导入插件/下载zip
2. 关联云空间，选择阿里云，将db_init.json部署到云存储中，data中的都是假数据，需要手动修改，最重要的是token表，将你的微信小程序appid，secret填上同时针对不同类型小程序以数字代替
3. mainfest.json记得填写appid
4. 点击hbuilder工具栏/运行，运行到小程序中即可看到小程序运行起来了
5. config/config.js中，ipaddress填写调取markdown文件的地址

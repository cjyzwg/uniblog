<script>

export default {
  onLaunch: function () {
	let self = this
	let typ = 1
	// #ifdef MP-WEIXIN
	typ = 1
	// #endif
	// #ifdef MP-QQ
	typ = 2
	// #endif
	// #ifdef MP-TOUTIAO
	typ = 3
	// #endif
	let tmpopenid = uni.getStorageSync('openid') || '';
	if (tmpopenid==""){
		uni.login({
		  success: res => {// 发送 res.code 到后台换取 openId, sessionKey, unionId
			uniCloud.callFunction({
				name: 'getopenid',
				data: {
					code:res.code,
					typ:typ,
					apptyp:"blog"
				}
			}).then((openres) => {
				console.log(openres)
				if(openres.success){
					if(openres.result.status==0){
						uni.setStorageSync('openid', openres.result.content.openid);
						self.globalData.openid = openres.result.content.openid; 
					}
				}
		
				
			
			}).catch((err) => {
				console.error(err)
		
			})
			
		  }
		}); // 获取用户openid
	}else{
		self.globalData.openid = tmpopenid
	}



    uni.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          uni.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              self.globalData.userInfo = res.userInfo; // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况

              if (self.userInfoReadyCallback) {
                self.userInfoReadyCallback(res);
              }
            }
          });
        }
      }
    }); // 获取系统状态栏信息

    uni.getSystemInfo({
      success: e => {
        self.globalData.StatusBar = e.statusBarHeight;
        let custom = uni.getMenuButtonBoundingClientRect();
        self.globalData.Custom = custom;
        self.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    });
	// #ifdef MP-WEIXIN
	const miniProgram = uni.getAccountInfoSync();
	console.log(miniProgram);
	self.globalData.miniProgram = miniProgram.miniProgram; // 获取小程序更新机制兼容
	if (uni.canIUse('getUpdateManager')) {
	  const updateManager = uni.getUpdateManager();
	  updateManager.onCheckForUpdate(function (res) {
	    // 请求完新版本信息的回调
	    if (res.hasUpdate) {
	      updateManager.onUpdateReady(function () {
	        uni.showModal({
	          title: '更新提示',
	          content: '新版本已经准备好，是否重启应用？',
	          success: function (res) {
	            if (res.confirm) {
	              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
	              updateManager.applyUpdate();
	            }
	          }
	        });
	      });
	      updateManager.onUpdateFailed(function () {
	        // 新的版本下载失败
	        uni.showModal({
	          title: '已经有新版本了哟~',
	          content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
	        });
	      });
	    }
	  });
	} else {
	  // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
	  uni.showModal({
	    title: '提示',
	    content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
	  });
	}
	// #endif
  },
  globalData: {
	  windowHeight: uni.getSystemInfoSync().windowHeight,
	  windowWidth:uni.getSystemInfoSync().windowWidth,
    //全局变量
    userInfo: null,
	openid:'',
    skin: null,
    roleFlag: false,
    jrscurl: "https://v2.jinrishici.com",
    //http://localhost:8090
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
		'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-6rawjgd8tdtl4007ee/ab9d7670-50dd-11eb-a16f-5b3e54966275.jpg',
		'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-6rawjgd8tdtl4007ee/ac5a36c0-50dd-11eb-a16f-5b3e54966275.jpg',//竖版
		'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-6rawjgd8tdtl4007ee/ad03bd30-50dd-11eb-bd01-97bc1429a9ff.jpg',
		'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-6rawjgd8tdtl4007ee/ada57b70-50dd-11eb-a16f-5b3e54966275.jpg',
		'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-6rawjgd8tdtl4007ee/ae5ac1b0-50dd-11eb-a16f-5b3e54966275.jpg',
		'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-6rawjgd8tdtl4007ee/af0643f0-50dd-11eb-a16f-5b3e54966275.jpg',
		'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-6rawjgd8tdtl4007ee/afb3e910-50dd-11eb-a16f-5b3e54966275.jpg',
		'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-6rawjgd8tdtl4007ee/b055ce60-50dd-11eb-a16f-5b3e54966275.jpg',
		'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-6rawjgd8tdtl4007ee/b0f89e10-50dd-11eb-b997-9918a5dda011.jpg',
		'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-6rawjgd8tdtl4007ee/b1a0ec00-50dd-11eb-a16f-5b3e54966275.jpg',
	]
  },
  methods: {}
};
</script>
<style>
@import "./app.css";
@import url("/components/gaoyia-parse/parse.css");
</style>
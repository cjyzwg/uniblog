<template>
<view>
<wh-authorCard  ref="authorCardId" :isGithub="isGithub"></wh-authorCard>
<scroll-view scroll-y :class="'DrawerPage ' + (modalName=='viewModal'?'show':'')" @scroll="scroll" scroll-with-animation="true" :style="'background-color: ' + (skin?'#ffffff':'#ffffff') + ';'" @scrolltolower="loadMore">
    <!-- <cu-custom bgColor="bg-lightGrey" isBack="false" isCustom="false" :isNav="scrollTop>120?false:true" isFixed="fixed">
        <view slot="backText">返回</view>
        <view slot="content" class="text-shadow-meows">
            <text class="text-white text-bold">{{BlogName}}</text>
        </view>
    </cu-custom> -->
    <wh-addTips text="Meow~ 点击「添加到我的小程序」" duration="2"></wh-addTips>
    <view @touchstart="touchStart" @touchend="touchEnd" class="flex justify-center align-center bg-white" style="width:100%; height:460rpx; background-image:url(https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-6rawjgd8tdtl4007ee/ab737080-535f-11eb-b680-7980c8a877b8.jpg); background-repeat: no-repeat; background-size: 100% 100%;">
        <view class="grid col-1 margin-bottom text-center">
            <view class="text-xxxl padding text-shadow-meow" role aria-label>
                <text class="text-white text-bold">{{BlogName}}</text>
            </view>
            <view class="text-xl padding text-shadow-meow text-white text-bold" role aria-label>
                <wh-typeWriter :whContent="jinrishici"></wh-typeWriter>
            </view>
        </view>
    </view>
    <view class="home text-shadow-meow" @tap="showModal" data-target="viewModal">
		<image class="cu-avatar round bg-white lg margin-xs"  :src="homeImg"></image>
        <!-- <view class="home-btn home-img shadow-blur" :style="'background-image:url(' +homeImg+ ');'"></view> -->
    </view>
    <!-- catch:touchstart="maopao" catch:touchend="maopao" -->
    <view style="margin-top: -100rpx;">
        <swiper @change="cardSwiper" :class="'card-swiper ' + (DotStyle?'square-dot':'round-dot')" circular="true" autoplay="true" interval="5000" duration="500">
            <swiper-item v-for="(banneritemPost, index) in bannerPost? bannerPost:5" :key="index" :class="cardCur==index?'cur':''" v-if="index<5">
                <navigator :url="'../post/post?postpath=' + banneritemPost.path"  open-type="navigate">
                    <view class="swiper-item" style="padding: 20rpx; padding-bottom:26rpx;">
                        <view class="carousel-img radius shadow-meow bg-lightGrey bg-img" :style="'background-image:url(' + banneritemPost.thumbnail + '); width:100%'">
                            <view class="bg-maskCard flex-sub" style="border-radius:6rpx; height:100%; position:relative;">
                                <view class="padding-lg text-white">
                                    <view class="padding-xs text-xl text-bold text-shadow">
                                        
										{{banneritemPost.title.substr(0,banneritemPost.title.length-3)}}
                                    </view>
                                </view>
                                <view class="padding-lg text-white" style="position:absolute; bottom:0; right:0;">
                                    <view class="padding-xs text-df text-bold text-shadow">
                                        {{banneritemPost.date.substring(0,10)}}
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </navigator>
            </swiper-item>
        </swiper>
    </view>
    <view style="margin-right:20rpx; margin-left:20rpx;">
        <official-account style></official-account>
    </view>
    <view class="cu-bar search bg-white">
        <view class="search-form round">
            <text class="cuIcon-search"></text>
            <input @input="Search" id="search" name="content" type="text" placeholder="搜索文章、关键词" confirm-type="search"></input>
        </view>
        <view class="action">
            <button class="cu-btn bg-lightBlue shadow-blur round" @tap="SearchSubmit">搜索</button>
        </view>
    </view>
	<view class="content">
		<scroll-view scroll-x class="bg-white nav text-center" :style="'background-color: ' + (skin?'#ffffff':'#ffffff') + ';'">
			<!-- <view v-if="prevcategoryList.length>0" v-for="(item, index) in prevcategoryList" :key="index"  :class="'cu-item ' + (index==TabCur?'text-blue text-shadow text-xl':'') + '  text-bold text-lg'" @tap="tabSelect" :data-id="index" style="line-height:60rpx;">
			    {{index%2==0?item.charAt(0).toUpperCase():item.charAt(0).toLowerCase()}}
			</view>

			<view v-else v-for="(item, index) in 6" :key="index" :class="'cu-item ' + (index==TabCur?'text-blue text-shadow text-xl':'') + '  text-bold text-lg'" @tap="tabSelect" :data-id="index" style="line-height:60rpx;">
			    
			    {{index==0?'U':''}} {{index==1?'n':''}} {{index==2?'i':''}} {{index==3?'B':''}} {{index==4?'l':''}} {{index==5?'o':''}} {{index==6?'g':''}} 
			</view> -->
			<view v-for="(item, index) in 7" :key="index" :class="'cu-item ' + (index==TabCur?'text-blue text-shadow text-xl':'') + '  text-bold text-lg'" @tap="tabSelect" :data-id="index" style="line-height:60rpx;">
			    {{index==0?'U':''}} {{index==1?'n':''}} {{index==2?'i':''}} {{index==3?'B':''}} {{index==4?'l':''}} {{index==5?'o':''}} {{index==6?'g':''}}
			</view>

		</scroll-view>
	</view>

    <!-- 瀑布流 -->
    <!-- <view class="grid col-2 content text-center" bindtouchstart="touchStart" bindtouchend="touchEnd" wx:if="{{0==TabCur}}"> -->
    <view class="grid col-2 content text-center" @touchstart="touchStart" @touchend="touchEnd">
        <view class="fall-left">
            <block v-for="(postitemList, index) in postList" :key="index" v-if="index%2==0">
                <navigator :url="'../post/post?postpath=' + postitemList.path " open-type="navigate" :data-id="index">
                    <view :class="'margin-sm radius shadow-blur bg-img ' + (colourList[(index+randomNum)%10].colour) + ' animation-scale-up'" :style="'margin-right:10rpx; margin-top:0; background-image:url(' + (skin?postitemList.thumbnail:'') + '); animation-delay: ' + ((index+1)*0.2*animationTime) + 's;'">
                        <view class="bg-maskCards flex-sub align-end" style="border-radius:6rpx; height:100%;">
                            <view class="padding-lg text-white">
                                <view class="padding-xs text-xl text-bold text-shadow">
                                    {{postitemList.title.substr(0,postitemList.title.length-3)}}
                                </view>
                            </view>
                        </view>
                    </view>
                </navigator>
            </block>
        </view>
        <view class="fall-right">
            <block v-for="(postitemList, index) in postList" :key="index" v-if="index%2==1">
                <navigator :url="'../post/post?postpath=' + postitemList.path " open-type="navigate" :data-id="index">
                    <view :class="'margin-sm radius shadow-blur bg-img ' + (colourList[(index+randomNum)%10].colour) + ' animation-scale-up'" :style="'margin-left:10rpx; margin-top:0; background-image:url(' + (skin?postitemList.thumbnail:'') + '); animation-delay: ' + ((index+1)*0.2*animationTime) + 's;'">
                        <view class="bg-maskCards flex-sub align-end" style="border-radius:6rpx; height:100%;">
                            <view class="padding-lg text-white">
                                <view class="padding-xs text-xl text-bold text-shadow">
                                    {{postitemList.title.substr(0,postitemList.title.length-3)}}
                                </view>
                            </view>
                        </view>
                    </view>
                </navigator>
            </block>
        </view>
    </view>
    <view class="flex justify-center grid col-1" :hidden="!moreFlag" @touchstart="touchStart" @touchend="touchEnd">
		<image class="cu-avatar  bg-white lg margin-xs"  :src="homeImg" mode="aspectFill" style="width: 100%;height: 500rpx;"></image>
        <view class="text-xs flex justify-center animation-scale-up" style="width:100%; text-align:center;">
            <view class="text-grey">作者会努力更新文章的 . . .</view>
        </view>
        <view class="text-xs flex justify-center" style="height:250rpx;"></view>
    </view>
</scroll-view>
<view :class="'DrawerClose ' + (modalName=='viewModal'?'show':'')" @tap="hideModal">
    <text class="cuIcon-pullright"></text>
</view>
<scroll-view scroll-y :class="'DrawerWindow ' + (modalName=='viewModal'?'show':'')" @touchstart="touchStart" @touchend="touchEnd">
    <view class="cu-list menu card-menu margin-top-xl margin-bottom-xl padding-bottom" style="margin-top:100rpx;">
        <view class="cu-list menu sm-border card-menu margin-top shadow-meow">
            <view class="cu-item" style="min-height: 200rpx;">
                <view v-if="!hasUserInfo && canIUse" class="content grid col-1">
                    <view class="padding-sm text-sm flex justify-center">
                        <text class="text-grey">允许微信授权后，可体验更多功能</text>
                    </view>
                    <view class="padding-sm flex justify-center">
						<!-- #ifndef MP-TOUTIAO -->
						<button open-type="getUserInfo" @getuserinfo="getUserInfo" class="cu-btn round bg-green shadow">
						    授权
						</button>
						<!-- #endif -->
						<!-- #ifdef MP-TOUTIAO -->
						<button  class="cu-btn round action-btn bg-green shadow " @tap="getDYuserinfo">授权</button>
						<!-- #endif -->

                    </view>
                </view>
                <block v-else>
                    <view class="content flex justify-center align-center">
                        <view class="flex-sub">
                            <view class="cu-avatar xl round menu-img" :style="'background-image:url(' + userInfo.avatarUrl + ');'"></view>
                        </view>
                        <view class="flex-twice grid col-1 ">
                            <view class="text-lg margin-xs">
                                <text class="text-black text-bold">{{userInfo.nickName}}</text>
                            </view>
                            <view class="margin-xs bg-white">
                                <view class="cu-tag radius">{{Role}}</view>
                            </view>
                        </view>
                    </view>
                </block>
            </view>
            <view class="cu-item arrow" @tap="showMask">
                <view class="content" >
                    <text class="cuIcon-github text-gray menu-img"></text>
                    <text class="text-grey">GitHub</text>
                </view>
            </view>
            <view class="cu-item arrow" @tap="showzanshangMask">
                <view class="content" >
                    <text class="cuIcon-album text-lightBlue menu-img"></text>
                    <text class="text-grey">赞赏作者</text>
                </view>
            </view>
            <view class="cu-item">
                <view class="content">
                    <text class="cuIcon-skinfill text-gray menu-img"></text>
                    <text class="text-grey">炫图模式</text>
                </view>
                <view class="action">
                    <switch class="switch-theme sm" @change="switchSex"></switch>
                </view>
            </view>
            <view class="cu-item arrow">
                <navigator class="content" hover-class="none" url="../friends/friends" open-type="navigate" @tap="shutDownDrawer">
                    <text class="cuIcon-group_fill text-lightBlue menu-img"></text>
                    <text class="text-grey">Friends</text>
                </navigator>
            </view>
			<view class="cu-item arrow">
			    <button class="cu-btn content" open-type="contact">
			        <text class="cuIcon-communityfill text-gray menu-img"></text>
			        <text class="text-grey">意见反馈</text>
			    </button>
			</view>
			<view class="cu-item arrow">
			    <navigator class="content" hover-class="none" url="../uniblog/uniblog" open-type="navigate" @tap="shutDownDrawer">
			        <text class="cuIcon-formfill text-lightBlue menu-img"></text>
			        <text class="text-grey">关于UniBlog</text>
			    </navigator>
			</view>
			<!-- #ifdef MP-WEIXIN -->
			<view class="cu-item arrow" @tap="toProject">
			    <view class="content" >
			        <text class="cuIcon-file text-gray menu-img"></text>
			        <text class="text-grey">有趣的小程序（情侣大头贴）</text>
			    </view>
			</view>
			<!-- #endif -->
        </view>
    </view>
    
    <view class="grid col-1 text-xs" style="position:fixed;bottom:20rpx;width:100%;text-align:center;">
		<!-- #ifdef MP-WEIXIN -->
		<view class="flex justify-center padding-xs">
		    <view class="text-grey" style="margin-right:4rpx;">{{ miniProgram.envVersion }} Version</view>
		    <view class="text-techBlue text-bold">{{ miniProgram.version }}</view>
		</view>
		<!-- #endif -->
        <view class="flex justify-center">
            <view class="text-grey" style="margin-right:4rpx;">Powered by</view>
            <view class="text-lightBlue">UniBlog</view>
        </view>
    </view>
</scroll-view>
</view>
</template>

<script>
//index.js
//获取应用实例
const app = getApp();
const request = require("../../utils/request.js");
let util = require("../../utils/util.js");
let touchDotX = 0; //X按下时坐标
//X按下时坐标
let touchDotY = 0; //y按下时坐标
//y按下时坐标
let interval; //计时器
//计时器
let time = 0; //从按下到松开共多少时间*100

export default {
  data() {
    return {
	  homeImg:app.globalData.homeImg,
      StatusBar: app.globalData.StatusBar,
      CustomBar: app.globalData.CustomBar,
      Custom: app.globalData.Custom,
      BlogName: app.globalData.BlogName,
      miniProgram: app.globalData.miniProgram,
      hasUserInfo: false,
      canIUse: uni.canIUse('button.open-type.getUserInfo'),
      userInfo: {},
      cardIdex: 1,
      randomNum: 0,
      animationTime: 1,
      moreFlag: false,
      pages: 0,
      cardCur: 0,
      TabCur: 0,
      scrollLeft: 0,
      openid: '',
      Role: '游客',
      roleFlag: false,
      adminOpenid: app.globalData.adminOpenid,
      colourList: [{
        colour: 'bg-red'
      }, {
        colour: 'bg-orange'
      }, {
        colour: 'bg-yellow'
      }, {
        colour: 'bg-olive'
      }, {
        colour: 'bg-green'
      }, {
        colour: 'bg-cyan'
      }, {
        colour: 'bg-blue'
      }, {
        colour: 'bg-purple'
      }, {
        colour: 'bg-mauve'
      }, {
        colour: 'bg-pink'
      }, {
        colour: 'bg-lightBlue'
      }],
      scrollTop: "",
      jinrishici: uni.getStorageSync('jinrishici') || '春江潮水连海平，海上明月共潮生。',
      DotStyle: "",
      swiperList: "",
      towerStart: "",
      direction: "",
      modalName: "",
      postList: [],
      skin: "",
      bannerPost: [],
      SearchContent: "",
	  categoryList:[],
	  prevcategoryList:[],
	  isGithub:true
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
	if (app.globalData.userInfo) {
		this.userInfo = app.globalData.userInfo
		this.hasUserInfo = true 
    } else if (this.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
		app.globalData.userInfoReadyCallback = res => {
			this.userInfo = res.userInfo,
			this.hasUserInfo = true
		};
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      uni.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
		  this.userInfo = res.userInfo,
		  this.hasUserInfo = true
        }
      });
    }

	var that = this; // 云函数调用
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

	let tmpopenid = uni.getStorageSync('openid') || ''
	if (tmpopenid==""){
		uni.login({
		  success: res => {// 发送 res.code 到后台换取 openId, sessionKey, unionId
			uniCloud.callFunction({
				name: 'getopenid',
				data: {
					code:res.code,
					typ:typ,
					apptyp:"blog"//可能会存在多个小程序
				}
			}).then((openres) => {
				console.log(openres)
				if(openres.success){
					if(openres.result.status==0){
						uni.setStorageSync('openid', openres.result.content.openid);
						app.globalData.openid = openres.result.content.openid; 
						that.openid = openres.result.content.openid
						
						if (openres.result.content.openid == that.adminOpenid) {
							that.Role = '管理员',
							that.roleFlag = true
						} else {
							that.Role = '游客',
							that.roleFlag = false
						}
					}
				}
		
				
			
			}).catch((err) => {
				console.error(err)
			})
			
		  }
		}); // 获取用户openid
	}else{
		that.openid = tmpopenid
		if (tmpopenid == that.adminOpenid) {
			that.Role = '管理员',
			that.roleFlag = true
		} else {
			that.Role = '游客',
			that.roleFlag = false
		}
	}
	
	
  },
  onLoad: function () {
    // 在页面中定义插屏广告
    let interstitialAd = null; // 在页面onLoad回调事件中创建插屏广告实例
	//插屏广告之后再加
    // if (uni.createInterstitialAd) {
    //   interstitialAd = uni.createInterstitialAd({
    //     adUnitId: 'adunit-f117e72a7c599593'
    //   });
    //   interstitialAd.onLoad(() => {});
    //   interstitialAd.onError(err => {});
    //   interstitialAd.onClose(() => {});
    // } // 在适合的场景显示插屏广告


    // if (interstitialAd) {
    //   interstitialAd.show().catch(err => {
    //     console.error(err);
    //   });
    // } 
	// 每日诗词

	var self = this
	var urlPostList = app.globalData.url + '/api';
	self.getCategory().then(res=>{
		self.getArticleList(self.TabCur+1).then(res=>{
			self.getJrscToken().then(res=>{
				if(res.code==1){
					console.log("获取到今日诗词token")
					self.getJrscSentence(res.token).then(data=>{
						console.log(data)
					})
				}else{
					console.log("获取今日诗词token失败")
				}
			
			})
		})
		// self.getCategoryContent(self.categoryList[self.TabCur])
	})

	
  },

  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {
    return {
      title: this.jinrishici,
      path: '/pages/index/index',
      imageUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-6rawjgd8tdtl4007ee/ab737080-535f-11eb-b680-7980c8a877b8.jpg'
    };
  },
  
  methods: {
	  // #ifdef MP-QQ
	  onShareAppMessage: function () {
	      qq.showShareMenu({
	      showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment']
	      })
	  },
	  // #endif
	  getDYuserinfo() {
	  	let _this = this
	  	uni.showLoading({
	  		title: '授权中...'
	  	});
	  	uni.login({
	  		provider: 'toutiao',//这里服务商名是字节跳动小程序 所以填toutiao
	  		success: function (loginRes) {
	  			console.log(loginRes);
	  			uni.getUserInfo({
	  				success: res => {
	  					console.log('获取抖音用户信息从我的头像')
	  					console.log(res)
	  					if ((res.userInfo).avatarUrl != void 0) {
	  						// debugger
	  						
	  						uni.hideLoading();
	  					}
	  				},
	  				fail: function(e) {
	  					console.log(e);
	  					uni.hideLoading();
	  					uni.showModal({
	  						title: '图片加载超时',
	  						content: '检查网络，点击确定重新加载'
	  					})
	  				}
	  			});
	  		}
	  	});				
	  },
	  getJrscToken(){
		let token = uni.getStorageSync("jinrishici-token");
		let params = {
			client:"mini-progrram-sdk/1.0"
		}
		let options = {
			baseURL:app.globalData.jrscurl
		}
		return new Promise((resolve, reject) => {
			if(token==undefined || token==""){
				this.$minApi.getJrscToken(params,options).then(res => {
					if (res.ok()) {
						uni.setStorageSync("jinrishici-token", res.data);
						resolve({code:1,token:res.data})
					} else {
						reject({code:0,token:""})
					}
				}).catch(err => {
					reject(err)
				})
			}else{
				resolve({code:1,token:token})
			}

		  })
	  },
	  getJrscSentence(token){
			let self = this
	  		let params = {
	  			client:"mini-progrram-sdk/1.0"
	  		}
	  		let options = {
	  			baseURL:app.globalData.jrscurl,
				header:{
					'X-User-Token':token
				}
	  		}
	  		return new Promise((resolve, reject) => {
				self.$minApi.getJrscSentence(params,options).then(res => {
					if (res.ok()) {
						uni.setStorageSync("jinrishici", res.data.content);
						self.jinrishici = res.data.content
						resolve(res)
					} else {
						reject(res)
					}
				}).catch(err => {
					reject(err)
				})

	  
	  		 })
	  },
	  toProject(){
		  //微信小程序
		  //#ifdef MP-WEIXIN 
		  
		  wx.navigateToMiniProgram({
		    appId: 'wx616e9477f55f3e29', 
		    path: '/pages/my/my',
		    success(res) {
		  	// 打开成功
		    }
		  })
		  //#endif
	  },
    /**
     * 监听屏幕滚动 判断上下滚动
     */
    scroll: function (event) {
		this.scrollTop = event.detail.scrollTop
		// console.log(event)
    },
    //事件处理函数
    bindViewTap: function () {
      uni.navigateTo({
        url: '../logs/logs'
      });
    },
    getUserInfo: function (e) {
      var that = this;

      if (e.detail.errMsg == "getUserInfo:fail auth deny") {
		that.hasUserInfo = false,
		that.Role = '游客'
		that.roleFlag = false
      } else {
        app.globalData.userInfo = e.detail.userInfo;
		that.userInfo = e.detail.userInfo,
        that.hasUserInfo = true
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
		// #ifndef MP-TOUTIAO
		let tmpopenid = uni.getStorageSync('openid') || ''
		if (tmpopenid==""){
			uni.login({
			  success: res => {// 发送 res.code 到后台换取 openId, sessionKey, unionId
				uniCloud.callFunction({
					name: 'getopenid',
					data: {
						code:res.code,
						typ:typ,
						apptyp:"blog"//可能会存在多个小程序
					}
				}).then((openres) => {
					console.log(openres)
					if(openres.success){
						if(openres.result.status==0){
							uni.setStorageSync('openid', openres.result.content.openid);
							app.globalData.openid = openres.result.content.openid; 
							that.openid = openres.result.content.openid
							
							if (openres.result.content.openid == that.adminOpenid) {
								that.Role = '管理员',
								that.roleFlag = true
							} else {
								that.Role = '游客',
								that.roleFlag = false
							}
						}
					}
			
					
				
				}).catch((err) => {
					console.error(err)
				})
				
			  }
			}); // 获取用户openid
		}else{
			that.openid = tmpopenid
			if (tmpopenid == that.adminOpenid) {
				that.Role = '管理员',
				that.roleFlag = true
			} else {
				that.Role = '游客',
				that.roleFlag = false
			}
		}

		// #endif


      }
    },

    DotStyleFun(e) {
		this.DotStyle = e.detail.value
    },

    // cardSwiper
    cardSwiper(e) {
		this.cardCur = e.detail.current
    },

    // towerSwiper
    // 初始化towerSwiper
    towerSwiper(name) {
		let list = this[name];

		for (let i = 0; i < list.length; i++) {
			list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2));
			list[i].mLeft = i - parseInt(list.length / 2);
		}
		this.swiperList = list
    },

    // towerSwiper触摸开始
    towerStartFun(e) {
		this.towerStart = e.touches[0].pageX
    },

    // towerSwiper计算方向
    towerMove(e) {
		this.direction = e.touches[0].pageX - this.towerStart > 0 ? 'right' : 'left'
    },

    // towerSwiper计算滚动
    towerEnd(e) {
		let direction = this.direction;
		let list = this.swiperList;

		if (direction == 'right') {
			let mLeft = list[0].mLeft;
			let zIndex = list[0].zIndex;

			for (let i = 1; i < list.length; i++) {
				list[i - 1].mLeft = list[i].mLeft;
				list[i - 1].zIndex = list[i].zIndex;
			}

			list[list.length - 1].mLeft = mLeft;
			list[list.length - 1].zIndex = zIndex;
			this.swiperList = list
		} else {
			let mLeft = list[list.length - 1].mLeft;
			let zIndex = list[list.length - 1].zIndex;

			for (let i = list.length - 1; i > 0; i--) {
				list[i].mLeft = list[i - 1].mLeft;
				list[i].zIndex = list[i - 1].zIndex;
			}

			list[0].mLeft = mLeft;
			list[0].zIndex = zIndex;
			this.swiperList =  list
		}
    },

    showModal(e) {
		console.log(e);
		this.modalName = e.currentTarget.dataset.target
    },

    hideModal(e) {
		this.modalName = null
    },

    tabSelect(e) {
		this.randomNumFun();
		var urlPostList = app.globalData.url + '/api';
		var token = app.globalData.token; // console.warn(e.currentTarget.dataset.id);

		// if(this.categoryList.length>0){
		// 	this.getCategoryContent(this.categoryList[e.currentTarget.dataset.id])
		// }
		this.getArticleList(parseInt(e.currentTarget.dataset.id)+1)
		this.TabCur = e.currentTarget.dataset.id,
		this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60

    },

    switchSex: function (e) {
      // console.warn(e.detail.value);
		app.globalData.skin = e.detail.value;
		console.log(app.globalData.skin);
		this.skin = e.detail.value
    },
    // 触摸开始事件
    touchStart: function (e) {
		touchDotX = e.touches[0].pageX; // 获取触摸时的原点

		touchDotY = e.touches[0].pageY; // 使用js计时器记录时间    

		interval = setInterval(function () {
			time++;
		}, 100);
    },
    // 触摸结束事件
    touchEnd: function (e) {
		let touchMoveX = e.changedTouches[0].pageX;
		let touchMoveY = e.changedTouches[0].pageY;
		let tmX = touchMoveX - touchDotX;
		let tmY = touchMoveY - touchDotY;

		if (time < 20) {
			let absX = Math.abs(tmX);
			let absY = Math.abs(tmY);

			if (absX > 2 * absY) {
				if (tmX < 0) {
					this.modalName = null
				} else {
					this.modalName = 'viewModal'
				}
			}

			if (absY > absX * 2 && tmY < 0) {
				console.log("上滑动=====");
			}
		}

		clearInterval(interval); // 清除setInterval

		time = 0;
    },
    // 关闭抽屉
    shutDownDrawer: function (e) {
		this. modalName = null
    },
    //冒泡事件
    maopao: function (e) {
      console.log("冒泡...");
    },
    showMask: function (e) {
	  this.isGithub = true
	  this.$refs.authorCardId.showMask();
      this.shutDownDrawer();
    },
	showzanshangMask: function (e) {
	  this.isGithub = false
	  this.$refs.authorCardId.showMask();
	  this.shutDownDrawer();
	},
    //获取随机数
    randomNumFun: function () {
		var num = Math.floor(Math.random() * 10);
		this.randomNum = num
    },

    /**
     * 加载更多
     */
    loadMore: function () {},
	

	/**
	 * 参数: page || search || 无
	 */
	getArticleList:function(page){
		let params = {
			page:page
		}
		return new Promise((resolve, reject) => {
			this.$minApi.getArticleList(params).then(res => {
				if (res.ok()) {
					this.postList = []
					if(res.content.Total>0){
						let tempimglist = JSON.parse(JSON.stringify(app.globalData.bannerimglist))
						let list = JSON.parse(JSON.stringify(res.content.Markdowns))
						for (let i = 0; i < list.length; ++i) {
							let imgindex = Math.floor(Math.random() * tempimglist.length)
							list[i].thumbnail = tempimglist[imgindex]
							tempimglist.splice(imgindex,1);
						}
						// console.log(list)
						this.postList = list
						this.pages = 10
						this.moreFlag = list.length>0?false:true
	
						
					}else{
						this.moreFlag = true
					}
						  
					
					
					resolve(res)
				} else {
					this.moreFlag = true
					reject(res)
				}
			}).catch(err => {
				reject(err)
			})
		})
	},

	/**
	 * banner图
	 * 参数: page || search || 无
	 */
	
	getCategory:function(){		
		let params = {
			// page:1
		}
		return new Promise((resolve, reject) => {
			this.$minApi.getCategory(params).then(res => {
				if (res.ok()) {
					if(res.content.length>0){
						let list = res.content[res.content.length-1].MarkdownFileList
						let tempimglist = JSON.parse(JSON.stringify(app.globalData.bannerimglist))
						for (let i = 0; i < list.length; ++i) {
							let imgindex = Math.floor(Math.random() * tempimglist.length)
							
							// var format = list[i].date.replace(/-/g, '/')
							// var timestamp = Date.parse(new Date(format))
							// list[i].createTime = util.customFormatTime(timestamp, 'Y.M.D');
							// list[i].createTime = util.formatRightTime(new Date(list[i].date),'yyyy-MM-dd')
							
							list[i].thumbnail = tempimglist[imgindex]
							tempimglist.splice(imgindex,1);
						}
						this.bannerPost = list
						this.prevcategoryList = []
						this.categoryList = []
						for (let j = 0; j < res.content.length; ++j) {
							if(j<6){
								this.prevcategoryList.push(res.content[j].Name)
							}
							this.categoryList.push(res.content[j].Name)
						}
						
						
						
					}
					resolve(res)
				} else {
					reject(res)
				}
			}).catch(err => {
				reject(err)
			})
		})
	},
	
	/**
	 * 分类 分类的详细内容
	 * 参数: name
	 */
	
	getCategoryContent:function(categoryname){
		let params = {
			name:categoryname
		}
		return new Promise((resolve, reject) => {
			this.$minApi.getCategoryContent(params).then(res => {
				console.log(res)
				if (res.ok()) {
					this.postList = []
					if(res.content.Total>0){
						let tempimglist = JSON.parse(JSON.stringify(app.globalData.bannerimglist))
						let list = JSON.parse(JSON.stringify(res.content.Markdowns))
						for (let i = 0; i < list.length; ++i) {
							let imgindex = Math.floor(Math.random() * tempimglist.length)
							list[i].thumbnail = tempimglist[imgindex]
							tempimglist.splice(imgindex,1);
						}
						// console.log(list)
						this.postList = list
						this.pages = 10
						this.moreFlag = false
					}
						  


					resolve(res)
				} else {
					this.moreFlag = true
					reject(res)
				}
			}).catch(err => {
				reject(err)
			})
		})
	},


    /**
     * 后台登入请求--接口调用成功处理
     */
    successAdminLogin: function (res, selfObj) {
      var that = this; // that.setData({
      //     access_token: res.data.access_token,
      //     refresh_token: res.data.refresh_token
      // })

      app.globalData.adminToken = res.data.access_token; // clearTimeout(delay);
      // console.warn(res)
    },

    /**
     * 后台登入请求--接口调用失败处理
     */
    failAdminLogin: function (res, selfObj) {
      console.error('failAdminLogin', res);
    },

    /**
     * 搜索文章模块
     */
    Search: function (e) {
		var content = e.detail.value.replace(/\s+/g, ''); // console.log(content);
		var that = this;
		that.SearchContent = content
    },
    SearchSubmit: function (e) {
      		
		let params = {
			search:this.SearchContent
		}
		return new Promise((resolve, reject) => {
			this.$minApi.getArticleList(params).then(res => {
				if (res.ok()) {
					this.postList = []
					this.pages = 10
					if(res.content.Total>0){
						let tempimglist = JSON.parse(JSON.stringify(app.globalData.bannerimglist))
						let list = JSON.parse(JSON.stringify(res.content.Markdowns))
						for (let i = 0; i < list.length; ++i) {
							let imgindex = Math.floor(Math.random() * tempimglist.length)
							// var format = list[i].date.replace(/-/g, '/')
							// var timestamp = Date.parse(new Date(format))
							// list[i].createTime = util.customFormatTime(timestamp, 'Y.M.D');
							// list[i].createTime = util.formatRightTime(new Date(list[i].date),'yyyy-MM-dd')
							list[i].thumbnail = tempimglist[imgindex]
							tempimglist.splice(imgindex,1);
						}
						this.postList = list
						this.moreFlag = false

					}else{
						this.moreFlag = true
					}
						  
		
		
					resolve(res)
				} else {
					this.moreFlag = true
					reject(res)
				}
			}).catch(err => {
				reject(err)
			})
		})
		

    },
    successSearch: function (res, selfObj) {
		var that = this; // console.warn(res.data.content);

		var list = res;

		// for (let i = 0; i < list.length; ++i) {
			// list[i].createTime = util.customFormatTime(list[i].createTime, 'Y.M.D');
			// list[i].createTime = list[i].date.substring(0,10)
		// }
		that.postList = res
		that.pages = 10
		if (res != "") {
			that.moreFlag = false
		}else{
			that.moreFlag = true
		}
    },
    failSearch: function (res, selfObj) {
      console.error('failSearch', res);
    }
  }
};
</script>
<style>
@import "./index.css";
</style>
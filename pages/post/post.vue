<template>
	<view>
		<!-- #ifndef MP-ALIPAY -->
		<cu-custom bgColor="bg-gradual-blue" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">文章</block>
		</cu-custom>
		<!-- #endif -->

		<scroll-view scroll-y class="DrawerPage"  scroll-with-animation="true" :style="'background-color: ' + (skin?'#ffffff':'#ffffff') + ';width:'+windowWidth+'px;height:'+windowHeight+'px;'">
		<!-- <view class=""> -->
			
			<view class="flex-sub text-center margin-sm">
			  <view class="text-xxxl">
				<text class="text-black text-bold">{{postTitle}}</text>
			  </view>
			</view>
					
			<view class="margin-lr-sm flex flex-wrap">
				<view class="padding-xs bg-white">
					<!-- <view class="cu-tag radius sm">Java</view> -->
					<view v-for="(postTags, index) in postTags" :key="index" class="cu-tag radius">{{postTags.name}}</view>
				</view>
			</view>
		
			<view class="cf">
				<view class="margin-sm fr">
					<view class="cu-capsule round">
						<view class="cu-tag bg-red sm">
							<text class="cuIcon-likefill"></text>
						</view>
						<view class="cu-tag line-red sm">
						{{postLikes}}
						</view>
					</view>
					<view class="cu-capsule round">
						<view class="cu-tag bg-orange sm">
							<text class="cuIcon-hotfill"></text>
						</view>
						<view class="cu-tag line-orange sm">
						{{postVisits}}
						</view>
					</view>
					<view class="cu-capsule round">
						<view class="cu-tag  bg-blue sm">
							<text class="cuIcon-timefill"></text>
						</view>
						<view class="cu-tag line-blue sm">
						{{postDate}}
						</view>
					</view>
					<text class="cu-capsule" decode="true">&nbsp;</text>
				</view>
			</view>
		
			<view class="margin-sm">
				<u-parse :content="postContent"  @preview="preview" @navigate="navigate" />
				<!-- <htmltowxml :text="postContent" type="md" :highlightStyle="style" linenums="false" showLoading="false" @WxmlTagATap="wxmlTagATap" imghost></htmltowxml> -->
			</view>
			
			<!-- <view class="ad">
				<ad unit-id="adunit-da5b1800a9eae6d3" ad-intervals="30"></ad>
			</view> -->
			
			<!-- #ifndef MP-QQ -->
			
			<view class="cu-bar bg-white align-center">
				<view class="action border-title">
					<text class="text-xxl text-bold text-blue">评论</text>
					<text class="bg-gradual-blue"></text>
				</view>
			</view>
		
		<!-- 评论接口 -->
			<view class="cu-bar input" >
				<!-- <view class="action">
					<text class="cuIcon-sound text-grey"></text>
				</view> -->
				<view class="flex justify-center" style="width:100%" v-if="!hasUserInfo && canIUse"> 
					<view>
						<button class="cu-btn bg-blue shadow-blur round" role="button" aria-disabled="false" open-type="getUserInfo" @getuserinfo="getUserInfo">授权后可评论</button>
					</view>
				</view>
				<block v-else>
					<input @input="Comment" style="margin-left: 40rpx;" class="solid-bottom" type="text"  maxlength="300" cursor-spacing="10" placeholder="尽管吐槽吧....." :value="commentValue"></input>
					<view class="action">
						<text :class="like?'cuIcon-likefill text-red':'cuIcon-like text-grey'" @tap="Likes"></text>
					</view>
					<button class="cu-btn bg-lightBlue shadow-blur" @tap="CommentSubmit" :hidden="CommentShow">发送</button>
					<button class="cu-btn bg-grey shadow-blur" @tap="CommentSubmitTips" :hidden="!CommentShow">{{LastTime}}S</button>
				</block>
			</view>
			
			<view class="margin-bottom">
				<view v-for="(commentItem, index) in commentList" :key="index" class="margin-sm flex flex-wrap align-center" :data-id="index">
					<view class="basis-xs">
						<image class="cu-avatar lg round margin-left-sm" :src="commentItem.avatarurl==''?'/static/image/none.png':commentItem.avatarurl" mode="aspectFit"></image>
					</view>
					<view :class="'grid col-1 basis-xl solid-bottom'" style="min-height:120rpx;">
						<view class="padding-xs">
							<text class="text-black text-bold">{{commentItem.author}}</text>
							<view class="fr text-xs" style="line-height: 32rpx;">
								<text class="text-grey">{{commentItem.created_at}}</text>
							</view>
						</view>
						<view class="padding-sm">
							<text class="text-sm">{{commentItem.content}}</text>
						</view>
					</view>
				</view>
			</view>
		
			<!-- #endif -->
		
		 
			
		
		
		<!-- </view> -->
		</scroll-view>
	</view>
</template>

<script>
// miniprogram/pages/post/post.js
const app = getApp();
const request = require("../../utils/request.js");
let time = require("../../utils/util.js");
var countdown = 60;
import uParse from '@/components/gaoyia-parse/parse.vue'
import marked from 'marked'
export default {
	components:{
	   uParse
	},
	data() {
		return {
			windowHeight: app.globalData.windowHeight-app.globalData.CustomBar,
			windowWidth:app.globalData.windowWidth,
			StatusBar: app.globalData.StatusBar,
			CustomBar: app.globalData.CustomBar,
			Custom: app.globalData.Custom,
			skin: app.globalData.skin,
			style: app.globalData.highlightStyle,
			hasUserInfo: false,
			canIUse: uni.canIUse('button.open-type.getUserInfo'),
			CommentShow: false,
			ButtonTimer: '',
			//  按钮定时器
			LastTime: 60,
			commentValue: '',
			postPath: "",
			userInfo: "",
			postTitle: "",
			postVisits: 0,
			postLikes: 0,
			postContent: "",
			postDate: "",
			postTags: "",
			postThumbnail: "",
			commentList: [],
			CommentContent: "",
			like:false
		};
	},

	props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 在页面中定义插屏广告
    let interstitialAd = null; // 在页面onLoad回调事件中创建插屏广告实例

    // if (uni.createInterstitialAd) {
    //   interstitialAd = uni.createInterstitialAd({
    //     adUnitId: 'adunit-296c920c08da636d'
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

    var postpath = options.postpath; 
	this.postPath = postpath
	let self = this
	self.addVisits(postpath).then(
		self.listComments(postpath).then(
			self.getArticleContent(postpath)
		)
	)
	
	
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
	  
    // console.warn(app.userInfo);
    if (app.globalData.userInfo) {
		this.userInfo = app.globalData.userInfo
		this.hasUserInfo = true
    } else if (this.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.globalData.userInfoReadyCallback = res => {
		  this.userInfo = res.userInfo
          this.hasUserInfo = true
      };
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      uni.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
		  this.userInfo = res.userInfo
		  this.hasUserInfo = true
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    // console.warn(this.data.postId);
    return {
      title: this.postTitle,
      path: '/pages/post/post?postpath=' + this.postPath,
      imageUrl: this.postThumbnail
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
	  preview(src, e) {
	    // do something
	  },
	  navigate(href, e) {
	    // do something
	  },
    /**
     * 用户点击右上角分享
     */
    onShareTimeline: function () {
      // console.warn(this.data.postId);
      return {
        title: this.postTitle,
        path: '/pages/post/post?postpath=' + this.postPath,
        imageUrl: this.postThumbnail
      };
    },
    getUserInfo: function (e) {
		// console.log(e)
		app.globalData.userInfo = e.detail.userInfo; 
		// app.nickName = e.detail.userInfo.nickName;
		// app.avatarUrl = e.detail.userInfo.avatarUrl;
		this.userInfo = e.detail.userInfo
		this.hasUserInfo = true
    },
	
	/**
	 * 获取文章内容
	 * 参数: path
	 */
	getArticleContent:function(path){
		this.postTitle = ""
		this.postContent = ""
		this.postDate = ""
		this.postThumbnail = ""
		this.postTags = ""
		this.postLikes = 0
		let params = {
			path:path
		}
		return new Promise((resolve, reject) => {
			this.$minApi.getArticleContent(params).then(res => {
				if (res.ok()) {
					let imgindex = Math.floor(Math.random() * app.globalData.bannerimglist.length)
					let thumbnail = app.globalData.bannerimglist[imgindex]
					this.postTitle = res.content.title

					this.postContent = marked(res.content.Body)
					// var format = list[i].date.replace(/-/g, '/')
					// var timestamp = Date.parse(new Date(format))
					this.postDate = res.content.date.substring(0,10)
					this.postThumbnail = thumbnail
					this.postTags = res.content.tags
					
					resolve(res)
				} else {
					reject(res)
				}
			}).catch(err => {
				reject(err)
			})
		})
	},
	listComments:function(path){
		this.commentList = []
		let openid = app.globalData.openid==""?uni.getStorageSync('openid') || '':app.globalData.openid
		return new Promise((resolve, reject) => {
			uniCloud.callFunction({
				name: 'listcomment',
				data: { path:  path }
			}).then((res) => {
				console.log("获取评论列表中......")
				let list = res.result.data
				if(list.length>0){
					let templist = []
					for (let i = 0; i < list.length; ++i) {
						if(list[i].openid==openid){
							if(list[i].islike==1){
								this.like = true
							}else{
								this.like = false
							}
						}
						if(list[i].content=="" || list[i].content==undefined){
							continue
						}
						//list[i].created_at 时间戳*1000来计算的
						list[i].created_at = time.customFormatTime(list[i].created_at, 'Y-M-D  h:m:s');
						templist.push(list[i])
					}
					this.commentList = templist
				}
				console.log(this.commentList)
				resolve({"code":1})
			}).catch((err) => {
				console.error(err)
				reject({"code":0})
			})
		})

	},
	
	//添加浏览量
	addVisits:function(path){
		let that = this
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
		return new Promise((resolve, reject) => {
			uniCloud.callFunction({
				name: 'addvisit',
				data: {
					path:path,
					typ:typ
				}
			}).then((res) => {
				console.log(res)
				if(res.success){
					if(res.result.status==0){
						that.postVisits = res.result.visits
						that.postLikes = res.result.likes
					}
				}
				resolve({"code":1})
			}).catch((err) => {
				console.error(err)
				reject({"code":0})
			})
		})
	},

    /**
     * 评论模块
     */
    Comment: function (e) {
      var content = e.detail.value.replace(/\s+/g, ''); // console.log(content);

      var that = this;
	  that.CommentContent = content
    },
	CommentSubmit: function (e) {
	  // console.warn(this.userInfo);
	  var that = this;
	
	
	  if (!that.CommentContent) {
	    uni.showToast({
	      title: '评论内容不能为空！',
	      icon: 'none',
	      duration: 2000
	    }); // console.error("评论内容为空!");
	  } else {
			that.CommentShow = true
			that.ButtonTimer = setInterval(function () {
				if (countdown == 0) {
					that.CommentShow = false
					countdown = 60;
					clearInterval(that.ButtonTimer);
					return;
				} else {
					that.LastTime = countdown
					countdown--;
				}
			}, 1000); 
			let data = {
				path:  that.postPath,
				content:that.CommentContent,
			}
			data.openid = app.globalData.openid==""?uni.getStorageSync('openid') || '':app.globalData.openid
			if(that.hasUserInfo){
				data.author = that.userInfo.nickName
				data.avatarurl = that.userInfo.avatarUrl
			}
			data.apptyp = "blog"//可能会存在多个小程序
			// #ifdef MP-WEIXIN
			console.log('微信内容检测中...')
			data.typ = 1
			// #endif
			uniCloud.callFunction({
				name: 'addcomment',
				data: data
			}).then((res) => {
				console.log("添加言论中......")
				console.log(res)
				if(res.success){
					if(res.result.status==0){
						let newlist = data
						newlist.created_at = time.customFormatTime(new Date().getTime(), 'Y-M-D  h:m:s');
						let chooseflag = false
						that.commentList.map((item,index)=>{
							if(item.openid==data.openid){
								chooseflag = true
								that.$set(item,'created_at',newlist.created_at)
								that.$set(item,'content',newlist.content)
							}
						})
						if(!chooseflag){
							that.commentList.push(newlist)
						}
						uni.showToast({
						  title: '感谢您的评论与支持！',
						  icon: 'none',
						  duration: 2000
						});
					}else{
						uni.showToast({
						  title: res.result.msg,
						  icon: 'none',
						  duration: 2000
						});
						that.commentValue = "",
						that.CommentContent = undefined
					}
					
				}else{
					uni.showToast({
					  title: '言论提交失败，重新提交哦！',
					  icon: 'none',
					  duration: 2000
					});
					that.commentValue = "",
					that.CommentContent = undefined
				}
				
			}).catch((err) => {
				console.error(err)
				uni.showToast({
				  title: '言论提交失败！',
				  icon: 'none',
				  duration: 2000
				});
				that.commentValue = "",
				that.CommentContent = undefined
			})
		}
	},
    CommentSubmitTips: function () {
      uni.showToast({
        title: this.LastTime + "s 后再次评论",
        icon: 'none',
        duration: 1000
      });
    },
    Likes: function () {
		let that = this
		that.like = that.like?false:true
		let data = {
			path:  that.postPath
		}
		data.islike = that.like?1:0
		data.openid = app.globalData.openid==""?uni.getStorageSync('openid') || '':app.globalData.openid
		if(that.hasUserInfo){
			data.author = that.userInfo.nickName
			data.avatarurl = that.userInfo.avatarUrl
		}
		uniCloud.callFunction({
			name: 'addcomment',
			data: data
		}).then((res) => {
			console.log("点赞中......")
			console.log(res)
			if(res.success){
				let msg = "取消点赞了哦~"
				if(that.like){
					msg = "感谢您的点赞与支持！"
					that.postLikes+=1
				}else{
					that.postLikes-=1
					if(that.postLikes<0){
						that.postLikes = 0
					}
				}
				uni.showToast({
				  title: msg,
				  icon: 'none',
				  duration: 2000
				});
			}else{
				let msg = "取消点赞失败了,请重新提交哦~"
				if(that.like){
					msg = "文章点赞失败,重新提交哦！"
				}
				uni.showToast({
				  title: msg,
				  icon: 'none',
				  duration: 2000
				});
				that.commentValue = "",
				that.CommentContent = undefined
			}
		
		}).catch((err) => {
			console.error(err)
			let msg = "取消点赞失败了"
			if(that.like){
				msg = "文章点赞失败!"
			}
			uni.showToast({
			  title: msg,
			  icon: 'none',
			  duration: 2000
			});
			that.commentValue = "",
			that.CommentContent = undefined
		})
    }

  }
};
</script>
<style>
@import "./post.css";
</style>
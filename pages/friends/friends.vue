<template>
<scroll-view scroll-y class="DrawerPage" scroll-with-animation="true" :style="'background-color: ' + (skin?'#ffffff':'#ffffff') + ';'">

    <cu-custom bgColor="bg-gradual-blue" :isCustom="true" isNav="false">
        <view slot="backText">返回</view>
        <view slot="content" class="text-shadow-meows">
            <!-- <text class="text-white text-bold">WeHalo</text> -->
        </view>
    </cu-custom>

    <view class="cu-bar justify-center bg-white margin-sm">
        <view class="action sub-title">
            <text class="text-xxl text-bold text-black">友情链接</text>
            <text class="text-ABC text-black">Friends</text>
            <!-- last-child选择器-->
        </view>
    </view>

    <block v-for="(item, index) in LinksList" :key="index">
        <view :class="'margin-sm FriendsRound shadow-blur ' + (colourList[(index+randomNum)%10].colour) + ' animation-slide-bottom margin-lr-df margin-tb-df'" :style="'animation-delay: ' + ((index+1)*0.6*animationTime) + 's;'" @tap.stop="prevent" :data-url="item.url">
            <view class="flex-sub align-end" style="border-radius:6rpx; height:100%;">
                <view class="padding-sm text-white">
                    <view class="padding-xs flex flex-wrap align-center">
                        <view class="basis-xs">
                            <view class="cu-avatar xl round shadow-blur margin-right-lg" :style="'background-image:url(' + item.logo + ');'"></view>
                        </view>
                        <view class="grid col-1" style="flex-basis: 74%">
                            <view class="margin-bottom-sm text-xl text-bold text-shadow">{{item.name}}</view>
                            <view class="text-shadow margin-bottom-sm">{{item.description}}</view>
                            <view class="text-shadow text-bold" style="text-align: right;">{{item.url}}</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </block>

</scroll-view>
</template>

<script>
// miniprogram/pages/wehalo/wehalo.js
//获取应用实例
const app = getApp();
const request = require("../../utils/request.js");

export default {
  data() {
    return {
      StatusBar: app.globalData.StatusBar,
      CustomBar: app.globalData.CustomBar,
      Custom: app.globalData.Custom,
      skin: app.globalData.skin,
      loading: true,
      animationTime: 1,
      LinksList: '',
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
      randomNum: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.randomNumFun();
	this.listLinks()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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
  onShareAppMessage: function () {},
  methods: {
	  // #ifdef MP-QQ
	  onShareAppMessage: function () {
	      qq.showShareMenu({
	      showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment']
	      })
	  },
	  // #endif
	listLinks:function(){
	  	this.LinksList = []
	  	uniCloud.callFunction({
	  		name: 'listlinks'
	  	}).then((res) => {
	  		console.log("获取评论列表中......")
	  		let list = res.result.data
	  		
	  		this.LinksList = list
	  	}).catch((err) => {
	  		console.error(err)
	  	})
	},
    //获取随机数
    randomNumFun: function () {
      var num = Math.floor(Math.random() * 10);
      this.setData({
        randomNum: num
      });
    },

    prevent(event) {
      // console.log(event.currentTarget.dataset.url);
      var self = this;
      uni.setClipboardData({
        data: event.currentTarget.dataset.url
      });
    }

  }
};
</script>
<style>
@import "./friends.css";
</style>
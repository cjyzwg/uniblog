<template>
<scroll-view scroll-y class="DrawerPage" scroll-with-animation="true" :style="'background-color: ' + (skin?'#ffffff':'#ffffff') + ';'">

    <cu-custom bgColor="bg-gradual-blue" :isCustom="true" isNav="false">
        <view slot="backText">返回</view>
        <view slot="content" class="text-shadow-meows">
            <!-- <text class="text-white text-bold">WeHalo</text> -->
        </view>
    </cu-custom>
	<image class="cu-avatar  bg-white lg margin-xs"  :src="homeImg" mode="aspectFill" style="width: 100%;height: 500rpx;"></image>

    <view class="cu-timeline">

        <view class="cu-item text-blue cuIcon-favorfill">
            <view class="bg-blue content shadow-blur">
                <wh-typeWriter whContent=" UniBlog 正式开源"></wh-typeWriter>
                <text decode="true" space="true">&nbsp;</text>
            </view>
        </view>
        
        <view class="cu-time">2021.01.12</view>
		
		<view class="cu-item text-green">
		    <view class="bg-purple content shadow-blur">
		        完成UniBlog接口重新封装改造
		    </view>
		</view>

        <view class="cu-item text-orange">
            <view class="bg-purple content shadow-blur">
                使用WeHalo的样式打造属于自己的博客
            </view>
        </view>
        
        
        <view class="cu-time">2021.01.09</view>
		
		<view class="cu-item text-green">
		    <view class="bg-green content shadow-blur">
		        使用github上的golang开源博客并进行api改造
		    </view>
		</view>

        <view class="cu-item text-green">
            <view class="bg-green content shadow-blur">
               一开始博主也使用halo做服务端，但是因为是java开发的，所以放弃
            </view>
        </view>
        <view class="cu-time">2020.01.03</view>
		
        <view class="cu-item text-orange">
            <view class="bg-orange content shadow-blur">
                两年后博主才发现这个简约版的博客,感谢wehalo作者
            </view>
        </view>
        <view class="cu-time">2020.01.02</view>

        <view class="cu-item text-red cuIcon-favorfill">
            <view class="content bg-red shadow-blur">
                WeHalo在GitHub上创建开源项目  
            </view>
        </view>
        <view class="cu-time">2018.11.26</view>

    </view>

    <view class="text-xs flex justify-center" style="margin-bottom: 20rpx; width: 100%; text-align: center;">
        <view class="text-grey" style="margin-right:4rpx;">Powered by</view>
        <view class="text-lightBlue">UniBlog</view>
    </view>
</scroll-view>
</template>

<script>
//获取应用实例
const app = getApp();

export default {
  data() {
    return {
		homeImg:app.globalData.homeImg,
		StatusBar: app.globalData.StatusBar,
		CustomBar: app.globalData.CustomBar,
		Custom: app.globalData.Custom,
		skin: app.globalData.skin,
		loading: true
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

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
  }
};
</script>
<style>
@import "./uniblog.css";
</style>
<template>
<!-- 蒙版效果 -->
<view class="mask" :hidden="isHidden" @tap.stop="closeMask">
    <view class="masks" @tap.stop="prevent" :animation="ani">
        <view class="box" v-if="isGithub">	
            <image class="leftImage" mode="widthFix" src="/static/image/qrcode_1.png" ></image>
            <view class="right">
                <view class="title">
                    <text class="name">NickCJ</text>
                </view>
                <view class="info">
                    <view class="field">Email</view>
                    <view class="value">1044035278@qq.com</view>
                    <view class="field">Github</view>
                    <view class="value">https://github.com/cjyzwg</view>
                </view>
            </view>
        </view>
		<view class="box" style="justify-content: center;" v-else>
			<image src="/static/image/qrcode_2.png" mode="aspectFit"></image>
		</view>
    </view>
</view>
</template>

<script>

export default {
  data() {
    return {
      ani: "",
	  isHidden:true
    };
  },

  components: {},
  props: {
    isGithub: {
      type: [Boolean, String],
      default: true
    }
  },
  beforeMount: function () {
    // 在组件实例进入页面节点树时执行
	this.isHidden = true
  },
  destroyed: function () {// 在组件实例被从页面节点树移除时执行
  },
  methods: {
    /**
     * 防止冒泡
     */
    prevent() {
      console.log("防止冒泡");
      var self = this;
      uni.setClipboardData({
        data: "https://github.com/cjyzwg"
      });
    },

    showMask() {
      // console.warn("showMask...")
	  this.isHidden = false
      var animation = uni.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
        delay: 0
      });
      animation.opacity(1).translate(uni.getSystemInfoSync().windowWidth, 0).step();
	  this.ani = animation.export()
    },

    closeMask() {
      // console.warn("closeMask...")
      var that = this;
      var animation = uni.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
        delay: 0
      });
      animation.opacity(0).translate(-uni.getSystemInfoSync().windowWidth, 0).step();
	  that.ani = animation.export()
      setTimeout(function () {
		  that.isHidden = true
      }, 600);
    }

  }
};
</script>
<style>
@import "./wh-authorCard.css";
</style>
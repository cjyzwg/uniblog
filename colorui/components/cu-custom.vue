<template>
<view class="cu-custom" :style="'height:' + CustomBar + 'px; z-index:2000; position: ' + isFixed + ';'" :hidden="isNav">
    <!-- <view class="cu-bar fixed {{bgImage!=''?'none-bg text-white bg-img':''}} {{bgColor}}" style="height:{{CustomBar}}px;padding-top:{{StatusBar}}px;{{bgImage?'background-image:url(' + bgImage+')':''}}"> -->
    <view :class="'cu-bar fixed ' + (bgImage!=''?'none-bg text-white bg-img':'') + ' ' + bgColor" :style="'padding-right:0rpx;height:' + CustomBar + 'px;padding-top:' + StatusBar + 'px;' + (bgImage?'background-image:url(' + bgImage+')':'')">
        <image style="height:100rpx; position: absolute; bottom: 0rpx;" src="/static/image/wave.gif" mode="scaleToFill" class="gif-black response"></image>
        <view class="action" @tap="BackPage" v-if="isBack">
            <text class="cuIcon-back"></text>
            <slot name="backText"></slot>
        </view>
        <view class="action border-custom" v-if="isCustom" :style="'width:' + Custom.width + 'px;height:' + Custom.height + 'px;margin-left:calc(750rpx - ' + Custom.right + 'px)'">
            <text class="cuIcon-back" @tap="BackPage"></text>
            <text class="cuIcon-homefill" @tap="toHome"></text>
        </view>
        <view class="content" :style="'top:' + StatusBar + 'px'">
            <slot name="content"></slot>
        </view>
        <slot name="right"></slot>
    </view>
</view>
</template>

<script>
const app = getApp();

export default {
  data() {
    return {
      StatusBar: app.globalData.StatusBar,
      CustomBar: app.globalData.CustomBar,
      Custom: app.globalData.Custom
    };
  },

  components: {},
  props: {
    bgColor: {
      type: String,
      default: ''
    },
    isCustom: {
      type: [Boolean, String],
      default: false
    },
    isBack: {
      type: [Boolean, String],
      default: false
    },
    bgImage: {
      type: String,
      default: ''
    }
  },

  /**
   * 组件的一些选项
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  methods: {
    BackPage() {
      uni.navigateBack({
        delta: 1
      }).catch(error => {
        console.info("error", error);
        uni.reLaunch({
          url: '/pages/index/index'
        });
      });
    },

    toHome() {
      uni.reLaunch({
        url: '/pages/index/index'
      });
    }

  }
};
</script>
<style>
@import "./cu-custom.css";
</style>
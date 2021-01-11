<template>
<view class="box" v-if="SHOW_TOP">
    <view class="arrow"></view>
    <!-- <view class='body' bindtap='showModal'> -->
    <view class="body">
        <text>{{text}}</text>
    </view>
</view>

<!-- 点击「添加到我的小程序」 -->
</template>

<script>

export default {
  data() {
    return {
      SHOW_TOP: false,
      SHOW_MODAL: false
    };
  },

  components: {},
  props: {
    // 提示文字
    text: {
      type: String,
      default: '点击「添加到我的小程序」'
    },
    // 多少秒后关闭
    duration: {
      type: Number,
      default: 5
    }
  },
  mounted: function () {
    this.setData({
      SHOW_TOP: true
    }); // 关闭时间

    setTimeout(() => {
      this.setData({
        SHOW_TOP: false
      });
    }, this.duration * 1000);
  },
  methods: {}
};
</script>
<style>
@import "./wh-addTips.css";
</style>
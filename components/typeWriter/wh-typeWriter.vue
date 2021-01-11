<template>
<view>
{{whContent}}
</view>
</template>

<script>

export default {
  data() {
    return {};
  },

  components: {},
  props: {
    whContent: {
      type: String,
      default: ' '
    }
  },
  beforeMount: function () {// 在组件实例进入页面节点树时执行
  },
  destroyed: function () {// 在组件实例被从页面节点树移除时执行
  },
  mounted: function () {
    // 在组件在视图层布局完成后执行
    var that = this; //文字逐个显示

    var story = this.whContent;
    var i = 0;
    var time = setInterval(function () {
      var text = story.substring(0, i);
      i++;
      that.setData({
        whContent: text
      });

      if (text.length == story.length) {
        //   console.log("定时器结束！");
        clearInterval(time);
      }
    }, 200);
  },
  methods: {}
};
</script>
<style>
@import "./wh-typeWriter.css";
</style>
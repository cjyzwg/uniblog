import Vue from 'vue';
import App from './App';
import MinRequest from './utils//MinRequest'
import minApi from './api/api'
import MinCache from './utils/MinCache'

import cuCustom from "./colorui/components/cu-custom";
Vue.component("cu-custom", cuCustom);

import whTypeWriter from "./components/typeWriter/wh-typeWriter";
Vue.component("wh-typeWriter", whTypeWriter);

import whAuthorCard from "./components/authorCard/wh-authorCard";
Vue.component("wh-authorCard", whAuthorCard);

import whAddTips from "./components/addTips/wh-addTips";
Vue.component("wh-addTips", whAddTips);

Vue.config.productionTip = false;

Vue.use(MinRequest)
// 注册缓存器
Vue.use(MinCache)


Vue.mixin({
	methods: {
		setData: function(obj, callback) {
			let that = this;
			const handleData = (tepData, tepKey, afterKey) => {
				tepKey = tepKey.split('.');
				tepKey.forEach(item => {
					if (tepData[item] === null || tepData[item] === undefined) {
						let reg = /^[0-9]+$/;
						tepData[item] = reg.test(afterKey) ? [] : {};
						tepData = tepData[item];
					} else {
						tepData = tepData[item];
					}
				});
				return tepData;
			};
			const isFn = function(value) {
				return typeof value == 'function' || false;
			};
			Object.keys(obj).forEach(function(key) {
				let val = obj[key];
				key = key.replace(/\]/g, '').replace(/\[/g, '.');
				let front, after;
				let index_after = key.lastIndexOf('.');
				if (index_after != -1) {
					after = key.slice(index_after + 1);
					front = handleData(that, key.slice(0, index_after), after);
				} else {
					after = key;
					front = that;
				}
				if (front.$data && front.$data[after] === undefined) {
					Object.defineProperty(front, after, {
						get() {
							return front.$data[after];
						},
						set(newValue) {
							front.$data[after] = newValue;
							that.$forceUpdate();
						},
						enumerable: true,
						configurable: true
					});
					front[after] = val;
				} else {
					that.$set(front, after, val);
				}
			});
			// this.$forceUpdate();
			isFn(callback) && this.$nextTick(callback);
		}
	}
});

App.mpType = 'app';

const app = new Vue({
	minApi,
    ...App
});
app.$mount();

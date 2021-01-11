const config = Symbol('config')
const isCompleteURL = Symbol('isCompleteURL')
const requestBefore = Symbol('requestBefore')
const requestAfter = Symbol('requestAfter')
import { checkLogin,checkCjResult } from '@/utils/checkResponse'

class MinRequest {
	[config] = {
		baseURL: '',
		header: {
			'content-type': 'application/json;charset=utf-8'
		},
		method: 'GET',
		dataType: 'json',
		responseType: 'text'
	}

	interceptors = {
		request: (func) => {
			if (func) {
				MinRequest[requestBefore] = func
			} else {
				MinRequest[requestBefore] = (request) => request
			}

		},
		response: (func) => {
			if (func) {
				MinRequest[requestAfter] = func
			} else {
				MinRequest[requestAfter] = (response) => response
			}
		}
	}

	static[requestBefore](config) {
		return config
	}

	static[requestAfter](response) {
		return response
	}

	static[isCompleteURL](url) {
		return /(http|https):\/\/([\w.]+\/?)\S*/.test(url)
	}

	setConfig(func) {
		this[config] = func(this[config])
	}

	request(options = {}) {
		options.baseURL = options.baseURL || this[config].baseURL
		options.dataType = options.dataType || this[config].dataType
		options.url = MinRequest[isCompleteURL](options.url) ? options.url : (options.baseURL + options.url)
		options.data = options.data
		//加了这个option header 会预检一个请求，提前加一个option的请求
		options.header = { ...options.header,
			...this[config].header
		}
		options.method = options.method || this[config].method

		options = { ...options,
			...MinRequest[requestBefore](options)
		}

		return new Promise((resolve, reject) => {
			options.success = function(res) {
				resolve(MinRequest[requestAfter](res))
			}
			options.fail = function(err) {
				reject(MinRequest[requestAfter](err))
			}
			uni.request(options)
		})
	}
	//不检测登录
	//检测登录
	get(url, data, options = {}) {
		options.url = url
		options.data = data
		options.method = 'GET'
		return this.request(options).then(checkLogin).then(checkCjResult)
	}

	post(url, data, options = {}) {
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options).then(checkLogin).then(checkCjResult)
	}
	
	delete(url, data, options = {}) {
		options.url = url
		options.data = data
		options.method = 'DELETE'
		return this.request(options).then(checkLogin).then(checkCjResult)
	}
}

MinRequest.install = function(Vue) {
	Vue.mixin({
		beforeCreate: function() {
			if (this.$options.minApi) {
				Vue._minApi = this.$options.minApi
			}
		}
	})
	Object.defineProperty(Vue.prototype, '$minApi', {
		get: function() {
			return Vue._minApi.apis
		}
	})
}

export default MinRequest

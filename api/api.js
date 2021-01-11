import Vue from 'vue'
import MinRequest from '@/utils/MinRequest'
import globalConfig from '@/config'

const minRequest = new MinRequest()

// 请求拦截器
minRequest.interceptors.request((request) => {
	return request
})

// 响应拦截器
minRequest.interceptors.response((response) => {
	return response.data
})

// 设置默认配置
minRequest.setConfig((config) => {
	config.baseURL = globalConfig.baseUrl
	return config
})

export default {
	// 这里统一管理api请求
	apis: {
		
		getArticleList(params){
			// params: page || search || none
			return minRequest.get('/apis/articlelist', params)
		},
		getArticleContent(params){
			// params: path 
			return minRequest.get('/apis/articlecontent', params)
		},
		getCategory(params){
			//params:none
			return minRequest.get('/apis/category', params)
		},
		getCategoryContent(params){
			//params:name --》categoryname
			return minRequest.get('/apis/categorycontent', params)
		},
		getJrscToken(params,options){
			return minRequest.get('/token', params,options)
		},
		getJrscSentence(params,options){
			return minRequest.get('/sentence', params,options)
		}
	}
}

'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	//1-weixin 2-qq 3-toutiao 4-alipay 5-baidu 6-360 7-kuai
	if(!event.hasOwnProperty('typ')){
		return {
			status: -1,
			msg: `缺少typ类型`,
			content:{}
		}
	}
	if(!event.hasOwnProperty('code')){
		return {
			status: -1,
			msg: `缺少code`,
			content:{}
		}
	}
	//小程序类型 blog/贴纸/外卖等等多个小程序
	if(!event.hasOwnProperty('apptyp')){
		return {
			status: -1,
			msg: `缺少apptyp`,
			content:{}
		}
	}
	let rst = {
		status:-1,
		msg:'错误的id',
		content:{}
	}
	let typ = parseInt(event.typ)
	let js_code = event.code
	let apptyp = event.apptyp
	const collection = db.collection('token')
	const docList = await collection.where({
		typ:typ,
		apptyp:apptyp
	}).limit(1).get();
	if(docList.data.length>0){
		let appid = docList.data[0].appid
		let secret = docList.data[0].secret
		let data = {}
		let loginUrl = ""
		if(typ==1){
			//微信
			loginUrl = 'https://api.weixin.qq.com/sns/jscode2session'
			data = {  
					appid: appid,  
					secret: secret,  
					js_code: js_code,  
			        grant_type: 'authorization_code'  
				}
		}
		if(typ==2){
			loginUrl = "https://api.q.qq.com/sns/jscode2session"
			data = {
					appid: appid,  
					secret: secret,  
					js_code: js_code,  
			        grant_type: 'authorization_code'  
				}
		}
		if(typ==3){
			//头条
			loginUrl = 'https://developer.toutiao.com/api/apps/jscode2session'
			data = {
				appid: appid,  
				secret: secret,  
				code: js_code
			}

		}
		let res = await uniCloud.httpclient.request(loginUrl, {
				data: data,  
				dataType: 'json'  
			})
		// console.log(data)
		console.log(JSON.stringify(res))
		if(res.status==200){
			rst.status = 0
			rst.msg="获取成功"
			rst.content.openid = res.data.openid
			rst.content.session_key = res.data.session_key
		}
		
	}
	//返回数据给客户端
	return rst
};

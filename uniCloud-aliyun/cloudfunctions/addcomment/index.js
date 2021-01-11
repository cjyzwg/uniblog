'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	
	//返回数据给客户端
	if(!event.hasOwnProperty('path')){
		return {
			status: -1,
			msg: `缺少path类型`
		}
	}
	if(!event.hasOwnProperty('openid') && event.openid==""){
		return {
			status: -1,
			msg: `缺少openid`
		}
	}
	if(event.hasOwnProperty('typ') && event.hasOwnProperty('content') && event.content!=""){
		//msg check
		let typ = parseInt(event.typ)
		let apptyp = event.apptyp
		if(typ==1){
			//weixin检测
			let typ = parseInt(event.typ)
			let content = event.content
			let access_token = ""
			
			const collection = db.collection('token')
			const docList = await collection.where({
				typ:typ,
				apptyp:apptyp
			}).limit(1).get();
			// uniCloud.logger.info("doc list is:")
			let created_at = Date.now()
			let created_at_timestamp = parseInt(new Date().getTime()/1000)//当前时间
			console.log("当前时间戳为："+created_at_timestamp)
			let expires_in = 0
			let appid = "test"
			let secret = "test"
			let apiUrl="https://api.weixin.qq.com/cgi-bin/token"
			if(docList.data.length>0){
				console.log(JSON.stringify(docList))
				appid = docList.data[0].appid
				secret = docList.data[0].secret
				console.log("当前时间为:"+created_at+",当前时间戳为："+created_at_timestamp+",过期时间戳为："+docList.data[0].expires_in)
				if(created_at_timestamp<=docList.data[0].expires_in){
					access_token = docList.data[0].access_token
					expires_in = docList.data[0].expires_in
				}else{
					console.log('token过期了，获取新的token')
					//过期
					let accessres = await uniCloud.httpclient.request(apiUrl, {
						method: 'GET',
						data: {
							grant_type: 'client_credential',
							appid:appid,
							secret:secret
						},
						dataType: 'json'
					})
					access_token = accessres.data.access_token
					expires_in = created_at_timestamp+accessres.data.expires_in
					
				}
			}else{
				console.log('token不存在，获取新的token')
				//不存在
				let accessres = await uniCloud.httpclient.request(apiUrl, {
					method: 'GET',
					data: {
						grant_type: 'client_credential',
						appid:appid,
						secret:secret
					},
					dataType: 'json'
				})
				access_token = accessres.data.access_token
				expires_in = created_at_timestamp+accessres.data.expires_in
			}
			
			
			
			
			
			let checkevent = {}
			checkevent["apptyp"] = apptyp
			checkevent["typ"] = typ
			checkevent["created_at"] = created_at
			checkevent["appid"] = appid
			checkevent["secret"] = secret
			checkevent["access_token"] = access_token
			checkevent["expires_in"] = expires_in
			if (!docList.data || docList.data.length === 0) {
				let addres = await collection.add(checkevent)
				// uniCloud.logger.info(addres)
			}
			
			
			const res = await collection.doc(docList.data[0]._id).update(checkevent);
			if (res.updated === 1) {
				let result = Object.assign({}, {
					_id: docList.data[0]._id
				}, checkevent)
			} else {
				return {
					status: -1,
					msg: `数据更新失败`,
					content:{}
				}
			}
			let msgurl = 'https://api.weixin.qq.com/wxa/msg_sec_check?access_token=' + access_token
			const msgres = await uniCloud.httpclient.request(msgurl, {
				method: 'POST',
				contentType: 'json',
				data: {
					content: content
				},
				dataType: 'json'
			})
			console.log(JSON.stringify(msgres))
			if(msgres.status!=200 || msgres.data.errcode!=0){
				return {
					status: -1,
					msg: `内容检测失败`,
					content:{}
				}
			}
			
		}
	}
	
	let path = event.path
	let openid = event.openid
	const collection = db.collection('comments')
	const commentdocList = await collection.where({
		path:path,
		openid:openid
	}).limit(1).get();
	console.log(JSON.stringify(commentdocList))	
	
	let commentevent = {}
	let created_at = Date.now()
	commentevent["created_at"] = created_at
	commentevent["path"] = path
	commentevent["openid"] = openid
	commentevent["avatarurl"] = event.hasOwnProperty('avatarurl')?event['avatarurl']:''
	if(event.hasOwnProperty('content')){
		commentevent["content"] = event['content']
	}
	if(event.hasOwnProperty('islike')){
		commentevent["islike"] = event['islike']
	}
	if (!commentdocList.data || commentdocList.data.length === 0) {
		let addres = await collection.add(commentevent)
		return {
			status: 0,
			msg: '评论添加成功'
		}
	}
	const res = await collection.doc(commentdocList.data[0]._id).update(commentevent);
	if (res.updated === 1) {
		let result = Object.assign({}, {
			_id: commentdocList.data[0]._id
		}, commentevent)
		return {
			status: 0,
			msg: `评论添加成功`
		}
	} else {
		return {
			status: -1,
			msg: `评论添加失败`
		}
	}


};

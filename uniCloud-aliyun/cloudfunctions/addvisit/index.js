'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//返回数据给客户端
	if(!event.hasOwnProperty('typ')){
		return {
			status: -1,
			msg: `缺少typ类型`,
			visits:0,
			likes:0
		}
	}
	//返回数据给客户端
	if(!event.hasOwnProperty('path')){
		return {
			status: -1,
			msg: `缺少path`,
			visits:0,
			likes:0
		}
	}
	let typ = parseInt(event.typ)
	let path = event.path
	const collection = db.collection('blogvisits')
	const docList = await collection.where({
		typ:typ,
		path:path
	}).limit(1).get();
	console.log(docList)
	const comcollection = db.collection('comments')
	const comres = await comcollection.where({
		path:path,
		islike:1
	}).count()
	let likes = comres.total
	
	
	let created_at = Date.now()
	event["created_at"] = created_at
	if (!docList.data || docList.data.length === 0) {
		event["visits"] = 1
		let addres = await collection.add(event)
		return {
			status: 0,
			msg: '集合第一条数据已经创建',
			visits:1,
			likes:likes
		}
	}else{
		event["visits"] = docList.data[0].visits+1
	}
	const res = await collection.doc(docList.data[0]._id).update(event);
	if (res.updated === 1) {
		let result = Object.assign({}, {
			_id: docList.data[0]._id
		}, event)
		return {
			status: 0,
			msg: `集合第一条数据成功并且需要返回`,
			visits:event["visits"],
			likes:likes
		}
	} else {
		return {
			status: -1,
			msg: `集合comments数据更新失败`,
			visits:0,
			likes:likes
		}
	}


};

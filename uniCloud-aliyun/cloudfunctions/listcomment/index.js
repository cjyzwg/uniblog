'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	if(!event.hasOwnProperty('path')){
		return {
			status: -1,
			msg: `缺少文件路径`
		}
	}
	let path = event.path
	const collection = db.collection('comments')
	const res = await collection.where({
		path:path
	}).get()
	return res
};
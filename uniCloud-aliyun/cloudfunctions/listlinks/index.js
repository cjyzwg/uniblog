//list
'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {

	const collection = db.collection('bloglinks')
	const res = await collection.aggregate()
	.sort({
		sort:1
	})
	.end()
	return res
};

//add
// 'use strict';
// const db = uniCloud.database()
// exports.main = async (event, context) => {
// 	//返回数据给客户端
// 	const collection = db.collection('bloglinks')
// 	let addres = await collection.add(event)
// 	return {
// 		status: 0,
// 		msg: '集合第一条数据已经创建'
// 	}


// };

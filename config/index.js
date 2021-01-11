/**
 * ip地址或域名
 */
const ipAddress = 'https://blog.hexiefamily.xin'


const getBaseUrl = () => {
	return ipAddress
}
export default {
	/**
	 * 针对不同平台的baseUrl
	 */
	baseUrl: getBaseUrl()
}

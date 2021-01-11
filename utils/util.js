/** 
 * new Date() ---> 转化为 年 月 日 时 分 秒
 * let date = new Date();
 * date: 传入参数日期 Date
*/
function formatTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}

function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}
/** 
 * 时间戳转化为年 月 日 时 分 秒 
 * number: 传入时间戳 
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
*/


function customFormatTime(number, format) {
  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];
  var date = new Date(number);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));
  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }

  return format;
}

function formatRightTime(d,mask,lang="CN") {
	var zeroize = function zeroize(value, length) {
		if (!length) length = 2;
		value = String(value);
		for (var i = 0, zeros = ''; i < length - value.length; i++) {
			zeros += '0';
		}
		return zeros + value;
	};

	return mask.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,2}|M{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g, function ($0) {
		switch ($0) {
			case 'd':
				return d.getDate();
			case 'dd':
				return zeroize(d.getDate());
			case 'ddd':
				if(lang=='CN'){
					return ['日','一','二','三','四','五','六'][d.getDay()];
				}else{
					return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()];
				}
				
			case 'dddd':
				if(lang=='CN'){
					return ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'][d.getDay()];
				}else{
					return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()];
				}
				
			case 'M':
				return d.getMonth() + 1;
			case 'MM':
				return zeroize(d.getMonth() + 1);
			case 'MMM':
				return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];
			case 'MMMM':
				return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][d.getMonth()];
			case 'yy':
				return String(d.getFullYear()).substr(2);
			case 'yyyy':
				return d.getFullYear();
			case 'h':
				return d.getHours() % 12 || 12;
			case 'hh':
				return zeroize(d.getHours() % 12 || 12);
			case 'H':
				return d.getHours();
			case 'HH':
				return zeroize(d.getHours());
			case 'm':
				return d.getMinutes();
			case 'mm':
				return zeroize(d.getMinutes());
			case 's':
				return d.getSeconds();
			case 'ss':
				return zeroize(d.getSeconds());
			case 'l':
				return zeroize(d.getMilliseconds(), 3);
			case 'L':
				var m = d.getMilliseconds();
				if (m > 99) m = Math.round(m / 10);
				return zeroize(m);
			case 'tt':
				return d.getHours() < 12 ? 'am' : 'pm';
			case 'TT':
				return d.getHours() < 12 ? 'AM' : 'PM';
			case 'Z':
				return d.toUTCString().match(/[A-Z]+$/);
			// Return quoted strings with the surrounding quotes removed
			default:
				return $0.substr(1, $0.length - 2);
		}
	});
}

module.exports = {
  formatTime: formatTime,
  customFormatTime: customFormatTime,
  formatRightTime:formatRightTime
};

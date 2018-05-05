//增加的删除数组元素的方法
Array.prototype.del = function(index) {
	if(isNaN(index) || index >= this.length) {
		return false;
	}
	for(var i = 0, n = 0; i < this.length; i++) {
		if(this[i] != this[index]) {
			this[n++] = this[i];
		}
	}
	this.length -= 1;
};
//判断是不是数组的方法
function isArray(obj) {
	//return(typeof obj == 'object') && obj.constructor == Array;
	return Object.prototype.toString.apply(obj) === "[object Array]";
}
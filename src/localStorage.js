export default {
	set: function(key, val) {
		localStorage.setItem(key, val);
	},
	get: function(key) {
		return localStorage.getItem(key);
	},
	clear: function() {
		localStorage.clear();
	},
	setArray: function(arr, val) {
		let cur = this.get(arr);
		if (cur) {
			this.set(arr, val + ',' + cur);
		} else {
			this.set(arr, val);
		}
	},
	getArray: function (arr, n) { // 获取最后 n 个元素，不足则全部返还，默认 n = 10
		var result = localStorage.getItem(arr).split(','),
			boundary = n || 10;
		if (result.length > boundary) {
			result = result.slice(0, boundary);
			this.set(arr, result.join(',')); // 防止占用太多本地存储空间，并且过多数据处理起来性能更低
		}
		return result;
	}
}
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
	pushArray: function(arr, val) {
		let curArr = this.getArray(arr);

		if (curArr.length == 0) {
			this.set(arr, val);
		} else {
			let index = curArr.indexOf(val);
			if (index >= 0) {
				curArr.splice(index, 1);
			}
			curArr.unshift(val);
			this.set(arr, curArr.join(','))
		}
	},
	getArray: function (arr, n) { // 获取最后 n 个元素，不足则全部返还，默认 n = 10
		var keys = this.get(arr),
			boundary = n || 10,
			result = keys ? keys.split(',') : [];

		if (result.length > boundary) {
			result = result.slice(0, boundary);
			this.set(arr, result.join(',')); // 防止占用太多本地存储空间，并且过多数据处理起来性能更低
		}
		return result;
	}
}
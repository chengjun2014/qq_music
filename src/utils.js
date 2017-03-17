export default {
	sec2time: function(sec) {
		return this.fillWith(sec/60) + ':' + this.fillWith(sec%60);
	},
	fillWith: function(num, symbol) {
		var fill = symbol ? symbol : '0';
		return (symbol + num).slice(-2);
	}
}
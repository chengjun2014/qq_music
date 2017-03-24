
function fillWith(num, symbol) {
	var fill = symbol ? symbol : '0';
	return (symbol + num).slice(-2);
}

export default {
	sec2time: function(sec) {
		return fillWith(sec/60) + ':' + fillWith(sec%60);
	},
}
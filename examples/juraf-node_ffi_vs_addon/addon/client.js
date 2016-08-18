var addon = require('bindings')('addon');


if (process.argv.length < 3) {
	console.log('Set operation count as argument');
	process.exit();
};

var limit = parseInt(process.argv[2]);
console.log('Operation count: ' + limit);

var start = new Date().getTime();
var callback_count = 0;

for (var i = 0; i < limit; ++i) {
	addon.addAsync(3, 2, function(value) {
		// console.log('This should be five: ' + value);
		callback_count = callback_count + 1;
		if (callback_count == limit) {
			var end = new Date().getTime();
			var time = end - start;
			console.log('Execution time: ' + time);
		}
	});
}
//load the ffi module
var ffi = require('ffi');

var lib = ffi.Library('./lib/build/Release/libtest', {
	'add': ['int', ['int', 'int']]
});

if (process.argv.length < 3) {
	console.log('Set operation count as argument');
	process.exit();
};

var limit = parseInt(process.argv[2]);
console.log('Operation count: ' + limit);

var start = new Date().getTime();
var callback_count = 0;

for (var i = 0; i < limit; ++i) {
	lib.add.async(3, 5, function(err, res) {
		// console.log('This should be eight: ' + res);	
		callback_count = callback_count + 1;
		if (callback_count == limit) {
			var end = new Date().getTime();
			var time = end - start;
			console.log('Execution time: ' + time);
		}
	});
}
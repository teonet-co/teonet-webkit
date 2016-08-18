{
	"targets": [
		{
			"target_name": "addon",
			"sources": [ "addon.cc" ],
			"include_dirs": [
				"<!(node -e \"require('nan')\")",
				'../lib',
			],
			'dependencies': [
				'../lib/binding.gyp:libtest'
			]
		}
	]
}

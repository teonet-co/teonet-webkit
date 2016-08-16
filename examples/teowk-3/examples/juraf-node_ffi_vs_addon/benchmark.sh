#!/bin/bash

if test $# -lt 1
then
	echo Set number of operations as first argument of the script
	exit 1
fi

echo Running \'addon\' test...

node ./addon $1
echo

echo Running \'FFI\' test...

node ./ffi/client.js $1
echo
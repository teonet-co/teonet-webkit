#!/bin/bash

# build test library
cd lib
node-gyp configure
node-gyp build
if [ -e ./build/Release/lib.target/test.so ]
then
  mv ./build/Release/lib.target/test.so ./build/Release/libtest.so
fi

install packages and build addon
cd ../addon
npm install

# install FFI package
cd ../ffi
npm install ffi
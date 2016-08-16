#!/bin/bash

# delete test library
cd lib
rm -rf build

# delete packages and build addon
cd ../addon
rm -rf build
rm -rf node_modules
rm -rf lib

cd ../ffi
rm -rf node_modules
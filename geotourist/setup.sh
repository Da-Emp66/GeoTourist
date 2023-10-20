#!bin/bash

npm install cesium crypto-browserify stream-browserify browserify-zlib \
    assert stream-http https-browserify os-browserify url path-browserify \
    querystring-es3

mv ./node_modules/cesium/Build/Cesium ./public/cesium

@echo off
rollup -c rollup.config.js && uglifyjs  client/src/bundle.js -o client/src/bundle.min.js && node index
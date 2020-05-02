#!/bin/bash

set -e
shopt -s nullglob

for proto_file in *.proto; do
  name_without_extension="${proto_file%.*}"
  js_file_output=generated/$name_without_extension.js
  ts_file_output=generated/$name_without_extension.d.ts
  node_modules/.bin/pbjs -t static-module -w es6 -o $js_file_output $proto_file
  node_modules/.bin/pbts -o $ts_file_output $js_file_output
done

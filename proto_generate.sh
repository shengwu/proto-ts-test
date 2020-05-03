#!/usr/bin/env bash

set -e
set -o xtrace
shopt -s nullglob

dest_dir=./src/generated

for proto_file in *.proto; do
  # protobufjs
  name_without_extension="${proto_file%.*}"
  js_file_output=$dest_dir/$name_without_extension.js
  ts_file_output=$dest_dir/$name_without_extension.d.ts
  node_modules/.bin/pbjs -t static-module -w es6 -o $js_file_output $proto_file
  node_modules/.bin/pbts -o $ts_file_output $js_file_output

  # This is annoying, we have to generate code a second way for the service
  # using grpc-tools instead of protobufjs
  #
  # https://github.com/grpc/grpc-node/issues/528#issuecomment-418959078
  node_modules/.bin/grpc_tools_node_protoc \
    --js_out=import_style=commonjs,binary:$dest_dir \
    --grpc_out=$dest_dir \
    $proto_file
  protoc \
    --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
    --ts_out=$dest_dir \
    $proto_file
done

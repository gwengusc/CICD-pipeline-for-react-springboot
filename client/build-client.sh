#!/bin/bash

PROTO_DIR=./src/grpc-api

mkdir ${PROTO_DIR}

# Generate Types
npx proto-loader-gen-types --longs=String --enums=String --defaults --oneofs --grpcLib=@grpc/grpc-js --outDir=${PROTO_DIR} ../grpc-api/src/main/proto/*.proto

# Generate JS and TS code
../grpc-api/target/protoc-plugins/protoc-3.14.0-osx-x86_64.exe -I=../grpc-api/src/main/proto ../grpc-api/src/main/proto/*.proto \
  --js_out=import_style=commonjs:${PROTO_DIR} \
  --grpc-web_out=import_style=typescript,mode=grpcwebtext:${PROTO_DIR}

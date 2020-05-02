build: generate
	yarn build

generate: protoc

clean:
	rm -rf generated/*
	rm -rf dist

protoc: clean
	mkdir -p generated
	./proto_generate.sh

# TODO: make this work
start-server: generate
	mkdir -p dist
	yarn tsc
	node src/tsc-out/server.js

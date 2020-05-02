
build: generate
	yarn build

generate: protoc

clean:
	rm -rf ./generated/*

protoc:
	mkdir -p ./generated/
	rm -rf ./generated/*
	./proto_generate.sh


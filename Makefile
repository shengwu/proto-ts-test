build: generate
	yarn build

generate: protoc

clean:
	rm -rf generated/*
	rm -rf build
	rm -rf dist

protoc: clean
	mkdir -p generated
	./proto_generate.sh

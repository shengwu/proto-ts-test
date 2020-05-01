

protoc:
	mkdir -p ./generated/
	rm -f ./generated/*
	protoc --js_out=./generated/ *.proto

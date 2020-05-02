

protoc:
	mkdir -p ./generated/
	rm -f ./generated/*
	./proto_generate.sh

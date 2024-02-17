
.PHONY: start
start: 
	npm run start

.PHONY: fmt
fmt: 
	npm run fmt

.PHONY: check
check: 
	npx tsc

.PHONY: generate
generate: 
	npx openapi-typescript ./src/api/openapi.yaml -o ./src/api/openapi-types.ts


.PHONY: start
start: 
	npm run start

.PHONY: check
check: 
	npx prettier --log-level warn --write .
	npx tsc
	npx eslint . --fix

.PHONY: generate
generate: 
	npx openapi-typescript ./src/api/openapi.yaml -o ./src/api/openapi-types.ts


.PHONY: start
start: 
	npm run start

.PHONY: test
test: 
	npx vitest

.PHONY: check
check: 
	npx prettier --log-level warn --write .
	npx tsc
	npx eslint . --fix
	npx vitest --run
	npx expo-doctor

.PHONY: generate
generate: 
	npx openapi-typescript ./src/api/openapi.yaml -o ./src/api/openapi-types.ts

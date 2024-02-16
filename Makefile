
.PHONY: start
start: 
	npm run start

.PHONY: fmt
fmt: 
	npm run fmt

.PHONY: check
check: 
	npx tsc

.PHONY: start
start: 
	npm i
	npx expo start --dev-client

.PHONY: start-prod
start-prod: 
	npx expo start --dev-client --no-dev --minify

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

.PHONY: build
build: 
	eas build --platform all

.PHONY: build-staging
build-staging: 
	eas build --profile preview --platform all

.PHONY: build-dev
build-dev: 
	eas build --profile development --platform all

.PHONY: build-ios-simulator
build-ios-simulator:
	eas build --platform ios --profile development-simulator

.PHONY: start-ios-simulator
start-ios-simulator:
	eas build:run -p ios

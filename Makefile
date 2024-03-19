
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

.PHONY: wcbn-sync
wcbn-sync: 
	cp ../../wcbn/spinitron-mobile-app/src/config.ts ./src/config.ts
	cp ../../wcbn/spinitron-mobile-app/app.json ./app.json
	cp ../../wcbn/spinitron-mobile-app/src/theme/theme.ts ./src/theme/theme.ts
	cp -R ../../wcbn/spinitron-mobile-app/assets/* ./assets/

.PHONY: wcbn-unsync
wcbn-unsync: 
	git checkout 59d7637ac5c03ec91c91a81e2f2862bd98fdd4da -- src/config.ts app.json src/theme/theme.ts assets

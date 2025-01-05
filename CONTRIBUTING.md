# Contributing

Pull Requests are welcome.

## Requirements

- Node (the version specified in [.nvmrc](.nvmrc))
- npm 9
- An Expo account
- The [Expo Go](https://expo.dev/go) app

```
brew install watchman
npm install -g eas-cli
npm install
```

## Local environment setup

- You may need to change the `eas.projectId` in `app.config.ts` to match the project you have set up in your account.
- Run `make build-dev`
- When it is ready, download the build on your phone and install it.
- Run `make start`
- Open the app on your device

## Code standards

Please run `make check` and fix any errors before opening a pull request.

## Screenshots

- Manually set the `"runtimeVersion"` in `app.config.ts` to some a value like "52.0.17"

```
make build-ios-simulator
make start-ios-simulator
```

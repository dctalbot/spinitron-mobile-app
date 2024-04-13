# spinitron-mobile-app

<a href="https://play.google.com/store/apps/details?id=org.wcbn">
  <img alt="Get it on Google Play" title="Google Play" src="docs/play-store.png" height="40">
</a>

<br />
<br />

https://github.com/dctalbot/spinitron-mobile-app/assets/17692467/a8edec13-9b7c-41f4-a914-29441b305c64

This is a cross-platform mobile app (for iOS and Android) that I wrote for WCBN, the college station where I used to DJ, but any station backed by [Spinitron](https://spinitron.com/) can take it "off the shelf" and have it deployed with minimal effort. For example, the WCBN fork is [here](https://github.com/wcbn/spinitron-mobile-app).

## Getting Started

1. You will need to have a relay server deployed in order to proxy requests to the Spinitron API. You can use [this one](https://github.com/wcbn/spinitron-proxy/) or your own.
2. Create an [Expo](https://expo.dev/) account. They will build the app for you. They seem like generally nice people.
3. Fork this repository.
4. On the fork, update the following files to have the app match your brand:

- `app.config.ts` (settings and options)
- `src/theme/theme.ts` (look and feel)
- `assets/*` (brand images)

5. Install the Expo CLI: `npm install -g expo-cli`

### Android

1. Create a Google Play Developer account and create a new android project.
1. Increment the `app.json` `version`
1. Run `eas build -p android`
1. Download the build from Expo
1. Upload the build to Google Play

### It's deployed... what now?

The maintenance burden mostly consists of [keeping your fork up to date](https://gist.github.com/CristinaSolana/1885435) with any bug fixes that I commit to this repository. The expected release cadence is about once every 6 months.

## Related Projects

- https://github.com/wcbn/spinitron-proxy/
- https://github.com/dctalbot/react-spinitron
- https://github.com/spinitron/v2api

## Contributing

Download the Expo development app https://expo.dev/client

```
brew install watchman
npm install
make start
```

Scan the QR code in the terminal to open the app on your phone.

Please run `make check` and fix any errors before opening a pull request.

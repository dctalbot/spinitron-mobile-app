# spinitron-mobile-app

<a href="https://play.google.com/store/apps/details?id=org.wcbn">
  <img alt="Get it on Google Play" title="Google Play" src="docs/play-store.png" height="40">
</a>

This is a cross-platform mobile app (for iOS and Android) that I wrote for WCBN, the college station where I used to DJ, but any station backed by [Spinitron](https://spinitron.com/) can take it "off the shelf" and have it deployed with minimal effort.

## How to get it off-the-shelf and into production

1. You need a relay server to proxy requests to the Spinitron API. This is required as per the [Spinitron ToS](https://forum.spinitron.com/t/web-integration/146). You can use the one that I authored: https://github.com/wcbn/spinitron-proxy/ or your own. Mine is like $7 per month on AWS.
2. Create an [Expo](https://expo.dev/) account. They will build the app for you. They seem like generally nice people.
3. Fork this repository.
4. On the fork, update the following files to have the app match your brand:

- `src/config.ts` (settings and options)
- `src/theme/theme.ts` (look and feel)
- `app.json` (Expo stuff)
- `assets/*` (brand images)

5. Install the Expo CLI: `npm install -g expo-cli`

### Android

1. Create a Google Play Developer account and create a new android project.
1. Increment the `app.json` `version` and `expo.android.versionCode`
1. Run `eas build -p android`
1. Download the build from Expo
1. Upload the build to Google Play

### It's deployed... what now?

The maintenance burden mostly consists of keeping your fork up to date with any bug fixes that I commit to this repository. The expected release cadence is about once every 6 months.

## Contributing

Download the Expo development app https://expo.dev/client

```
npm install
make start
```

Scan the QR code in the terminal to open the app on your phone.

Please run `make check` and fix any errors before opening a pull request.

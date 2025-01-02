# spinitron-mobile-app

<div style="display:inline">
<a href="https://play.google.com/store/apps/details?id=org.wcbn"><img alt="Get it on Google Play" title="Google Play" src="docs/play-store.png" height="40"></a>
<a href="https://apps.apple.com/us/app/wcbn-fm/id6497486716"><img alt="Download on the App Store" title="App Store" src="docs/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg" height="40"></a>
</div>

<br />

https://github.com/dctalbot/spinitron-mobile-app/assets/17692467/a8edec13-9b7c-41f4-a914-29441b305c64

This is a cross-platform mobile app (for iOS and Android) that I wrote for WCBN, the college station where I used to DJ, but any station backed by [Spinitron](https://spinitron.com/) can take it "off the shelf" and have it deployed with minimal effort.

## Prerequisites

1. A [spinitron-proxy](https://github.com/wcbn/spinitron-proxy) deployment. This serves as a relay between the app and the Spinitron API.
2. An [Expo](https://expo.dev/) account for building the app distributions.
3. A [Google Play Developer account](https://play.google.com) for Android.
4. An [Apple Developer account](https://developer.apple.com) for iOS.
5. The Expo CLI:

```
npm install -g eas-cli
npm install -g expo-cli
```

## Getting Started

1. Fork this repository.
2. On the fork, update the following files to have the app match your brand:

- `app.config.ts` (settings and options)
- `src/theme/theme.ts` (look and feel)
- `assets/*` (brand images)

### Android

1. Create a new android project in the Google Play Developer Console.
1. Run `eas build -p android`
1. Download the build from Expo
1. Upload the build to Google Play

### iOS

1. Create a new app project in the Apple Developer Console.
1. Set `"runtimeVersion": "exposdk:52.0.17"`, in `app.json` (?)
1. Run `eas build -p ios`
1. Download the build from Expo
1. Upload the build to Apple

### It's deployed... what now?

The maintenance burden mostly consists of [keeping your fork up to date](https://gist.github.com/CristinaSolana/1885435) with any bug fixes that I commit to this repository. The expected release cadence is about once every 6 months.

## As a service

If you want the app but all of this feels overwhelming, you can pay me to take care of it. Email [dc4t@pm.me](mailto:dc4t@pm.me) and we can set up some time to chat about your needs. This service includes:

- ✅ A hosted relay server
- ✅ Basic branding and customization
- ✅ App store presence (screenshots, icons, descriptions, etc.)
- ✅ Regular updates and maintenance
- ✅ Mentorship hours for students and support hours for general staff
- ✅ Help sustain the development of this project

## Related Projects

- https://github.com/wcbn/spinitron-proxy/
- https://github.com/dctalbot/react-spinitron
- https://github.com/spinitron/v2api

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

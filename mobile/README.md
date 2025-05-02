# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Update `app.config.ts`
   1. update the "owner" to your own Expo Account
   2. remove the project ID for development to allow EAS to create new under your account

3. Start the app

   ```bash
   npx expo start
   ```

> [!NOTE]
> When running the first time say yes to creating a new project ID.
> Expo will then crash not knowing how to update app.config.ts.
> Copy the id to app.config.ts and save
> Re-Run `npm start`

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Notes around Development Build

TODO

## Notes BUILD_ENV in scripts
TODO

## Rough Outline Notes

<https://docs.stripe.com/terminal/features/connect#direct>
<https://github.com/vascoconde/stripe-terminal-react-native/tree/262575682e579b568e23685da02f9f271951b321/example-app>

- MOBILE: Settings -- Reader registration interface
- MOBILE: Create Cart from Products
- MOBILE: Process Payment via M2 Reader - Insert or Tap

ALL THE EDGE CASES... TBD

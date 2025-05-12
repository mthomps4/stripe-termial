import type { ConfigContext, ExpoConfig } from "expo/config";

type ProfileConfig = ExpoConfig & {
  name: string;
  slug: string;
  scheme: string;
  androidBundleIdentifier: string;
  iosBundleIdentifier: string;
  icon: string;
  splash_url: string;
  projectId?: string;
};

const getAppConfig = (): ProfileConfig => {
  const buildEnvironment = process.env.BUILD_ENV;

  if (buildEnvironment === "production") {
    return {
      name: "mt-sweet-cuts-pos-production",
      slug: "mt-sweet-cuts-pos-production",
      scheme: "mt-sweet-cuts-pos-production",
      androidBundleIdentifier: "com.mt_sweet_cuts_pos.app",
      iosBundleIdentifier: "com.mt-sweet-cuts-pos.app",
      icon: "./assets/images/sweet_cuts.png",
      splash_url: "./assets/images/splash.png",
      projectId: "", // You'll need to create your own project under your own Expo account
    };
  }

  if (buildEnvironment === "staging") {
    return {
      name: "mt-sweet-cuts-pos-staging",
      slug: "mt-sweet-cuts-pos-staging",
      scheme: "mt-sweet-cuts-pos-staging",
      androidBundleIdentifier: "com.staging.mt_sweet_cuts_pos.app",
      iosBundleIdentifier: "com.staging.mt-sweet-cuts-pos.app",
      icon: "./assets/images/sweet_cuts_staging.png",
      splash_url: "./assets/images/splash_staging.png",
      projectId: "", // You'll need to create your own project under your own Expo account
    };
  }

  return {
    name: "mt-sweet-cuts-pos-dev",
    slug: "mt-sweet-cuts-pos-dev",
    scheme: "mt-sweet-cuts-pos-dev",
    androidBundleIdentifier: "com.dev.mt_sweet_cuts_pos.app",
    iosBundleIdentifier: "com.dev.mt-sweet-cuts-pos.app",
    icon: "./assets/images/sweet_cuts_dev.png",
    splash_url: "./assets/images/splash_dev.png",
    projectId: "eb0d634d-67b0-4235-898d-861bcca807b7", // You'll need to create your own project under your own Expo account
  };
};

export default ({ config }: ConfigContext): ExpoConfig => {
  const appConfig = getAppConfig();

  return {
    owner: "eb-mthomps4", // If running locally - change this to your Expo username
    ...config,
    ...appConfig,
    version: "1.0.0",
    orientation: "portrait",
    icon: appConfig.icon,
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    splash: {
      image: appConfig.splash_url,
      resizeMode: "contain",
      backgroundColor: "#d3b49a",
    },
    scheme: appConfig.scheme,
    assetBundlePatterns: ["**/*"],
    extra: {
      eas: {
        projectId: appConfig.projectId,
        apiUrl: process.env.API_URL,
        buildEnv: process.env.BUILD_ENV,
      },
    },
    ios: {
      bundleIdentifier: appConfig.iosBundleIdentifier,
      supportsTablet: false,
      icon: appConfig.icon,
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
        NSBluetoothAlwaysUsageDescription:
          "This app uses Bluetooth to connect to supported card readers.",
        NSBluetoothPeripheralUsageDescription:
          "This app uses Bluetooth to connect to supported card readers.",
      },
    },
    android: {
      package: appConfig.androidBundleIdentifier,
      adaptiveIcon: {
        foregroundImage: appConfig.icon,
        backgroundColor: "#d3b49a",
      },
      permissions: [
        "BLUETOOTH",
        "BLUETOOTH_ADMIN",
        "NFC",
        "FOREGROUND_SERVICE",
      ],
      versionCode: 1,
      edgeToEdgeEnabled: true,
    },
    plugins: [
      "expo-router",
      "expo-secure-store",
      [
        "expo-splash-screen",
        {
          image: appConfig.splash_url,
          resizeMode: "cover",
          backgroundColor: "#d3b49a",
        },
      ],
      [
        "@stripe/stripe-terminal-react-native",
        {
          bluetoothBackgroundMode: true,
          locationWhenInUsePermission:
            "Location access is required in order to accept payments.",
          bluetoothPeripheralPermission:
            "Bluetooth access is required in order to connect to supported bluetooth card readers.",
          bluetoothAlwaysUsagePermission:
            "This app uses Bluetooth to connect to supported card readers.",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
  };
};

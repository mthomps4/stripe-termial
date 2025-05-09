/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

export const brandColors = {
  // Neutral colors - Cream/Tan
  neutral: {
    50: "#FDFBF7",
    100: "#F9F5EB",
    200: "#F5EFDF",
    300: "#E8DFC8",
    400: "#D4C5A3",
    500: "#C0AB7E",
    600: "#AC9159",
    700: "#987734",
    800: "#845D0F",
    900: "#704300",
  },

  // Navy colors
  navy: {
    50: "#F5F6F8",
    100: "#E6E9F0",
    200: "#D3D8E4",
    300: "#BBC3D4",
    400: "#9EA8C0",
    500: "#818DAC",
    600: "#647298",
    700: "#475784",
    800: "#2A3C70",
    900: "#0D215C",
  },

  // Lime colors
  lime: {
    50: "#F5F8F6",
    100: "#E6F0EA",
    200: "#D3E4D9",
    300: "#BBD4C4",
    400: "#9EC0AB",
    500: "#81AC92",
    600: "#649879",
    700: "#478460",
    800: "#2A7047",
    900: "#0D5C2E",
  },

  // Status colors
  success: "#22C55E",
  warning: "#EAB308",
  error: "#EF4444",

  // Theme colors
  background: "#FDFBF7", // neutral-50
  foreground: "#704300", // neutral-900

  primary: "#C0AB7E", // neutral-500
  primaryLight: "#F9F5EB", // neutral-100
  primaryDark: "#987734", // neutral-700

  secondary: "#81AC92", // lime-500
  secondaryLight: "#E6F0EA", // lime-100
  secondaryDark: "#478460", // lime-700
};

export const Colors = {
  light: {
    text: brandColors.neutral[900],
    background: brandColors.neutral[50],
    tint: brandColors.navy[500],
    icon: brandColors.neutral[400],
    tabIconDefault: brandColors.neutral[400],
    tabIconSelected: brandColors.navy[500],
  },
  dark: {
    text: brandColors.neutral[50],
    background: brandColors.neutral[900],
    tint: brandColors.navy[500],
    icon: brandColors.neutral[400],
    tabIconDefault: brandColors.neutral[400],
    tabIconSelected: brandColors.navy[500],
  },
};

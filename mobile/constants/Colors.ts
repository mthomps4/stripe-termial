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

  // sky colors
  sky: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
  },

  // Lime colors
  lime: {
    50: "#f7fee7",
    100: "#ecfccb",
    200: "#d9f99d",
    300: "#bef264",
    400: "#a3e635",
    500: "#84cc16",
    600: "#65a30d",
    700: "#4d7c0f",
    800: "#3f6212",
    900: "#365314",
  },
};

export const Colors = {
  light: {
    text: brandColors.neutral[900],
    background: brandColors.neutral[100],
    tint: brandColors.sky[700],
    icon: brandColors.neutral[500],
    tabIconDefault: brandColors.neutral[400],
    tabIconSelected: brandColors.sky[700],
  },
  dark: {
    text: brandColors.neutral[900],
    background: brandColors.neutral[100],
    tint: brandColors.sky[700],
    icon: brandColors.neutral[500],
    tabIconDefault: brandColors.neutral[400],
    tabIconSelected: brandColors.sky[700],
  },
};

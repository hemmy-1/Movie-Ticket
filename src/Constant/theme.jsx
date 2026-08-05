import { Dimensions, TextStyle } from "react-native";
// import themes from '../../assets/themes'
const { width, height } = Dimensions.get("window");

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

export const SCREEN_WIDTH = Dimensions.get("window").width;
export const SCREEN_HEIGHT = Dimensions.get("window").height;

export const COLORS = {
  white: "#ffffff",
  gold: "#A4863D",
  offwhite: "#F3F3F3",
  lemon: "#e1fbc1ab",
  black: "#000000",
  primary: "#05062F",
  primary0: "#fbfdff",
  green: "#2BC652",
  chocolate: "#5d5c6c",
  chocolateBackground: "#CECFCD",
  pastel: "#E6E6FA",
  red: "red",
  gray: "#808080",
  lightGray: "#f5f5f5",
  lightGray2: "#f8fafc",
  lightOrange: "#FF95001A",
  orange: "#FF9500",
  lightRed: "#EC2614",
};

export const SIZES = {
  //global sizes
  base: screenHeight * 0.01,
  font: screenHeight * 0.0175,
  radius: 5,
  padding: screenHeight * 0.03,

  // font sizes
  navTitle: screenHeight * 0.04375,
  h1: screenHeight * 0.0375,
  h2: screenHeight * 0.0275,
  h2a: screenHeight * 0.034,
  h2c: screenHeight * 0.0245,
  h3: screenHeight * 0.0225,
  h3a: screenHeight * 0.0235,
  h4: screenHeight * 0.0175,
  h5: screenHeight * 0.015,
  body1: screenHeight * 0.0355,
  body2: screenHeight * 0.025,
  body3: screenHeight * 0.02,
  body3a: screenHeight * 0.02,
  body3b: screenHeight * 0.022,
  body4: screenHeight * 0.0175,
  body5: screenHeight * 0.015,
  body6: screenHeight * 0.01,
  intro: screenHeight * 0.04,

  // app dimensions
  width,
  height,
};

export const FONTS: Record<string, TextStyle> = {
  // --- NEW OUTFIT FONTS ---
  outfitThin: {
    fontFamily: "OutfitThin",
    fontSize: SIZES.body3,
  },
  outfitExtraLight: {
    fontFamily: "OutfitExtraLight",
    fontSize: SIZES.body3,
  },
  outfitLight: {
    fontFamily: "OutfitLight",
    fontSize: SIZES.body3,
  },
  outfitRegular: {
    fontFamily: "Outfit",
    fontSize: SIZES.body3,
  },
  outfitMedium: {
    fontFamily: "OutfitMedium",
    fontSize: SIZES.body3,
  },
  outfitSemiBold: {
    fontFamily: "OutfitSemiBold",
    color: COLORS.primary,
    fontSize: SIZES.h3,
  },
  outfitBold: {
    fontFamily: "OutfitBold",
    fontSize: SIZES.h3,
  },
  outfitExtraBold: {
    fontFamily: "OutfitExtraBold",
    fontSize: SIZES.h3,
  },
  outfitBlack: {
    fontFamily: "OutfitBlack",
    fontSize: SIZES.h3,
  },

  // --- EXISTING NUNITO FONTS ---
  navTitle: {
    fontFamily: "CustomFont2",
    fontSize: SIZES.navTitle,
    color: "#000000",
  },
  largeTitleBold: {
    fontFamily: "CustomFont2",
    fontSize: SIZES.h1 * 1.1,
    lineHeight: screenHeight * 0.05,
    color: "#000000",
  },
  h1: {
    fontFamily: "CustomFont2",
    fontWeight: "bold",
    fontSize: SIZES.h1,
    lineHeight: screenHeight * 0.05,
    color: "#000000",
  },
  h1a: {
    fontFamily: "CustomFont2",
    fontWeight: "bold",
    fontSize: SIZES.h1 * 0.9,
    lineHeight: screenHeight * 0.05,
    color: "#000000",
  },
  h2: {
    fontFamily: "CustomFont2",
    fontWeight: "bold",
    fontSize: SIZES.h2,
    lineHeight: screenHeight * 0.0375,
    color: "#000000",
  },
  h3: {
    fontFamily: "CustomFont2",
    fontWeight: "700",
    fontSize: SIZES.h3,
    lineHeight: screenHeight * 0.025,
    color: "#000000",
  },
  h3a: {
    fontFamily: "CustomFont2",
    fontSize: SIZES.h3a,
    lineHeight: screenHeight * 0.025,
    color: "#000000",
  },
  h4: {
    fontFamily: "CustomFont2",
    fontWeight: "bold",
    fontSize: SIZES.h4,
    lineHeight: screenHeight * 0.025,
    color: "#000000",
  },
  h5: {
    fontFamily: "CustomFont2",
    fontWeight: "bold",
    fontSize: SIZES.h5,
    lineHeight: screenHeight * 0.025,
    color: "#000000",
  },
  body: {
    fontFamily: "CustomFont2",
    fontSize: SIZES.body1 * 1.2,
    lineHeight: 39,
    color: "#000000",
  },
  body1: {
    fontFamily: "CustomFont2",
    fontSize: SIZES.body1,
    lineHeight: 36,
    color: "#000000",
  },
  body2: {
    fontFamily: "CustomFont2",
    fontSize: SIZES.body2,
    lineHeight: 30,
    color: "#000000",
  },
  body2a: {
    fontFamily: "CustomFont2",
    fontSize: SIZES.body2 * 0.95,
    lineHeight: 30,
    color: "#000000",
  },
  body2b: {
    fontFamily: "CustomFont2",
    fontSize: SIZES.body2 * 0.935,
    lineHeight: 30,
    color: "#000000",
  },
  body2c: {
    fontFamily: "CustomFont2",
    fontSize: SIZES.body2 * 1.3,
    lineHeight: 30,
    color: "#000000",
  },
  body3: {
    fontFamily: "CustomFont2",
    fontSize: SIZES.body3 * 1.05,
    lineHeight: 22,
    color: "#000000",
  },
  body3a: {
    fontFamily: "CustomFont2",
    fontSize: SIZES.body3a,
    lineHeight: 22,
    color: "#000000",
  },
  body3b: {
    fontFamily: "CustomFont2",
    fontSize: SIZES.body3b,
    lineHeight: 22,
    color: "#000000",
  },
  body3c: {
    fontFamily: "CustomFont2",
    fontSize: SIZES.body3a * 0.88,
    lineHeight: 22,
    color: "#000000",
  },
  body4i: {
    fontFamily: "CustomFont",
    fontSize: SIZES.body4,
    lineHeight: 22,
    color: "#000000",
  },
  body4bi: {
    fontFamily: "CustomFont",
    fontSize: SIZES.body4 * 0.9,
    lineHeight: 22,
    color: "#000000",
  },
  body5i: {
    fontFamily: "CustomFont",
    fontSize: SIZES.body5,
    lineHeight: 22,
    color: "#000000",
  },
  body6i: {
    fontFamily: "CustomFont",
    fontSize: SIZES.body6,
    lineHeight: 22,
    color: "#000000",
  },
  body4: {
    fontFamily: "CustomFont2",
    fontSize: SIZES.body4,
    lineHeight: 22,
    color: "#000000",
  },
  body4b: {
    fontFamily: "CustomFont2",
    fontSize: SIZES.body4 * 0.9,
    lineHeight: 22,
    color: "#000000",
  },
  body5: {
    fontFamily: "CustomFont2",
    fontSize: SIZES.body5,
    lineHeight: 22,
    color: "#000000",
  },
  body6: {
    fontFamily: "CustomFont2",
    fontSize: SIZES.body6,
    lineHeight: 22,
    color: "#000000",
  },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;

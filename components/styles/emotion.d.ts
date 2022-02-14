import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    screen: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
    };
    fontSize: {
      header1: string;
      header2: string;
      header3: string;
      header4: string;
      header5: string;
      sub1: string;
      sub2: string;
      sub3: string;
      body1: string;
      body2: string;
      body3: string;
    };
    lineHeight: {
      header1: string;
      header2: string;
      header3: string;
      header4: string;
      header5: string;
      sub1: string;
      sub2: string;
      sub3: string;
      body1: string;
      body2: string;
      body3: string;
    };
    color: {
      white: string;
      black: string;
      gray: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
      };
      blue: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
      };
      green: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
      };
      red: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
      };
    };
    shadow: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      inset: {
        top: string;
        bottom: string;
      };
    };
    rounded: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      full: string;
    };
  }
}

import { Container, createTheme, px, rem } from "@mantine/core";

export const theme = createTheme({
  colors: {
    // Add your color
    own: [
      "#ffffff",
      "#f2f2f2",
      "#b9c7e2",
      "#94a8d0",
      "#748dc1",
      "#5f7cb8",
      "#5474b4",
      "#44639f",
      "#39588f",
      "#2d4b81",
    ],
    // or replace default theme color
    blue: [
      "#eef3ff",
      "#dee2f2",
      "#bdc2de",
      "#98a0ca",
      "#7a84ba",
      "#6672b0",
      "#5c68ac",
      "#4c5897",
      "#424e88",
      "#364379",
    ],
  },

  primaryColor: "blue",
  primaryShade: 6,

  shadows: {
    md: "1px 1px 3px rgba(0, 0, 0, .25)",
    xl: "5px 5px 3px rgba(0, 0, 0, .25)",
  },

  headings: {
    fontFamily: "Roboto, sans-serif",
    sizes: {
      h1: { fontSize: rem(50) },
      h2: { fontSize: rem(40) },
    },
  },

  components: {
    Button: {
      defaultProps: {
        variant: "filled",
      },
    },

    Container: {
      defaultProps: {
        styles: { root: { margin: px(8) } },
      },
    },
  },
});

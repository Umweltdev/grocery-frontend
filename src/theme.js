import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
      mode: "light",
      text: {
        primary: "#2B3445",
        secondary: "#7D879C",
        
        
      },
      primary: {
        main: "#D23F57",
        light: "#FCE9EC",
        contrastText: '#AEB4BE'
      },
  
      secondary: {
        main: "#F98207",
        dark: "#222935",
      },
  
      background: {
        default: "#fff",
        paper: "#F6F9FC",
      },
    },
    typography: {
      htmlFontSize: 10,
      fontFamily: [
        "Poppins",
        "sans-serif",
      ].join(","),
      fontSize: 14,
      h5: {
        fontWeight: 700,
        fontSize: "25px",
        lineHeight: 1,
      },
      h6: {
        fontWeight: 600,
        fontSize: "18px",
        lineHeight: 1,
      },
      body2: {
        fontWeight: 600,
        fontSize: "16px",
        lineHeight: 1.5,
      },
      subtitle1: {
        fontWeight: 600,
        fontSize: "14px",
        lineHeight: 1.5,
      },
      subtitle2: {
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: 1.5,
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 968,
        lg: 1230,
        xl: 1536,
      },
    },
  });
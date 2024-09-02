'use client'

// Create a theme.js file in your project
import { createTheme } from '@mui/material/styles';

// Define a consistent theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#967969', // Your primary color
    },
    secondary: {
      main: '#785a4e', // A complementary color for hover states
    },
    background: {
      default: '#f0f0f0', // Light background color
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif", // Clean and modern font
    h2: {
      fontWeight: 600,
      color: '#333',
    },
    h3: {
      fontWeight: 500,
      color: '#333',
    },
  },
});

export default theme;

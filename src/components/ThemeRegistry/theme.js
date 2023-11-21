import { createTheme } from '@mui/material/styles';
import { Changa } from 'next/font/google';

const changa = Changa({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
    direction: 'rtl',
  palette: {
    mode: 'light',
  },
  typography: {
    fontFamily: changa.style.fontFamily,
  },
});

export default theme;
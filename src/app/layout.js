import Header from "@/components/Header";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import "./globals.css";
import { Box } from "@mui/material";
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <ThemeRegistry>
          <Header />
          <Box component={"main"} sx={{ py: 10 }}>
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}

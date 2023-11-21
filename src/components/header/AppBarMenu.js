"use client";
import { menuItems } from "@/data/menuData";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import BasMenu from "../BaseMenu";
import MegaMenu from "../MegaMenu";
function AppBarMenu({ handleDrawerOpen }) {
  return (
    <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar
        disableGutters
        component={Container}
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: { xs: "center", md: "stretch" },
          justifyContent: "space-between",
        }}
      >
        {" "}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerOpen}
          sx={{ display: { xs: "flex", md: "none" } }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M3 18v-2h18v2H3Zm0-5v-2h18v2H3Zm0-5V6h18v2H3Z"
            />
          </svg>
        </IconButton>
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo"
            width={152}
            height={50}
            style={{ height: "50px", marginRight: "10px" }}
          />
        </Link>
        <Box
          component={"nav"}
          sx={{ display: { xs: "none", sm: "none", md: "block" } }}
        >
          {" "}
          <MegaMenu name={"مستجدات"} items={menuItems[0].items} />
          <BasMenu menu={menuItems.slice(1)} />
          <Button
            sx={{
              p: 2,
              color: "primary.main",

              "&:hover": { backgroundColor: "rgba(255, 100, 100, 0.04)" },
            }}
            component={Link}
            href="about-us"
          >
            من نحن
          </Button>
          <Button
            sx={{
              p: 2,
              color: "primary.main",

              "&:hover": { backgroundColor: "rgba(255, 100, 100, 0.04)" },
            }}
            component={Link}
            href="contact-us"
          >
            اتصل بنا
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default AppBarMenu;

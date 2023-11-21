"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SvgIcon from "@mui/material/SvgIcon";
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import BasMenu from "./BaseMenu";
import MegaMenu from "./MegaMenu";

const megaMenuItems = [
  { title: "آخر الأخبار", url: "/latest-news" },
  { title: "تحديثات القضايا", url: "/case-updates" },
  { title: "مقالات تحليلية", url: "/analytical-articles" },
  { title: "تقارير خاصة", url: "/special-reports" },
  { title: "مقابلات", url: "/interviews" },
  { title: "ملفات الفيديو والوسائط", url: "/media-files" },
  { title: "النشرة الإخبارية", url: "/newsletters" },
  { title: "الفعاليات والمؤتمرات", url: "/events-conferences" },
];
const menuItems = [
  {
    title: "مستجدات ",
    items: megaMenuItems,
  },
  {
    title: "توثيق الجرائم",
    items: [
      { title: "تقديم بلاغات", url: "/report-crime" },
      { title: "البحث عن جرائم مسجلة", url: "/search-crimes" },
    ],
  },
  {
    title: "دعم",
    items: [
      { title: "مركز المساعدة", url: "/help-center" },
      { title: "التوجيه القانوني", url: "/legal-guidance" },
    ],
  },
  {
    title: "مراقبة",
    items: [
      { title: "تحليل البيانات", url: "/data-analysis" },
      { title: "تقارير المراقبة", url: "/monitoring-reports" },
    ],
  },
  {
    title: "تعاون",
    items: [
      { title: "منتديات للنقاش", url: "/discussion-forums" },
      { title: "شراكات مع منظمات أخرى", url: "/partnerships" },
    ],
  },
  // يمكنك إضافة المزيد من الفئات هنا
];

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    style: {
      transition: "0.3s", // إضافة تأثير انتقالي
      backgroundColor: trigger ? "rgba(2, 103, 43, 0.27)" : "transparent",
      backdropFilter: trigger ? "blur(5px)" : "none",
    },
  });
}

export default function ElevateAppBar() {
  const [open, setOpen] = React.useState(false);
  const [expandedMenu, setExpandedMenu] = React.useState(null);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setExpandedMenu(null); // إغلاق القوائم الفرعية عند إغلاق الدرج
  };

  const toggleSubMenu = (menuTitle) => {
    if (expandedMenu === menuTitle) {
      setExpandedMenu(null); // إغلاق القائمة الفرعية إذا كانت مفتوحة بالفعل
    } else {
      setExpandedMenu(menuTitle); // فتح القائمة الفرعية
    }
  };

  const getDelayStyle = (index) => ({
    transitionDelay: `${0.3 * index}s`, // تأخير بناءً على مؤشر العنصر
  });
  const drawerWidth = 240;

  return (
    <>
      <ElevationScroll>
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
              sx={{ display: { xs: "flex", md: "none" }, m: 0 }}
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
            <Link href="/" style={{ display: "flex", placeItems: "center" }}>
              <Image
                src="/logo.png"
                alt="Logo"
                width={142}
                height={42}
                style={{ width: "100%" }}
              />
            </Link>
            <Box component={"nav"} sx={{ display: { xs: "none", md: "flex" } }}>
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
      </ElevationScroll>{" "}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {menuItems.map((menu, index) => (
              <React.Fragment key={menu.title}>
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton onClick={() => toggleSubMenu(menu.title)}>
                    <ListItemText primary={menu.title} />{" "}
                    <ListItemIcon sx={{ placeContent: "end" }}>
                      <SvgIcon sx={{ ml: 1 }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <g
                            transform={
                              expandedMenu === menu.title
                                ? "rotate(-90 12 12)"
                                : "rotate(90 12 12)"
                            }
                          >
                            <path
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              d="m9 6l6 6l-6 6"
                            />
                          </g>
                        </svg>
                      </SvgIcon>
                    </ListItemIcon>
                  </ListItemButton>
                  <Collapse
                    in={expandedMenu === menu.title}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List disablePadding>
                      {menu.items.map((item, itemIndex) => (
                        <ListItem key={item.title} disablePadding>
                          <ListItemButton
                            component={Link}
                            href={item.url}
                            sx={{ pl: 4, ...getDelayStyle(itemIndex) }}
                          >
                            <ListItemText primary={item.title} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

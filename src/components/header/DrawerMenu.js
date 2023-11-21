"use client";

import { menuItems } from "@/data/menuData";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SvgIcon from "@mui/material/SvgIcon";
import Toolbar from "@mui/material/Toolbar";
import Link from "next/link";
import React, { useState } from "react";

function DrawerMenu({ open, handleDrawerClose }) {
  const [expandedMenu, setExpandedMenu] = useState(null);
  const drawerWidth = 240;
  const toggleSubMenu = (menuTitle) => {
    if (expandedMenu === menuTitle) {
      setExpandedMenu(null);
    } else {
      setExpandedMenu(menuTitle);
    }
  };

  const getDelayStyle = (index) => ({
    transitionDelay: `${0.3 * index}s`,
  });

  return (
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
  );
}

export default DrawerMenu;

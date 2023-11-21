"use client";
import { Box, Button, Menu, MenuItem, SvgIcon } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";

export default function BaseMenu({ menu = [] }) {
  const [anchorEl, setAnchorEl] = useState({});

  const handleClick = (title) => (event) => {
    setAnchorEl({ ...anchorEl, [title]: event.currentTarget });
  };

  const handleClose = () => {
    setAnchorEl({});
  };

  const isOpen = (title) => Boolean(anchorEl[title]);

  return (
    <>
      {menu.map((menuItem) => (
        <React.Fragment key={menuItem.title}>
          <Button
            id={`button-${menuItem.title}`}
            aria-controls={
              isOpen(menuItem.title) ? `menu-${menuItem.title}` : undefined
            }
            aria-haspopup="true"
            aria-expanded={isOpen(menuItem.title) ? "true" : undefined}
            onClick={handleClick(menuItem.title)}
            sx={{
              p: 2,
              color: isOpen(menuItem.title) ? "red" : "primary.main",
              "&:hover": { backgroundColor: "rgba(255, 100, 100, 0.04)" },
            }}
          >
            <span>{menuItem.title}</span>{" "}
            <SvgIcon sx={{ ml: 1 }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 transition transform group-hover:rotate-180 group-hover:text-green-900 duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </SvgIcon>
          </Button>
          <Menu
            id={`menu-${menuItem.title}`}
            anchorEl={anchorEl[menuItem.title]}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={isOpen(menuItem.title)}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": `button-${menuItem.title}`,
            }}
            elevation={0}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            slotProps={{
              paper: {
                style: {
                  maxHeight: "none",

                  boxShadow:
                    "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
                },
              },
            }}
          >
            {menuItem.items.map((item) => (
              <MenuItem
                key={item.url}
                onClick={handleClose}
                sx={{
                  color: "grey.700",
                  p: 0,
                  width: "100%",
                  "&:hover": {
                    backgroundColor: "rgba(255, 100, 100, 0.04)",
                    color: "primary.500",
                  },
                }}
              >
                <Box
                  component={Link}
                  href={item.url}
                  sx={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    flexGrow: 1,
                    padding: "16px 36px",
                    color: "inherit",
                  }}
                  underline="none"
                >
                  {item.title}
                </Box>
              </MenuItem>
            ))}
          </Menu>
        </React.Fragment>
      ))}
    </>
  );
}

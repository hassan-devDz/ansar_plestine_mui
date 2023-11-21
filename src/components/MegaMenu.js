"use client";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SvgIcon from "@mui/material/SvgIcon";
import Link from "next/link";
import { useState } from "react";

export default function MegaMenu({ name, items }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          p: 2,
          color: open ? "red" : "primary.main",

          "&:hover": { backgroundColor: "rgba(255, 100, 100, 0.04)" },
        }}
      >
        <span>{name}</span>
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
        id="basic-menu"
        elevation={0}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          style: { padding: 0, display: "flex", flexWrap: "wrap" },
        }}
        slotProps={{
          paper: {
            style: {
              maxHeight: "none",
              width: "458px",
              padding: 12,
              boxShadow:
                "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
            },
          },
        }}
      >
        {items.map((item) => (
          <MenuItem
            key={item.url}
            onClick={handleClose}
            sx={{
              color: "grey.700",
              p: 0,
              width: "50%",
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
                padding: " 16px 36px",

                color: "inherit",
              }}
              underline="none"
            >
              {item.title}
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

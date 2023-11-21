"use client";
import { useState } from "react";
import AppBarMenu from "./AppBarMenu";
import DrawerMenu from "./DrawerMenu";
import ElevationScroll from "./ElevationScroll";

export default function ElevateAppBar() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ElevationScroll>
        <AppBarMenu handleDrawerOpen={handleDrawerOpen} />
      </ElevationScroll>
      <DrawerMenu open={open} handleDrawerClose={handleDrawerClose} />
    </>
  );
}

"use client";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import React from "react";

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    style: {
      transition: "0.3s",
      backgroundColor: trigger ? "rgba(2, 103, 43, 0.27)" : "transparent",
      backdropFilter: trigger ? "blur(5px)" : "none",
    },
  });
}

export default ElevationScroll;

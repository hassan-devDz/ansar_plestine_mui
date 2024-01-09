// FileUpload.js
import React from "react";
import { ImageList, ImageListItem, SvgIcon } from "@mui/material";
import Image from "next/image";

function FileUpload({ filePreviews, calculateColsRows, handleRemoveFile }) {
  return (
    <ImageList
      sx={{ maxHeight: 450 }}
      variant="quilted"
      cols={4}
      rowHeight={121}
    >
      {filePreviews &&
        filePreviews.map((preview, index) => (
          <ImageListItem
            key={preview.src}
            style={{
              position: "relative",
            }}
            cols={calculateColsRows(index).cols}
            rows={calculateColsRows(index).rows}
          >
            {preview.type.startsWith("image/") ? (
              <Image
                src={preview.src}
                alt={preview.alt}
                fill
                sizes="(min-width: 808px) 50vw, 100vw"
                style={{
                  objectFit: "cover",
                }}
              />
            ) : (
              <video
                width="200"
                height="200"
                controls
                style={{ height: "100%", width: "100%" }}
              >
                {" "}
                <source src={preview.src} type={preview.type} />
                Your browser does not support the video tag.
              </video>
            )}
            <SvgIcon
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                cursor: "pointer",
              }}
              onClick={() => handleRemoveFile(index)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g transform="rotate(180 12 12)">
                  <path
                    fill="currentColor"
                    d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z"
                  />
                </g>
              </svg>
            </SvgIcon>
          </ImageListItem>
        ))}
    </ImageList>
  );
}

export default FileUpload;

import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function Footer() {
  return (
    <footer className="py-[10px] md:fixed md:bottom-0 w-full bg-dark text-center text-textPrimary">
      <p>
        Created with <FavoriteIcon color="primary" /> by
        <a href="https://github.com/Umesh-JNU" className="font-semibold text-hover hover:text-textPrimary no-underline"> Umesh Kumar</a>
      </p>
    </footer>
  );
}

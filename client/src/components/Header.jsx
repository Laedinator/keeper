import React from "react";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

function Header() {
  return (
    <header>
      <h1>
          <FormatListBulletedIcon fontSize="large" className="titleIcon"  />
          Keeper
      </h1>
    </header>
  );
}

export default Header;

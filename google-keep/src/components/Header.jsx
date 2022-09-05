import React from "react";
import HighlightIcon from "@mui/icons-material/Highlight";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
function Header() {
  return (
    <header className="header">
      <HighlightIcon /> &nbsp; Keeper
      <div className="right">
        {/* <LogoutIcon onClick={()=>{axios.post("logout")}}/> */}
      </div>
    </header>
  );
}
export default Header;

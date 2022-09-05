import React from "react";
import HighlightIcon from "@mui/icons-material/Highlight";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
function Header() {
  const style={
    margin: "0px",
    padding:"4px"
  }
  return (
    <header className="header">
      <HighlightIcon /> &nbsp; Keeper
      <div className="right">
        <LogoutIcon className="icon" style ={style}onClick={()=>{axios.post("logout")}}/>
      </div>
    </header>
  );
}
export default Header;

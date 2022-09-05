import React from "react";
import HighlightIcon from "@mui/icons-material/Highlight";
import LogoutIcon from "@mui/icons-material/Logout";

function Header(props) {
  const style = {
    margin: "0px",
    padding: "4px",
  };
  return (
    <header className="header">
      <HighlightIcon /> &nbsp; Keeper
      <div className="right">
        <LogoutIcon className="icon" style={style} onClick={props.logout} />
      </div>
    </header>
  );
}
export default Header;

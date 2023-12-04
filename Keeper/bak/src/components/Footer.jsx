import React from "react";
function Footer() {
  const date = new Date().getFullYear();
  return <div className="footer"> &copy; btngana {date}</div>;
}

export default Footer;

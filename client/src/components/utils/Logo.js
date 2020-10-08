import React from "react";

export default function Logo({
  fontSize = "90pt",
  paddingTop = "10vh",
  marginLeft = "-100%",
  marginRight = "-100%",
  ...props
}) {
  const logoStyle = {
    pointerEvents: "none",
    fontFamily: "'Montserrat' sans-serif",
    fontSize: fontSize,
    fontWeight: "900",
    fontStyle: "italic",
    marginLeft: marginLeft,
    marginRight: marginRight,
    textAlign: "center",
    paddingTop: paddingTop,
    color: "white",
  };

  return (
    <div style={logoStyle} {...props}>
      LIFTR
    </div>
  );
}

import React from "react";

export default function Logo({
  fontSize = "80pt",
  paddingTop = "10vh",
  width = "100%",
  white = false,
  ...props
}) {
  const logoStyle = {
    pointerEvents: "none",
    fontFamily: "'Montserrat' sans-serif",
    fontSize: fontSize,
    fontWeight: "900",
    fontStyle: "italic",
    textAlign: "center",
    paddingTop: paddingTop,
    color: white ? "white" : "#4A34D4",
  };

  return (
    <div style={logoStyle} {...props}>
      LIFTR
    </div>
  );
}

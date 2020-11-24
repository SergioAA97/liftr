import React from "react";
import { Card, Divider } from "antd";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const DiarySection = ({ name = "Breakfast", path, children, extra }) => {
  const containerStyle = {
    paddingTop: "1rem",
    paddingBottom: "1rem",
  };

  const cardStyle = {
    borderRadius: "7px",
  };

  return (
    <>
      {
        <div style={containerStyle} className="inv-font">
          <Card
            bordered={false}
            style={cardStyle}
            title={name}
            className="gradient-primary"
            extra={extra}
          >
            {children}
            <Divider plain>Add</Divider>
            <div style={{ width: "100%", textAlign: "center" }}>
              <Link to={"/" + path + "/new/" + name.toLowerCase()}>
                <FontAwesomeIcon icon={faPlus} style={{ color: "white" }} />
              </Link>
            </div>
          </Card>
        </div>
      }
    </>
  );
};

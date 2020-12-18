import React from "react";
import { Card } from "antd";
import { Link, useHistory } from "react-router-dom";
import { EyeOutlined, HeartOutlined } from "@ant-design/icons";

const { Meta } = Card;

export default function Article({
  img,
  title,
  description,
  link,
  date,
  author,
  avatar,
  saveButton = true,
  optionsButton = true,
}) {
  const history = useHistory();

  const onClick = (link) => {
    history.push(link);
  };

  return (
    <Card
      hoverable
      className="inv-font"
      cover={
        img ? (
          <img
            style={{
              objectFit: "cover",
              objectPosition: "center",
              width: "100%",
              overflow: "hidden",
            }}
            alt={title}
            src={img}
          />
        ) : (
          <></>
        )
      }
      onClick={() => onClick(link)}
    >
      <Meta
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        title={title}
        description={description}
      />
    </Card>
  );
}

import { Spin } from "antd";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
export default function Spinner() {
  return (
    <Spin
      tip="Loading..."
      indicator={
        <LoadingOutlined
          style={{ fontSize: 24, color: "rgb(72, 52, 212)" }}
          spin
        />
      }
    />
  );
}

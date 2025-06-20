import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import React from "react";

function UserNameSearchFeildMobileView(props:any) {
    const { userName, setUserName } = props;
  return (
    <Input
      placeholder="User name"
      allowClear
      className="w-full"
      prefix={<SearchOutlined />}
      onChange={(e: any) => setUserName(e.target.value)}
      value={userName}
    />
  );
}

export default UserNameSearchFeildMobileView;

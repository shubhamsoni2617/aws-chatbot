import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";


function UserNameSearchFeild(props:any) {
    const { userName, setUserName } = props;
  return (
    <div className="UserNameSearchBar">
      <Input
        placeholder="User name"
        allowClear
        className="w-[200px]"
        prefix={<SearchOutlined />}
        onChange={(e: any) => setUserName(e.target.value)}
        value={userName}
      />
    </div>
  );
}

export default UserNameSearchFeild;

import { Input } from "antd";
import { CiSearch } from "react-icons/ci";

function SearchBar(props:any) {
    const {setSearchInput} = props;
    const onSearchBarChange = (value: any) => {
    setSearchInput(value);
  };
  return (
    <div className="bg-white shadow-md rounded-xl p-5 mt-[-24px] ">
      <Input
        placeholder="Task search"
        allowClear
        className="w-full focus-within:border-[#c847e8]"
        prefix={<CiSearch size={16} />}
        onChange={(value) => onSearchBarChange(value.target.value)}
      />
    </div>
  );
}

export default SearchBar;

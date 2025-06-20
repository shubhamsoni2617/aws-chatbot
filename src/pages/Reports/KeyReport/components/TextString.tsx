interface TextStringProps {
  data: string | undefined;
}

const TextString = ({ data }: TextStringProps) => {
  return (
    <div className="font-[400] font-[Inter] text-[#1e293b] text-[14px]">
      {data}
    </div>
  );
};

export default TextString;

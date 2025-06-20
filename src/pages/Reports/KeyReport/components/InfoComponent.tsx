interface InfoComponentProps {
  heading: string;
  details: string;
}

const InfoComponent = ({ heading, details }: InfoComponentProps) => {
  return (
    <div className="flex flex-row">
      <div className="text-[12px] font-[600] font-[Inter] text-[#1e293b] mr-[10px]">
        {heading}
      </div>
      <div className="text-[12px] font-[500] font-[Inter] text-[#475569]">
        {details}
      </div>
    </div>
  );
};

export default InfoComponent;

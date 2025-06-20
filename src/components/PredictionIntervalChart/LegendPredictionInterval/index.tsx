const LegendPredictionInterval = () => {
  return (
    <div className="flex flex-row justify-center align-center md:gap-[60px] gap-[20px] mt-[-150px] md:mt-[-105px]">
      <div className="flex flex-row mr-2 justify-center items-center">
        <div className="w-3 h-3 bg-[#c2ccff] rounded-full mr-1"></div>
        <span className="text-[#615e83] font-[400] text-[14px]">Level 80</span>
      </div>
      <div className="flex flex-row mr-2 justify-center items-center">
        <div className="w-3 h-3 bg-[#edf0ff] rounded-full mr-1"></div>
        <span className="text-[#615e83] font-[400] text-[14px]">Level 95</span>
      </div>
      <div className="flex flex-row mr-2 justify-center items-center">
        <div className="w-3 h-3 bg-[#c847e8] rounded-full mr-1"></div>
        <span className="text-[#615e83] font-[400] text-[14px]">Actuals</span>
      </div>
    </div>
  );
};

export default LegendPredictionInterval;

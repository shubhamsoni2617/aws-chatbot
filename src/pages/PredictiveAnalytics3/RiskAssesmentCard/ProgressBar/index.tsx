// const GradientProgress = ({ totalSteps = 30, percent = 50 , value=70}) => {
//   const filledSteps = Math.round((percent / 100) * totalSteps);

//   const getColor = (index: any) => {
//     const ratio = index / (totalSteps - 1);
//     // Interpolate from orange to green (critical to stable)
//     const red = Math.round(255 - ratio * 155); // From 255 to 100
//     const green = Math.round(165 + ratio * 90); // From 165 to 255
//     const blue = 0;
//     return `rgb(${red},${green},${blue})`;
//   };

//   const position = Math.min(Math.max(value, 0), 100);

//   return (
//     // <div className="flex md:flex-row flex-col items-center w-full gap-0">
//     //   <span className="mr-2 font-medium md:block hidden">Critical</span>
//     //   <div className="flex w-full">
//     //     {Array.from({ length: totalSteps }).map((_, i) => {
//     //       const isFilled = i < filledSteps;
//     //       return (
//     //         <div
//     //           key={i}
//     //           className={`h-5 rounded-md transition-colors ${
//     //             i !== 0 && "lg:ml-6 md:ml-2 ml-1"
//     //           } flex-1`}
//     //           style={{
//     //             backgroundColor: isFilled ? getColor(i) : "#e9ecf1",
//     //           }}
//     //         />
//     //       );
//     //     })}
//     //   </div>
//     //   <div className="flex justify-between md:hidden w-full mt-[10px]">
//     //     <span className="font-medium">Critical</span>
//     //     <span className="font-medium">Stable</span>
//     //   </div>
//     //   <span className="ml-2 font-medium md:block hidden">Stable</span>
//     // </div>
//     <div className="relative h-4 w-full">
//         {/* Background bar with gradient */}
//         <div 
//           className="absolute inset-0 rounded-full" 
//           style={{
//             background: 'linear-gradient(to right, #e74c3c, #e67e22, #f1c40f, #2ecc71)'
//           }}
//         />
        
//         {/* White circle indicator */}
//         <div 
//           className="absolute top-1/2 transform -translate-y-1/2 h-6 w-6 bg-white rounded-full border-2 border-gray-300 shadow-md"
//           style={{ left: `calc(${position}% - 12px)` }}
//         />
        
//         {/* Labels */}

//         <div className="flex flex-row justify-evenly">

//         <div className="relative top-8 left-0 text-gray-700 font-medium">Critical</div>
//         <div className=" relative top-8 left-1/2 transform -translate-x-1/2 text-gray-700 font-medium">At Risk</div>
//         <div className=" relative top- right-0 text-gray-700 font-medium">Stable</div>
//         </div>
//       </div>
//   );
// };

// export default GradientProgress;

// import React from "react";

interface Props {
  totalSteps?: number;
  percent?: number;
  value?: number;
}


const GradientProgress = ({ totalSteps = 30, value }: Props) => {
  // const filledSteps = Math.round((percent / 100) * totalSteps);


  const getColor = (index: number) => {
    const ratio = index / (totalSteps - 1);
    const red = Math.round(255 - ratio * 155); // 255 → 100
    const green = Math.round(165 + ratio * 90); // 165 → 255
    const blue = 0;
    return `rgb(${red},${green},${blue})`;
  };

  const position = Math.min(Math.max(value ?value : 0, 0), 100);
  const borderColor = value ? getColor(Math.round((value / 100) * (totalSteps - 1))) : "#fff";

  return (
    <div className="relative h-4 w-full">
      {/* Gradient bar */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "linear-gradient(to right, #DC3545, #FFC107, #28A745)",
        }}
      />

      {/* Transparent circle with gradient-colored border */}
      <div
        className="absolute top-1/2 transform -translate-y-1/2 h-6 w-6 bg-white rounded-full border-4 shadow-md"
        style={{
          left: `calc(${position}% - 12px)`,
          backgroundColor: "white",
          borderColor: borderColor,
        }}
      />

      {/* Labels */}
      
    </div>
  );
};

export default GradientProgress;


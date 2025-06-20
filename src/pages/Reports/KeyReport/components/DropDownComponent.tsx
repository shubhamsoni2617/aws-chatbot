import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import UIButton from "@/components/ui/UIButton";
import Heading from "./Heading";

interface DropDownComponentProps {
  heading: string;
  children: React.ReactNode;
  navigationFunction?: () => void;
}

const DropDownComponent = ({
  heading,
  children,
  navigationFunction,
}: DropDownComponentProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
    <div className="flex flex-col">
      <div className="flex md:flex-row flex-col md:gap-0 gap-[16px] items-center mt-[24px] justify-between cursor-pointer">
        <div
          className="flex flex-row items-center"
          onClick={() => setIsVisible((prev) => !prev)}
          style={{ color: isVisible ? "#c847e8" : "#1e293b" }}
        >
          {isVisible ? <IoIosArrowDown /> : <IoIosArrowForward />}
          <Heading
            heading={heading}
            color={isVisible ? "#c847e8" : "#1e293b"}
          />
        </div>
        {navigationFunction && (
          <div className="min-h-[37px] md:w-auto w-full">
            <UIButton
              background="#fff"
              borderColor="#c847e8"
              color="#c847e8"
              text="See Details"
              onClick={navigationFunction}
            />
          </div>
        )}
        {!navigationFunction && (
          <div className="min-h-[37px] md:w-auto w-full">
            
          </div>
        )}
      </div>
      {isVisible && <div className="mt-[24px]">{children}</div>}
    </div>
    <hr className="mt-[24px]"/>
    </>
  );
};

export default DropDownComponent;

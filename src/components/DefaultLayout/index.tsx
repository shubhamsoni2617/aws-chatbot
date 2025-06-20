import { useState, ReactNode, useEffect } from "react";
import SideBar from "./SideBar";
import Header from "./Header";
import { Layout } from "antd";
import "./index.css";

type Props = {
  FilterComponent?: ReactNode;
  isFilter?: boolean;
  noUserName?: boolean;
  heading: string;
  children: ReactNode;
};

const DefaultLayout = ({
  FilterComponent,
  heading,
  children,
  isFilter = true,
  noUserName = false,
}: Props) => {
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSideBarVis, setIsSideBarVis] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      // setWindowWidth(width);
      setIsSideBarVis(width >= 1024);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSideBarVis = () => {
    setIsSideBarVis((prev) => !prev);
  };

  return (
    <Layout hasSider={true}>
      <SideBar isVisible={isSideBarVis} onClose={toggleSideBarVis} />
      <Layout className="lg:ml-[280px] h-screen overflow-y-auto">
        <Header
          toggleSideBarVis={() => toggleSideBarVis()}
          heading={heading}
          noUserName={noUserName}
        >
          <div className="w-full">{isFilter ? FilterComponent : null}</div>
        </Header>
        <div
          className={`${
            FilterComponent ? "mt-[24px]" : "mt-[0px]"
          } mx-[24px] md:mx-[40px] mb-[40px]`}
        >
          {children}
        </div>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;

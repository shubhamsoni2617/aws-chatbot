import {
  IoBarChart,
  IoServer,
  IoAlbums,
  IoSettings,
  IoPieChart,
} from "react-icons/io5";
import { LuPanelRightOpen } from "react-icons/lu";
import logo from "../../assets/vipani.png";
import { Button, Layout, Menu } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./SideBar.css";
import { FaUserLarge } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi";
/* import preserved for future use in Company Pulse section */
// import { FaFileAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

const { Sider } = Layout;
const { SubMenu } = Menu;

const Label = ({ label }: { label: string }) => (
  <div
    style={{
      fontFamily: "Inter, sans-serif",
      fontWeight: 400,
      fontSize: "14px",
    }}
  >
    {label}
  </div>
);

const SideBar = ({ isVisible, onClose }: any) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setcollapsed] = useState<boolean>(false);

  useEffect(() => setcollapsed(!isVisible), [isVisible]);

  // Only include specific query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const allowedParams = [
    "filterByPeriod",
    "filterByCountry",
    "filterByDepartment",
    "filterByKpi",
  ];
  const filteredParams = new URLSearchParams();

  allowedParams.forEach((key) => {
    const value = urlParams.get(key);
    if (value) {
      filteredParams.append(key, value);
    }
  });

  const filteredQueryString = filteredParams.toString()
    ? `?${filteredParams.toString()}`
    : "";

  const handleLogoNavigation = () => {
    window.location.replace("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  interface TabItem {
    key: string;
    label: JSX.Element;
    path: string;
    icon: JSX.Element;
    matchPaths?: string[];
    children?: { key: string; label: JSX.Element; path: string }[];
  }

  const Tabs: TabItem[] = [
    {
      key: "1",
      label: <Label label="Company Performance" />,
      path: `/${filteredQueryString}`,
      icon: <IoBarChart className="sidebarIcon" />,
      matchPaths: [`/`],
    },
    {
      key: "2",
      label: <Label label="Financial Impact" />,
      path: `/financial-impact${filteredQueryString}`,
      icon: <IoServer className="sidebarIcon" />,
      matchPaths: [`/financial-impact`],
    },
    // {
    //   key: "3",
    //   label: <Label label="Predictive Analytics" />,
    //   icon: <IoPieChart className="sidebarIcon" />,
    //   path: `/predictive-analytics${filteredQueryString}`,
    //   matchPaths: [
    //     `/predictive-analytics`,
    //     `/predictive-analytics/CompanyPerformance`,
    //     `/predictive-analytics/FinancialImpact`,
    //   ],
    //   children: [
    //     {
    //       key: "3-1",
    //       label: <Label label="Company Performance" />,
    //       path: `/predictive-analytics/CompanyPerformance${filteredQueryString}`,
    //     },
    //     {
    //       key: "3-2",
    //       label: <Label label="Financial Impact" />,
    //       path: `/predictive-analytics/FinancialImpact${filteredQueryString}`,
    //     },
    //   ],
    // },
    {
      key: "3",
      label: <Label label="Predictive Analytics" />,
      icon: <IoPieChart className="sidebarIcon" />,
      path: `/predictive-analytics-3${filteredQueryString}`,
    },
    {
      key: "4",
      label: Label({ label: "Monitor" }),
      path: `/monitor/${filteredQueryString}`,
      icon: (
        <div className="menuItemIcon">
          <FaUserLarge className="sidebarIcon" />
        </div>
      ),
      matchPaths: [`/monitor`],
    },
    // {
    //   key: "5",
    //   label: Label({ label: "Company Pulse" }),
    //   path: `/company-pulse/${filteredQueryString}`,
    //   icon: (
    //     <div className="menuItemIcon">
    //       <FaFileAlt className="sidebarIcon" />
    //     </div>
    //   ),
    //   matchPaths: [`/company-pulse`],
    // },
    {
      key: "6",
      label: <Label label="Reports" />,
      path: `/key-report${filteredQueryString}`,
      icon: <IoAlbums className="sidebarIcon" />,
      matchPaths: [`/key-report`, `/my-report`],
    },
    {
      key: "7",
      label: Label({ label: "User & Teams" }),
      path: `/user-and-team/${filteredQueryString}`,
      icon: <HiUsers className="menuItemIcon" />,
    },
  ];

  const Tabs1 = [
    {
      key: "7",
      label: <Label label="Settings" />,
      path: `/settings${filteredQueryString}`,
      icon: <IoSettings className="sidebarIcon" />,
    },
  ];

  return (
    <Sider
      width={280}
      collapsedWidth={0}
      collapsed={collapsed}
      style={{
        background: "#471e68",
        height: "100vh",
        position: "fixed",
        zIndex: 1111,
      }}
      trigger={null}
      // breakpoint="lg"
    >
      {/* Logo and Close Button */}
      <div className="flex flex-row justify-between items-center pl-[16px] lg:pl-[32px] pr-[16px] mt-[36px] mb-[30px]">
        <div style={{ cursor: "pointer" }} onClick={handleLogoNavigation}>
          <img
            className="object-contain h-[24px] lg:h-[32px]"
            src={logo}
            alt="Logo"
          />
        </div>
        <LuPanelRightOpen
          className="CloseBtn block lg:hidden"
          style={{
            height: 32,
            width: 32,
            marginLeft: 16,
            padding: 5,
            background: "white",
            borderRadius: 18,
            strokeWidth: 1,
          }}
          onClick={onClose}
        />
      </div>

      {/* Main Menu */}
      <Menu
        className="menu-content bg-primary"
        theme="dark"
        mode="inline"
        selectedKeys={[location?.pathname]}
        defaultOpenKeys={["3"]}
        disabledOverflow
      >
        {Tabs.map((item) =>
          item.children ? (
            isVisible && (
              <SubMenu
                key={item.key}
                icon={item.icon}
                title={item.label}
                style={{
                  backgroundColor: "#471E68",
                  color: "#fff",
                  fontFamily: "Inter",
                  paddingLeft: "10px",
                }}
              >
                {item?.children.map((subItem: any) => (
                  <Menu.Item
                    key={subItem.path}
                    style={{
                      backgroundColor: "#471E68",
                      margin: "0px",
                      width: "100%",
                      borderRadius: "0px",
                      paddingLeft: "58px",
                    }}
                  >
                    <Link to={subItem.path}>{subItem.label}</Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            )
          ) : (
            <Menu.Item
              key={item.path}
              icon={item.icon}
              className="sidebarMenuItem]"
              style={{
                paddingLeft: "32px",
                paddingRight: "32px",
                height: "56px",
              }}
            >
              <Link to={item.path}>{item.label}</Link>
            </Menu.Item>
          )
        )}
      </Menu>

      {/* Footer Menu and Logout */}
      <div
        className={`flex flex-col bottom-0 absolute w-full ${
          collapsed && "hidden"
        }`}
      >
        <Menu
          className="bg-primary"
          theme="dark"
          mode="vertical"
          selectedKeys={[location?.pathname]}
        >
          {Tabs1.map((item) => (
            <Menu.Item
              key={item.path}
              icon={item.icon}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: "32px",
                paddingRight: "32px",
              }}
            >
              <Link to={item.path}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
        {isVisible && (
          <div className="flex flex-col">
            <Button className="rounded-full bg-[#c847e8] border-[#c847e8] text-white mt-[16px] mb-[10px] ml-[32px] mr-[32px] pt-[10px] pb-[10px] pl-[24px] pr-[24px]" 
            onClick={() => navigate("/chatbot")}
            >
              ChatBot
            </Button>
            <div className="logoutButton" onClick={handleLogout}>
              Logout
            </div>
          </div>
        )}
      </div>
    </Sider>
  );
};

export default SideBar;

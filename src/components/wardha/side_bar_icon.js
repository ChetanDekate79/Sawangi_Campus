import React, { useState, useEffect } from "react";
import Bar_graph from "./bar_graph";
import { FaChartBar, FaFileCsv, FaFileAlt, FaSun, FaSignOutAlt,FaHome,FaWater   } from 'react-icons/fa';
import { IoMdDocument } from 'react-icons/io';
import Report_wardha from "./report_wardha";
import './side_bar.css';
import LineChart_csv from './GraphComponent2'
import BoxWithButton from './BoxWithButton';
import Total_Consumption from "./Total_consumption";
import Home from "./home";
import Pump from "./pump";
import Pump_report from "./pump_report";
import DataDisplay from './wardhastatus'
import Report_pump from "./report_pump";
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'; // Import the icons for visibility
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io'; // Import icons for visibility

const Sidebar_wardha_icons = (props) => {
  const { userType } = props;
  const [isLoading, setIsLoading] = useState(true);
  // const [activeTab, setActiveTab] = useState("home");
  const [activeTab, setActiveTab] = useState("graph");
  const [showIconNames, setShowIconNames] = useState(true); // State variable to control visibility



  const handleLogout = () => {
    // Perform any logout logic if necessary

    // Redirect to Login component
    window.location.href = 'https://wardha.hetadatain.com';
  };

  const getCurrentDateTime = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;   
    const formattedTime = currentDate.toLocaleTimeString();  
    return `${formattedDate} ${formattedTime}`;
  };

  useEffect(() => {
    // Simulate a loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Home />;
      case "graph":
        return <Bar_graph />;
      case "graph_csv":
        return <LineChart_csv />;
      case "report_wardha":
        return <Report_wardha />;
      case "solar":
        return <BoxWithButton />;
      case "report":
        return <Total_Consumption />;
      case "pump":
        return <Pump/>;
        case "pump_hourly_report":
          return <Report_pump/>;
      case "pump_report":
        return <Pump_report/>;
        case "meter_status":
        return <DataDisplay/>;
      default:
        return null;
    }
  };
 // Define the common icon for toggling
 const toggleIcon = showIconNames ? <MdVisibilityOff /> : <MdVisibility />;
  // Define an array of objects containing icon-related information
  const iconContainers = [
    {
      tabName: "graph",
      tabTitle: "Hourly Graph",
      icon:  <img src={`${process.env.PUBLIC_URL}/icons/statistics.png`} alt="Hostel Icon" width={24} />,
      iconName: "Hourly Graph",
    },
    {
      tabName: "graph_csv",
      tabTitle: "Individual Parameter",
      icon: <img src={`${process.env.PUBLIC_URL}/icons/line-chart.png`} alt="Hostel Icon" width={24} />,
      iconName: "Parameter Graph",
    },
    {
      tabName: "report_wardha",
      tabTitle: "Hourly Report",
      icon: <img src={`${process.env.PUBLIC_URL}/icons/report.png`} alt="Hostel Icon" width={24} />,
      iconName: "Hourly Report",
    },
    {
      tabName: "solar",
      tabTitle: "Solar Report",
      icon: <img src={`${process.env.PUBLIC_URL}/icons/solar-panel.png`} alt="Hostel Icon" width={24} />,
      iconName: "Solar Report",
    },
    {
      tabName: "report",
      tabTitle: "Energy Report",
      icon:<img src={`${process.env.PUBLIC_URL}/icons/clipboard.png`} alt="Hostel Icon" width={24} />,
      iconName: "Energy Report",
    },
    {
      tabName: "pump",
      tabTitle: "Pump Status",
      icon: <img src={`${process.env.PUBLIC_URL}/icons/pump.png`} alt="Hostel Icon" width={24} />,
      iconName: "Pump Status",
    },
    {
      tabName: "pump_hourly_report",
      tabTitle: "Pump Hourly Report",
      icon: <img src={`${process.env.PUBLIC_URL}/icons/report_pump.png`} alt="Hostel Icon" width={24} />,
      iconName: "Pump Hourly Report",
    },
    {
      tabName: "pump_report",
      tabTitle: "Pump Report",
      icon: <img src={`${process.env.PUBLIC_URL}/icons/report_pump_excel.png`} alt="Hostel Icon" width={24} />,
      iconName: "Pump Report",
    },
    {
      tabName: "meter_status",
      tabTitle: "Meter Status",
      icon: <img src={`${process.env.PUBLIC_URL}/icons/electric-meter.png`} alt="Hostel Icon" width={24} />,
      iconName: "Meter Status",
    },
    
  ];


  return (
    <div className="sidebar">
      <div className="icons-container">
      {showIconNames && (
          <div className="box">
            <img src="log.png" alt="Left Image" className="logo-left" />
          </div>
        )}
    
        {/* <div
          className={`icon-container ${activeTab === "home" ? "active" : ""}`}
          onClick={() => setActiveTab("home")}
          title="Home"
        >
          <FaHome size={24} />
          <span className="icon-name">Home</span>
        </div> */}
       <div
          className="toggle-icon-name"
          onClick={() => setShowIconNames(!showIconNames)}
        >
          {showIconNames ? <IoIosArrowDropleft /> : <IoIosArrowDropright />}
        </div>

         {iconContainers.map((iconContainer, index) => (
          <div
            key={index}
            className={`icon-container ${
              activeTab === iconContainer.tabName ? "active" : ""
            }`}
            onClick={() => setActiveTab(iconContainer.tabName)}
            title={iconContainer.tabTitle}
          >
            <>
              {iconContainer.icon}
              {showIconNames && (
                <span className="icon-name">{iconContainer.iconName}</span>
              )}
            </>
          </div>
        ))}
        {/* Common toggle icon */}
        <div
          className={`icon-container ${
            activeTab === "logout" ? "active" : ""
          }`}
          onClick={handleLogout}
          title="Logout"
        >
          <img src={`${process.env.PUBLIC_URL}/icons/logout.png`} alt="Hostel Icon" width={24} />
          {showIconNames && <span className="icon-name">Logout</span>}
        </div>
      </div>

      <div className="content">
        <div className="top-bar">
        
         <span className="top-title" style={{ fontFamily: 'Comic Sans MS' }}>Energy Monitoring System for <b style={{ color: "#dc2e2e"}}>Sawangi Campus</b></span>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              borderRadius: '4px',
              padding: '5px',
            }}
          >
          
            <span style={{ fontSize: '14px', color: 'black', cursor: 'pointer' }}>
              🗓️ {getCurrentDateTime()}
            </span>
          </div>
        </div>
          
          <img src="JNMC_LOGO.png" alt="Right Image" className="logo-right"/>
        </div>
        {isLoading ? (
          <div className="loading-bar">
            <div className="spinner"></div>
            Loading...
          </div>
        ) : (
          renderContent()
        )}
      </div>
    </div>
  );
};

export default Sidebar_wardha_icons;

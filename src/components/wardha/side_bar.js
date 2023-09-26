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

const Sidebar_wardha = (props) => {
  const { userType } = props;
  const [isLoading, setIsLoading] = useState(true);
  // const [activeTab, setActiveTab] = useState("home");
  const [activeTab, setActiveTab] = useState("graph");


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

  return (
    <div className="sidebar">
      <div className="icons-container">
        <div className="box">
          <img src="log.png" alt="Left Image" className="logo-left"/>
        </div>
    
        {/* <div
          className={`icon-container ${activeTab === "home" ? "active" : ""}`}
          onClick={() => setActiveTab("home")}
          title="Home"
        >
          <FaHome size={24} />
          <span className="icon-name">Home</span>
        </div> */}
        <div
          className={`icon-container ${activeTab === "graph" ? "active" : ""}`}
          onClick={() => setActiveTab("graph")}
          title="Hourly Graph"
        >
          <FaChartBar size={24} />
          <span className="icon-name">Hourly Graph</span>
        </div>
        <div
          className={`icon-container ${activeTab === "graph_csv" ? "active" : ""}`}
          onClick={() => setActiveTab("graph_csv")}
          title="Individual Parameter"
        >
          <FaFileCsv size={24} />
          <span className="icon-name">Parameter Graph</span>
        </div>
        <div
          className={`icon-container ${activeTab === "report_wardha" ? "active" : ""}`}
          onClick={() => setActiveTab("report_wardha")}
          title="Hourly Report"
        >
          <FaFileAlt size={24} />
          <span className="icon-name">Hourly Report</span>
        </div>
        <div
          className={`icon-container ${activeTab === "solar" ? "active" : ""}`}
          onClick={() => setActiveTab("solar")}
          title="Solar Report"
        >
          <FaSun size={24} />
          <span className="icon-name">Solar Report</span>
        </div>
        <div
          className={`icon-container ${activeTab === "report" ? "active" : ""}`}
          onClick={() => setActiveTab("report")}
          title="Total Consumption Report"
        >
          <IoMdDocument size={24} />
          <span className="icon-name">Energy Report</span>
        </div>

        <div
          className={`icon-container ${activeTab === "pump" ? "active" : ""}`}
          onClick={() => setActiveTab("pump")}
          title="Pump Status"
        >
          <FaWater size={24} />
          <span className="icon-name">Pump Status</span>
        </div>
        <div
          className={`icon-container ${activeTab === "pump_hourly_report" ? "active" : ""}`}
          onClick={() => setActiveTab("pump_hourly_report")}
          title="Pump Report"
        >
          <IoMdDocument size={24} />
          <span className="icon-name">Pump Hourly Report</span>
        </div>
        <div
          className={`icon-container ${activeTab === "pump_report" ? "active" : ""}`}
          onClick={() => setActiveTab("pump_report")}
          title="Pump Report"
        >
          <IoMdDocument size={24} />
          <span className="icon-name">Pump Report</span>
        </div>
        <div
          className={`icon-container ${activeTab === "meter_status" ? "active" : ""}`}
          onClick={() => setActiveTab("meter_status")}
          title="Meter Status"
        >
          <IoMdDocument size={24} />
          <span className="icon-name">Meter Status</span>
        </div>
        {/* <div className="user-type">
        User Type: {userType}
      </div> */}


        <div className="log">
          <div className="icon-container" onClick={handleLogout} title="Logout">
            <FaSignOutAlt size={24} />
            <span className="icon-name">Logout</span>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="top-bar">
          <span className="top-title" style={{ fontFamily: 'Comic Sans MS' }}>Energy Monitoring System for <b style={{ color: "#dc2e2e"}}>Sawangi Campus</b></span>
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              // backgroundColor: 'rgba(255, 255, 255, 0.5)', // Transparent white background
              borderRadius: '4px', // Rounded corners for the box
              padding: '5px', // Add some padding to the box
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

export default Sidebar_wardha;

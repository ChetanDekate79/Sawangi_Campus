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
import Chiller from "./chiller";
import Admin from './admin';
import Chiller_Report from "./chiller_report";
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'; // Import the icons for visibility
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io'; // Import icons for visibility
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import BASE_URL from "./api";

const Sidebar_wardha_icons = (props) => {
  const { userType } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  // const [activeTab, setActiveTab] = useState("home");
  const [activeTab, setActiveTab] = useState("home");
  const [showIconNames, setShowIconNames] = useState(true); // State variable to control visibility


  useEffect(() => {
    const getWeatherData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${BASE_URL}/weather/current`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError(error.message || 'An error occurred while fetching weather data.');
      } finally {
        setLoading(false);
      }
    };

    getWeatherData();
  }, []); // The 

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
      case "chiller_csv":
        return <Chiller/>;
      case 'chiller_report':
        return <Chiller_Report/>;
        case 'admin':
        return <Admin/>;
      default:
        return null;
    }
  };
 // Define the common icon for toggling
 const toggleIcon = showIconNames ? <MdVisibilityOff /> : <MdVisibility />;
  // Define an array of objects containing icon-related information
  const iconContainers = [
    {
      tabName: "home",
      tabTitle: "Show Pie chart Transformer, Hostel, Solar for Yesterday",
      icon:  <img src={`${process.env.PUBLIC_URL}/icons/home.png`} alt="Hostel Icon" width={24} />,
      iconName: "Home",
    },
    {
      tabName: "graph",
      tabTitle: "Show Each Hostel Breakup Input,Rooms,Common Area for any Day",
      icon:  <img src={`${process.env.PUBLIC_URL}/icons/statistics.png`} alt="Hostel Icon" width={24} />,
      iconName: "Hourly Graph",
    },
    {
      tabName: "report_wardha",
      tabTitle: "Hourly KWH for any feeder or any Day",
      icon: <img src={`${process.env.PUBLIC_URL}/icons/report.png`} alt="Hostel Icon" width={24} />,
      iconName: "Hourly Report",
    },
    {
      tabName: "graph_csv",
      tabTitle: "Show forty  Parameter of each Room on any Day",
      icon: <img src={`${process.env.PUBLIC_URL}/icons/line-chart.png`} alt="Hostel Icon" width={24} />,
      iconName: "Parameter Graph",
    },
    {
      tabName: "chiller_csv",
      tabTitle: "Show Nineteen Parameter any Day",
      icon: <img src={`${process.env.PUBLIC_URL}/icons/chiller.png`} alt="Hostel Icon" width={24} />,
      iconName: "Chiller",
    },
    {
      tabName: "chiller_report",
      tabTitle: "Show Hourly KWH, KWH/RT for any Day",
      icon: <img src={`${process.env.PUBLIC_URL}/icons/chiller-report.png`} alt="Hostel Icon" width={24} />,
      iconName: "Chiller Report",
    },
    
    {
      tabName: "solar",
      tabTitle: "Download Solar Generation and loss",
      icon: <img src={`${process.env.PUBLIC_URL}/icons/solar-panel.png`} alt="Hostel Icon" width={24} />,
      iconName: "Solar Report",
    },
    {
      tabName: "report",
      tabTitle: "Download Total,Transformer, Hostel Consumption Report",
      icon:<img src={`${process.env.PUBLIC_URL}/icons/clipboard.png`} alt="Hostel Icon" width={24} />,
      iconName: "Energy Report",
    },
    {
      tabName: "pump",
      tabTitle: "Show Real Time Working of pump",
      icon: <img src={`${process.env.PUBLIC_URL}/icons/pump.png`} alt="Hostel Icon" width={24} />,
      iconName: "Pump Status",
    },
    {
      tabName: "pump_hourly_report",
      tabTitle: "Show any Pump Hourly Report for any Day",
      icon: <img src={`${process.env.PUBLIC_URL}/icons/report_pump.png`} alt="Hostel Icon" width={24} />,
      iconName: "Pump Hourly Report",
    },
    {
      tabName: "pump_report",
      tabTitle: "Download pump Consumption and flow pressure Report",
      icon: <img src={`${process.env.PUBLIC_URL}/icons/report_pump_excel.png`} alt="Hostel Icon" width={24} />,
      iconName: "Pump Report",
    },
    {
      tabName: "meter_status",
      tabTitle: "See any Feeder Meter Working  Status",
      icon: <img src={`${process.env.PUBLIC_URL}/icons/electric-meter.png`} alt="Hostel Icon" width={24} />,
      iconName: "Meter Status",
    },
    userType === "admin" && 
    {
      tabName: "admin",
      tabTitle: "Admin Tools",
      icon: <img src={`${process.env.PUBLIC_URL}/icons/settings.png`} alt="Hostel Icon" width={24} />,
      iconName: "Admin Tools",
    },
    
  ];


  return (
    <div className="sidebar">
      <div className="icons-container">
      {showIconNames && (
          <div className="box">
            <img src="log.png" alt="Left Image"  width='150' height='30'/>
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
    // title={iconContainer.tabTitle}
    data-tooltip={iconContainer.tabTitle} 
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
          data-tooltip ="Logout"
        >
          <img src={`${process.env.PUBLIC_URL}/icons/logout.png`} alt="Hostel Icon" width={24} />
          {showIconNames && <span className="icon-name">Logout</span>}
        </div>
      </div>

      <div className="content">
        <div className="top-bar">
        
         <h4 >Energy Monitoring System for <b style={{ color: "#dc2e2e"}}>Sawangi Campus</b></h4>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              borderRadius: '4px',
              padding: '5px',
            }}
          >
          
            
            {error && <p style={{ color: 'red' }}>{error}</p>}

{weatherData && (
  <div className="weather">
  <p>
    🗓️ {getCurrentDateTime()}
  </p>
  <p >
    <img src={weatherData.current.condition.icon} alt="Weather Icon" width="30" height="30"></img>
    Temp: <b>{weatherData.current.temp_c}°C</b>  <b>{weatherData.current.condition.text}</b>, Hum: <b>{weatherData.current.humidity}</b>, UV: <b>{weatherData.current.uv}</b>
  </p>
</div>

)}
            
          </div>
        </div>
          
          <img src="JNMC_LOGO.png" alt="Right Image" width="50" height="50"/>
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

import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import Bar_graph from './components/wardha/bar_graph'
import Report_wardha from './components/wardha/report_wardha'
import Sidebar_wardha from './components/wardha/side_bar'
import Top_Bar from './components/wardha/too_bar'
import './components/wardha/report_wardha.css'
import TopBar from './components/wardha/Top';
import './App.css'
import Pump from './components/wardha/pump';
import CsvBillerComponent from './components/wardha/csvbiller';
import MyTableauDashboard from './components/wardha/TableauViz';
import Login2 from './components/wardha/Login2';
import LoginForm from './components/wardha/loginform';
import Meterstatus from './components/wardha/meterstatus';
import EventTable from './components/wardha/wardhastatus';
import DataDisplay from './components/wardha/wardhastatus';
import Sidebar_wardha_icons from './components/wardha/side_bar_icon'
import Chiller from './components/wardha/chiller';
import Chiller_Report from './components/wardha/chiller_report';
import Home from './components/wardha/home';
import Admin from './components/wardha/admin';
function App() { 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Set the duration of the loading delay in milliseconds
  }, []);

  return (
    <div className='main-bc'>
      {isLoading ? (
        <div className="loading-bar">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
            <Sidebar_wardha_icons/>

            
          {/* <Login2/> */}

          {/* <Admin/> */}

         
        </>
      )}
    </div>
  );
};

export default App;

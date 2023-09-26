import React from 'react';
import './pump_report.css';

const Pump_report = () => {
  const handleClick1 = () => {
    window.location.href = 'https://wardha.hetadatain.com/pump_report.xlsx';
  };
  const handleClick2 = () => {
    window.location.href = 'https://wardha.hetadatain.com/pump_report_F_P.xlsx';
  };

  return (
    <div className='new-consumption-main'>
      <div className="new-consumption-box">
        <p className="new-box-title">Pump Report</p>
      
        <button className="new-button new-button-comic" onClick={handleClick1}>Download</button>
      </div>

      <div className="new-consumption-box">
        <p className="new-box-title">Pump Report with Flow & Pressure</p>
        <button className="new-button new-button-comic" onClick={handleClick2}>Download</button>
      </div>
    </div>
  );
};

export default Pump_report;

import React from 'react';
import './Total_consumption.css';

const Total_Consumption = () => {
  const handleClick1 = () => {
    window.location.href = 'https://wardha.hetadatain.com/Sawangi_Total_Consumption_Report.xlsx';
  };

  const handleClick2 = () => {
    window.location.href = 'https://wardha.hetadatain.com/Transformer_Consumption_Report.xlsx';
  };

  const handleClick3 = () => {
    window.location.href = 'https://wardha.hetadatain.com/Hostel_Consumption_Report.xlsx';
  };

  return (
    <div className='new-consumption-main'>
      <div className="new-consumption-box">
        <p className="new-box-title">Total Consumption Report</p>
      
        <button className="new-button new-button-comic" onClick={handleClick1}>Download</button>
      </div>

      <div className="new-consumption-box">
        <p className="new-box-title">Transformer Consumption Report</p>
        <button className="new-button new-button-comic" onClick={handleClick2}>Download</button>
      </div>

      <div className="new-consumption-box">
        <p className="new-box-title">Hostel Consumption Report</p>
        <button className="new-button new-button-comic" onClick={handleClick3}>Download</button>
      </div>
    </div>
  );
};

export default Total_Consumption;
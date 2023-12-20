import React, { useState, useEffect,useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchHosts, fetchMeters, fetchData_csv } from "./api";
import BASE_URL from './api';
import { format } from 'date-fns'; // If you're using date-fns
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { createPortal } from 'react-dom';


const Chiller_Report = () => {
  const [data, setData] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const formattedDate = format(new Date(selectedDate), 'dd-MM-yyyy');
  const [isLoading, setIsLoading] = useState(false); // Added isLoading state
  const [meters, setMeters] = useState([]);
  const [SelectedDevice2Name, setSelectedDevice2Name] = useState("");


  const PrintableContent = ({ content }) => {
    const container = document.getElementById('print-container');
  
    if (container) {
      return createPortal(content, container);
    }
  
    return null;
  };
  

  const handleDownloadPDF = () => {
    const pdf = new jsPDF();

    html2canvas(document.getElementById('print-container'), { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // A4 size
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`chiller_report-${formattedDate}.pdf`);
    });
  };

  // const handleDownloadCSV = () => {
  //   // Create a CSV string from the data
  //   const csvData = "Hour,KWH,Flow (m3/h),ΔT,KW/RT\n" + data.map(item => `${item.hour},${item.kwh_hourly_total},${item.flow},${item.max_delta},${item.kwrt}`).join("\n");

  //   // Create a Blob with the CSV data
  //   const blob = new Blob([csvData], { type: 'text/csv' });
  //   const url = URL.createObjectURL(blob);

  //   // Create a temporary anchor element and trigger the download
  //   const a = document.createElement('a');
  //   a.style.display = 'none';
  //   a.href = url;
  //   a.download = `chiller_report-${formattedDate}.csv`;
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  //   URL.revokeObjectURL(url);
  // };

  const handleDownloadCSV = () => {
    // Find the table element in the DOM
    const tableElement = document.getElementById('print_table');
  
    // Check if the table element exists
    if (!tableElement) {
      console.error('Table element not found');
      return;
    }
  
    // Extract headers from the table
    const headers = Array.from(tableElement.querySelectorAll('thead th')).map(th => th.innerText);
  
    // Extract data rows from the table body
    const bodyRows = Array.from(tableElement.querySelectorAll('tbody tr')).map(row => {
      const rowData = Array.from(row.querySelectorAll('td')).map(td => td.innerText);
      return rowData.join(',');
    });
  
    // Extract data rows from the table footer
    const footerRows = Array.from(tableElement.querySelectorAll('tfoot tr')).map(row => {
      const rowData = Array.from(row.querySelectorAll('td')).map(td => td.innerText);
      return rowData.join(',');
    });
  
    // Combine body and footer rows
    const allRows = [...bodyRows, ...footerRows];
  
    // Create CSV content
    const csvContent = [headers.join(','), ...allRows].join('\n');
  
    // Create a Blob with the CSV data
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
  
    // Create a temporary anchor element and trigger the download
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `Chiller_report-${formattedDate}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  


  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  useEffect(() => {
    // Set isLoading to true before making the API request
    setIsLoading(true);

    fetch(`${BASE_URL}/chiller_report/CHILLER-AVBRH/${formattedDate}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false); // Set isLoading to false when data is received
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false); // Set isLoading to false in case of an error
      });
  }, [formattedDate, selectedDevice, selectedDate]);

  useEffect(() => {
    const fetchMetersByHost = async () => {
      try {
        const response = await fetch(`${BASE_URL}/chiller_device`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setMeters(data);
        } else {
          // Handle the case where the API response is not an array
          console.error('API response is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching meters data:', error);
      }
    };
    fetchMetersByHost();
  }, []);
  

 
  return (
    <div className='container-fluid' style={{backgroundColor: "#eef7eb"}}>
        <div className='container-fluid d-flex  ' style={{backgroundColor: "#eef7eb"}}>
        <div style={{ alignItems: "center", marginleft: "2px", backgroundColor: "rgb(200 96 224 / 79%)", padding: "2px", borderRadius: "10px" }}>

          <label htmlFor="datePicker" style={{ fontWeight: "bold", display: "block" }}>
            <span style={{ fontFamily: "Comic Sans MS", color: "#ffffff" }}>Date:</span>
          </label>
          <input
            type="date"
            id="datePicker"
            value={selectedDate}
            onChange={handleDateChange}
            style={{
              padding: "5px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              outline: "none",
              fontFamily: "Comic Sans MS",
              fontSize: "13px",
            }}
          />
        </div>
        
    
        </div>

        
        <div className='container-fluid rounded mt-2 border border-dark border-3'  style={{ maxHeight: '70vh', overflowY: 'auto',backgroundColor:"white" }}>
        <div className="container-fluid d-flex flex-nowrap">
  <button className="btn btn-danger p-2 m-2" onClick={handleDownloadPDF} >
    Download PDF
  </button>
  <button className="btn btn-success p-2 m-2" onClick={handleDownloadCSV} >
    Download CSV
  </button>
</div>


{isLoading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (

        <div id="print-container">
      <div className="container-fluid d-flex justify-content-between" style={{ backgroundColor: "#d1fec5" }}>
        <img src="log.png" alt="Logo Right" className="img-fluid" style={{ width: "120px", alignSelf: "center" }} />
        <img src="JNMC_LOGO.png" alt="Logo Right" className="img-fluid" style={{ width: "80px", alignSelf: "center" }} />
      </div>

      <div className="container-fluid mt-3" style={{fontFamily: "Comic Sans MS"}}>
        <h2 className="text-center" >{SelectedDevice2Name} Chiller Report for Date {selectedDate}</h2>
        {/* <p className="text-center">The .table-bordered class adds borders on all sides of the table and the cells:</p> */}

        <table id="print_table" className="table table-bordered">
          <thead class="table-success">
            <tr>
              <th>Hour</th>
              <th>KWH</th>
              <th>Flow (m3/h)</th>
              <th>Delta(Δ) T</th>
              <th>RT</th>
              <th>KW/RT</th>
              <th>Loss KWH = (0.6 KW / RT)</th>
            </tr>
          </thead>
          <tbody>
          {Object.values(data).map((item) => (
              <tr key={item.hour}>
                <td>{item.hour}</td>
                <td>{item.kwh_hourly_total}</td>
                <td>{item.flow}</td>
                <td>{item.max_delta}</td>
                <td>{item.rt}</td>
                <td>{item.kwrt}</td>
                <td>{item.loss}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="table-secondary" style={{ fontWeight: 'bold' }}>
          <tr>
            <td>Total</td>
            <td>{data.sum_kwh}</td>
            <td>{data.sum_flow}</td>
            <td></td>
            <td>{data.sum_rt}</td>
            <td>{data.sum_kwrt}</td>
            <td>{data.sum_loss}</td>
          </tr>
  </tfoot>
        </table>
      </div>
    </div>
   )}
    </div>
      </div>
  )
}

export default Chiller_Report;

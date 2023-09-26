import React, { useState, useEffect,useRef } from "react";
import { format } from 'date-fns'; // If you're using date-fns
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import './report_wardha.css'
import './report_pump.css'
import { fetch_pump_Hosts, fetch_pump_Meters, fetch_pump_Report,generateReportUrl } from "./api";
import BASE_URL from "./api";
am4core.useTheme(am4themes_animated);

const Report_pump = () => {
  const [chartData, setChartData] = useState([]);
  const [selectedHost, setSelectedHost] = useState("");
  const [selectedDevice, setSelectedDevice] = useState("");
  const [SelectedDeviceName2, setSelectedDeviceName] = useState("");
  const [reportUrl, setReportUrl] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const formattedDate = format(new Date(selectedDate), 'dd-MM-yyyy');
  const iframeRef = useRef(null);
  const [hosts, setHosts] = useState([]);
  const [HostName, setHostName] = useState("");

  const [selectedMeter, setSelectedMeter] = useState('');
  const [meters, setMeters] = useState([]);

  const [isLoadingHosts, setIsLoadingHosts] = useState(false);
  const [isLoadingMeters, setIsLoadingMeters] = useState(false);
  
  const [isLoading, setIsLoading] = useState(true); // New state variable for loading status

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoadingHosts(true);
        const hostsData = await fetch_pump_Hosts();
        setHosts(hostsData);
        setIsLoadingHosts(false);
      } catch (error) {
        console.error("Error fetching hosts:", error);
        setIsLoadingHosts(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchMetersByHost = async () => {
      try {
        setIsLoadingMeters(true);
        const metersData = await fetch_pump_Meters(selectedHost);
        setMeters(metersData);
        setIsLoadingMeters(false);
      } catch (error) {
        console.error("Error fetching meters:", error);
        setIsLoadingMeters(false);
      }
    };

    if (selectedHost) {
      fetchMetersByHost();
    }
  }, [selectedHost]);

  const downloadPdf = async () => {
    try {
      const iframe = iframeRef.current;
  
      if (iframe) {
        const contentDocument = iframe.contentDocument || iframe.contentWindow.document;
        const canvas = await html2canvas(contentDocument.body);
  
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
        pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth - 20, pdfHeight - 20);
        pdf.save('Pump_Report.pdf');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handleHostChange = (event) => {
    const selectedOption = event.target.value;
    const selectedOptionName = event.target.options[event.target.selectedIndex].text;

    setSelectedHost(selectedOption);
    setSelectedMeter('');
    setHostName(selectedOptionName);


    if (selectedOption) {
      fetch_pump_Meters(selectedOption);
    } else {
      setMeters([]);
    }
  };

  const onDeviceChange = (event) => {
    const deviceName = event.target.options[event.target.selectedIndex].text;

    setSelectedDevice(event.target.value);
    
    setSelectedDeviceName(deviceName);
  };
  console.log("SelectedDeviceName2",SelectedDeviceName2)


  useEffect(() => {
    const fetchDataFromApi = async () => {
      setIsLoading(true); // Set loading status to true

      try {
        const data = await fetch_pump_Report(
          selectedHost,
          selectedDevice,
          selectedDate,
          HostName,
          SelectedDeviceName2
        );
        console.log(data);
        setChartData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); // Set loading status to false
      }
    };

    fetchDataFromApi();
  }, [ selectedDevice, selectedDate]);

  const onGenerateReport = () => {
    const url = generateReportUrl(selectedHost,  formattedDate, selectedDevice);
    setReportUrl(url);
  };

    // Access the first row's second_diff_value and last_diff_value
    const firstRow = chartData.length > 0 ? chartData[0] : null;
  const lastRow = chartData.length > 0 ? chartData[chartData.length - 1] : null;
  const firstSecondDiffValue = firstRow ? firstRow.first_wh_R : null;
  const lastLastDiffValue = lastRow ? lastRow.last_wh_R : null;
  


  useEffect(() => {
    // Create chart instance
    const chart = am4core.create("chartdiv", am4charts.XYChart);

    // Convert date strings to Date objects and update the dt_time field to hh:mm format
    const chartDataWithTime = chartData.map((dataPoint) => ({
      ...dataPoint,
      dt_time: new Date(dataPoint.dt_time).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));

    // Add data to chart
    chart.data = chartDataWithTime;

    // Create X axis
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "dt_time";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.labels.template.rotation = -90;
    categoryAxis.renderer.labels.template.horizontalCenter = "left";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";

    // Create Y axis for "value" column
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;
    valueAxis.title.text = "";
    valueAxis.renderer.grid.template.location = 0;

    // Create Y axis for "value1" column
    const valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis2.renderer.minWidth = 50;
    valueAxis2.title.text = "";
    valueAxis2.renderer.grid.template.location = 0;
    valueAxis2.renderer.opposite = true;

    // Create series for "value" column
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "dt_time";
    series.strokeWidth = 2;
    series.minBulletDistance = 10;
    series.tooltipText = "{value}";
    series.name = "KWH_Rec";
    series.fill = am4core.color("#008FFB");
    series.stroke = am4core.color("#008FFB");

    const series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.dataFields.valueY = "value1";
    series1.dataFields.categoryX = "dt_time";
    series1.strokeWidth = 2;
    series1.minBulletDistance = 10;
    series1.tooltipText = "{value1}";
    series1.name = "KWH_Del";
    series1.fill = am4core.color("#20c997");
    series1.stroke = am4core.color("#20c997");

    const series2 = chart.series.push(new am4charts.ColumnSeries());
    series2.dataFields.valueY = "value2";
    series2.dataFields.categoryX = "dt_time";
    series2.strokeWidth = 2;
    series2.minBulletDistance = 10;
    series2.tooltipText = "{value2}";
    series2.name = "WH_1";
    series2.fill = am4core.color("#ffc107");
    series2.stroke = am4core.color("#ffc107");

    const series3 = chart.series.push(new am4charts.ColumnSeries());
    series3.dataFields.valueY = "value3";
    series3.dataFields.categoryX = "dt_time";
    series3.strokeWidth = 2;
    series3.minBulletDistance = 10;
    series3.tooltipText = "{value3}";
    series3.name = "WH_2";
    series3.fill = am4core.color("#28a745");
    series3.stroke = am4core.color("#28a745");

    const series4 = chart.series.push(new am4charts.ColumnSeries());
    series4.dataFields.valueY = "value4";
    series4.dataFields.categoryX = "dt_time";
    series4.strokeWidth = 2;
    series4.minBulletDistance = 10;
    series4.tooltipText = "{value4}";
    series4.name = "WH_3";
    series4.fill = am4core.color("#dc3545");
    series4.stroke = am4core.color("#dc3545");

    // Add legend
    chart.legend = new am4charts.Legend();
    chart.legend.useDefaultMarker = true;
    chart.legend.position = "bottom";
    
    // Add title
    const title = chart.titles.create();
    title.text = `Hourly Graph`;
    title.fontSize = 20;
    title.marginBottom = 20;

    // Add chart cursor
    chart.cursor = new am4charts.XYCursor();
  }, [chartData]);

  const handleDeviceChange = (event) => {
    setSelectedDevice(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
 
 
  const generateReportUrl = () => {
    const url = `${BASE_URL}/pump_report/${selectedHost}/${formattedDate}/${selectedDevice}`;
    return url;
  };


  useEffect(() => {
    const url = generateReportUrl();
    setReportUrl(url);
  }, [ selectedDevice, selectedDate]);
  

  return (
    <div>
      <div style={{ display: "flex",  marginBottom: "10px",marginTop: "2vh",marginLeft: "2vw"}}>
     
      <div style={{display: "flex", alignItems: "center", marginRight: "10px",backgroundColor: "rgb(156 152 255)",padding: "5px", borderRadius: "10px"  }}>
      <label htmlFor="select_host" style={{ marginRight: '10px', fontWeight: 'bold', fontFamily: 'Comic Sans MS',color:"#ffffff" }}>
  Select Host: 
</label>
      <select id="select_host" value={selectedHost} onChange={handleHostChange}style={{
      padding: "5px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      outline: "none",
      fontFamily: "Comic Sans MS",
      fontSize: "14px",
      minWidth: "200px", // Adjust the width as needed
    }}>
      <option value="">Select Host</option>
        {isLoadingHosts ? (
          <option value="" disabled>Loading hosts...</option>
        ) : (
          hosts.map(host => (
            <option key={host.client_id} value={host.client_id}>
              {host.client_name}
            </option>
          ))
        )}
        
  </select>
      </div>
      <div style={{display: "flex", alignItems: "center", marginRight: "10px",backgroundColor: "rgb(97 194 194)",padding: "5px", borderRadius: "10px"}}>
      <label htmlFor="select_device" style={{ marginRight: "10px", fontWeight: "bold", fontFamily: "Comic Sans MS",color:"#ffffff" }}>
  Select Device: 
</label>
      <select id="select_device" value={selectedDevice} onChange={onDeviceChange} style={{
      padding: "5px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      outline: "none",
      fontFamily: "Comic Sans MS",
      fontSize: "14px",
      minWidth: "200px", // Adjust the width as needed
    }}>
       <option value="">Select Meter</option>
        {isLoadingMeters ? (
          <option value="" disabled>Loading meters...</option>
        ) : (
          meters.map(meter => (
            <option key={meter.device_id} value={meter.device_id}>
              {meter.device_name}
            </option>
          ))
        )}
      </select>
</div>
      <div style={{ display: "flex", alignItems: "center", marginRight: "10px",backgroundColor: "rgb(200 96 224 / 79%)",padding: "5px", borderRadius: "10px" }}>
      <label htmlFor="datePicker" style={{ marginRight: "10px", fontWeight: "bold" }}>
  <span style={{ fontFamily: "Comic Sans MS",color:"#ffffff" }}>Select Date:</span> 
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
            fontSize: "14px",
          }}
        />
      </div>
      <div className="hostel_button" onClick={downloadPdf} data-tooltip="Download">
              <div className="hostel_button-wrapper">
                <div className="text"><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"></path></svg></div>
                
                <span className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"></path></svg>
                </span>
              </div>
            </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center", // Center the chart horizontally
          marginTop: "2vh",
          marginLeft: "2vw",
          marginRight: "2vw",
        }}
      >
      {isLoading ? (
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          {reportUrl && (
        <>
          <iframe ref={iframeRef} src={reportUrl} style={{ width: "100%", // Set the chart width to 100% of its container
              height: "75vh",
              backgroundColor: "#ffffff",
              borderRadius: "10px",}} title="Report" />

        </>
      )}
        </>
      )}
    </div>
        </div>
  );
};

export default Report_pump;
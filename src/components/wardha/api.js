import axios from 'axios';
import bcrypt from 'bcryptjs';

// const BASE_URL = "http://127.0.0.1:8000/api"; // Replace with your API base URL

const BASE_URL = "https://wardha.hetadatain.com/api"; // Replace with your API base URL


export default BASE_URL;



export const fetchHosts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/host`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch hosts");
  }
};

export const fetch_pump_Hosts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/pump_host`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch hosts");
  }
};

export const fetchMeters = async (host) => {
  try {
    const response = await fetch(`${BASE_URL}/device?client_id=${host}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch meters");
  }
};

export const fetch_pump_Meters = async (host) => {
  try {
    const response = await fetch(`${BASE_URL}/pump_device?client_id=${host}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch meters");
  }
};

export const home = async () => {
  try {
    const response = await fetch(`${BASE_URL}/iframe`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch meters");
  }
};



export const pump = async (date) => {
  try {
    const response = await fetch(
      `${BASE_URL}/pumpcsv/${date}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const fetchData_bar = async (hostId, deviceId, date) => {
  try {
    const response = await fetch(
      `${BASE_URL}/hourly_graph/${date}/${hostId}/${deviceId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const fetchData_csv = async (hostId, date, deviceId ) => {
  try {
    const formattedDate = date.split("-").reverse().join("-");

    const response = await fetch(
      `${BASE_URL}/csv-data/${hostId}/${formattedDate}/${deviceId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const fetchReport = async (selectedHost, selectedDevice, selectedDate, Hostname, selectedDeviceName2) => {
  const apiUrl = `${BASE_URL}/api/jnmc_report?host=${selectedHost}&device_id=${selectedDevice}&date=${selectedDate}&hostname=${Hostname}&devicename=${selectedDeviceName2}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};


// https://wardha.hetadatain.com/api/pump_report/jch/18-08-2023/88

export const fetch_pump_Report = async (selectedHost, selectedDevice, selectedDate) => {

  const formattedDate = selectedDate.split("-").reverse().join("-");
  const apiUrl = `${BASE_URL}/pump_report/${selectedHost}/${formattedDate}/${selectedDevice}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const generateReportUrl = (selectedHost, selectedDevice, selectedDate, Hostname, selectedDeviceName2) => {
  const apiUrl = `${BASE_URL}/jnmc_report?host=${selectedHost}&device_id=${selectedDevice}&date=${selectedDate}&hostname=${Hostname}&devicename=${selectedDeviceName2}`;
  return apiUrl;
};

export const loginapi = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/login`);
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

export const loginapi2 = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/loginnew`, {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const decryptPassword = (plaintextPassword, encryptedPassword) => {
  return bcrypt.compareSync(plaintextPassword, encryptedPassword);
};
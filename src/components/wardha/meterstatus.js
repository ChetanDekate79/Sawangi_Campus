import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "./api";
import './meterstatus.css';

const Box = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <div
      className={`w-40 h-24 bg-primary p-2 m-2 rounded-lg cursor-pointer ${
        isHovered ? "shadow-lg" : "shadow"
      }`}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <div className="font-weight-bold text-lg text-white">Box {data[2]}</div>
      {isHovered && (
        <div className="position-absolute top-0 left-0 w-100 h-100 p-4 bg-white opacity-90 rounded-lg">
          <div className="text-primary font-weight-bold">Box {data[2]}</div>
          <div>ID: {data[1]}</div>
          <div>Name: {data[3]}</div>
          <div>Description: {data[4]}</div>
          <div>Date: {data[5]}</div>
          <div>Duration: {data[6]}</div>
        </div>
      )}
    </div>
  );
};

const Meterstatus = () => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    // Replace 'API_URL' with the actual URL to fetch data from the API
    axios.get(`${BASE_URL}/current_datetime/j5/09-07-2023`).then((response) => {
      setApiData(response.data);
    });
  }, []);

  return (
    <div className="d-flex flex-wrap justify-content-center">
      {apiData.map((item, index) => (
        <Box key={index} data={item} />
      ))}
    </div>
  );
};

export default Meterstatus;

import React, { useState, useEffect } from "react";
import "./home.css"; // Import the CSS file for the Home component

const Home = () => {
  const [images, setImages] = useState([]); // State to store the image filenames
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Function to fetch the list of image filenames when the component mounts
    async function fetchImages() {
      try {
        const imageFilenames = [];
        for (let i = 1; i <= 3; i++) {
          // Assuming you have image files named "image1.jpg", "image2.jpg", and "image3.jpg"
          imageFilenames.push(`image${i}.png`);
        }
        setImages(imageFilenames);
      } catch (error) {
        console.error("Error while fetching images:", error);
      }
    }

    // Fetch the list of images when the component mounts
    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length > 1) {
      // Function to increment the image index every 2 seconds (adjust the interval as needed)
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 20000); // 2 seconds in milliseconds

      return () => {
        clearInterval(interval); // Clear the interval when the component unmounts
      };
    }
  }, [images]);

  const moveToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const moveToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="home-container">
      {images.length > 0 && (
        <div className="image-wrapper">
          <img
            src={`${process.env.PUBLIC_URL}/images/${images[currentImageIndex]}`}
            className="image-container"
            title="Page"
            alt="Slideshow Image"
          />
          {/* <div className="image-navigation">
            <button onClick={moveToPreviousImage}>Previous</button>
            <button onClick={moveToNextImage}>Next</button>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default Home;

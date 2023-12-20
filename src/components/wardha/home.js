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
        for (let i = 1; i <= 10; i++) {
          // Assuming you have image files named "image1.jpg", "image2.jpg", and "image3.jpg"
          const imageName = `image${i}.png`;
          // Check if the image file exists before adding it to the array
          const imageExists = await checkImageExists(imageName);
          if (imageExists) {
            imageFilenames.push(imageName);
          }
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
      // Function to increment the image index every 20 seconds (adjust the interval as needed)
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 20000); // 20 seconds in milliseconds

      return () => {
        clearInterval(interval); // Clear the interval when the component unmounts
      };
    }
  }, [images]);

  // Function to check if an image file exists
  const checkImageExists = async (imageName) => {
    try {
      const response = await fetch(`${process.env.PUBLIC_URL}/images/${imageName}`);
      return response.ok;
    } catch (error) {
      console.error("Error checking image existence:", error);
      return false;
    }
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
            onError={() => {
              // Handle the case when the image fails to load
              console.error(`Error loading image: ${images[currentImageIndex]}`);
              // Reset the slideshow to start from the first image
              setCurrentImageIndex(0);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Home;

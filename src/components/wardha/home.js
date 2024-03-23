import React, { useState, useEffect } from "react";
import "./home.css";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const checkImageExists = async (imageName) => {
  try {
    const response = await fetch(`${process.env.PUBLIC_URL}/images/${imageName}`);
    return response.ok;
  } catch (error) {
    console.error("Error checking image existence:", error);
    return false;
  }
};

const Home = () => {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    async function fetchImages() {
      try {
        const imageFilenames = [];
        for (let i = 1; i <= 10; i++) {
          const imageName = `image${i}.png`;
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

    fetchImages();
  }, []);

  useEffect(() => {
    if (autoPlay && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 20000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [autoPlay, images]);

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
    setAutoPlay(false); // Pause auto play when the user manually changes the image
  };

  const getImageUrlWithCacheBusting = (imageName) => {
    const cacheBuster = new Date().getTime();
    return `${process.env.PUBLIC_URL}/images/${imageName}?v=${cacheBuster}`;
  };

  return (
    <div >
      {images.length > 0 && (
        <div className="image-wrapper" style={{ borderRadius: "5px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)" }}>
          <img
            component="img"
            src={getImageUrlWithCacheBusting(images[currentImageIndex])}
            title="Page"
            alt="Slideshow Image"
            style={{
              height: "80vh", width: "100%",
              borderRadius: "10px", // Set your preferred border radius
            }} // Set your preferred height and width
            onError={() => {
              console.error(`Error loading image: ${images[currentImageIndex]}`);
              setCurrentImageIndex(0);
            }}
          />
          <div style={{ display: "flex" }} >
            <button class="btn  btn-sm btn-outline-secondary" onClick={() => handleImageChange((currentImageIndex - 1 + images.length) % images.length)}>
              <SkipPreviousIcon />
            </button>
            <button class="btn  btn-sm btn-outline-secondary" onClick={() => handleImageChange((currentImageIndex + 1) % images.length)}>
              <SkipNextIcon />
            </button>
          </div>

        </div>

      )}

    </div>
  );
};

export default Home;

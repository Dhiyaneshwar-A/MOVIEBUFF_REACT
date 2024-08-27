import React from 'react';
import './AboutUs.css'; // Import custom CSS for styling

const AboutUs = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="white-box p-4">
        <h2>About Us</h2>
        <p>
          We are a company dedicated to providing the best services in our field.
          Our mission is to deliver quality and excellence in every project we undertake.
        </p>
        {/* Add more content as needed */}
      </div>
    </div>
  );
};

export default AboutUs;

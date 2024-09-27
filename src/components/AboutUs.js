import React from 'react';
import './AboutUs.css'; // Import custom CSS for styling

const AboutUs = () => {
  return (
    <div className="about-us-container d-flex justify-content-center align-items-center min-vh-100">
      <div className="about-us-content p-5">
        <h1 className="text-primary">About Us</h1>
        <p className="lead">
          At MovieBuff, we are dedicated to providing the highest quality movie recommendation services.
          Our mission is to deliver excellence in every project we undertake, ensuring our clients receive unparalleled value and support.
        </p>
        
        <h3 className="mt-4">Our Mission</h3>
        <p>
          Our mission is to empower our clients with innovative movie recommendations that enhance their viewing experiences and foster a love for cinema.
        </p>

        <h3 className="mt-4">Our Vision</h3>
        <p>
          We envision a future where MovieBuff is the go-to platform for movie lovers seeking personalized recommendations,
          setting industry standards and exceeding viewer expectations.
        </p>

        <h3 className="mt-4">Our Values</h3>
        <ul>
          <li>Integrity: We uphold the highest standards of integrity in all our actions.</li>
          <li>Customer Commitment: We develop relationships that make a positive difference in our customers' lives.</li>
          <li>Excellence: We strive for the highest quality in every aspect of our work.</li>
          <li>Innovation: We embrace change and seek innovative solutions to enhance movie recommendations.</li>
        </ul>

        <h3 className="mt-4">Why Choose Us?</h3>
        <p>
          With a team of experienced professionals and a customer-centric approach, 
          we ensure that every client's needs are met with precision and care. 
          Join us on our journey to success in discovering the best movies!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;

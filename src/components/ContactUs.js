import React from 'react';
import './ContactUs.css'; // Ensure this path is correct

const ContactUs = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="white-box p-4">
        <h2>Contact Us</h2>
        <p>
          We'd love to hear from you! Whether you have feedback, questions, or suggestions, feel free to reach out to us at:
        </p>
        <p>Email: support@moviebuff.com</p>
        <p>Phone: +1 234 567 890</p>
      </div>
    </div>
  );
};

export default ContactUs;

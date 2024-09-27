import React, { useState } from 'react';
import './ContactUs.css'; // Import custom CSS for styling

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can implement your form submission logic
    if (name && email && message) {
      // Simulating successful submission
      setSuccessMessage('Your message has been sent successfully!');
      setErrorMessage('');
      setName('');
      setEmail('');
      setMessage('');
    } else {
      setErrorMessage('Please fill in all fields.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="contact-us-container d-flex justify-content-center align-items-center min-vh-100">
      <div className="contact-us-content p-5">
        <h1 className="text-primary">Contact Us</h1>
        <p className="lead">
          We value your feedback and inquiries. Please fill out the form below to get in touch with us.
        </p>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="form-group">
            <label htmlFor="name" className="font-weight-bold">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="font-weight-bold">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message" className="font-weight-bold">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="form-control"
              rows="4"
              required
            />
          </div>
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <button type="submit" className="btn btn-primary w-100">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;

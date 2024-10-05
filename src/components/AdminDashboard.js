import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase/firebase'; // Ensure Firebase Firestore is configured
import { collection, addDoc } from 'firebase/firestore'; // Import necessary functions from Firestore

const AdminDashboard = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [image, setImage] = useState('');
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [genres] = useState(['action', 'comedy', 'drama']); // Static genres list
  const descriptionRef = useRef(null); // Ref for uncontrolled component

  // Lifecycle management
  useEffect(() => {
    console.log('AdminDashboard mounted');

    return () => {
      console.log('AdminDashboard unmounted');
    };
  }, []); // Empty dependency array to run effect only on mount

  // Function to handle adding a new movie to the selected genre
  const handleAddMovie = async () => {
    if (!genre) {
      alert('Please select a genre');
      return;
    }

    setLoading(true);
    try {
      const genreRef = collection(db, genre); // Reference to the selected genre collection

      await addDoc(genreRef, { // Add a new movie directly in the selected genre collection
        title,
        description: descriptionRef.current.value, // Get value from ref
        image, // Store the image URL
        link, // Store the movie link
      });

      alert("Movie added successfully!");
      console.log('Movie added:', title); // Log the added movie title

      // Clear form fields after adding the movie
      setTitle('');
      setGenre('');
      setImage('');
      setLink('');
      descriptionRef.current.value = ''; // Clear textarea using ref
    } catch (error) {
      console.error("Error adding movie: ", error);
      alert("Error adding movie, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4 text-center">Add a New Movie</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                type="text"
                id="title"
                className="form-control"
                value={title} // Controlled component
                onChange={(e) => setTitle(e.target.value)} // Update state on change
                placeholder="Enter movie title"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="genre" className="form-label">Genre</label>
              <select
                id="genre"
                className="form-select"
                value={genre} // Controlled component
                onChange={(e) => setGenre(e.target.value)} // Update state on change
                required
              >
                <option value="">Select a genre</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre.charAt(0).toUpperCase() + genre.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="image" className="form-label">Image URL</label>
              <input
                type="url"
                id="image"
                className="form-control"
                value={image} // Controlled component
                onChange={(e) => setImage(e.target.value)} // Update state on change
                placeholder="Enter image URL"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="link" className="form-label">Movie Link</label>
              <input
                type="url"
                id="link"
                className="form-control"
                value={link} // Controlled component
                onChange={(e) => setLink(e.target.value)} // Update state on change
                placeholder="Enter movie link (trailer/streaming)"
                required
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                id="description"
                className="form-control"
                ref={descriptionRef} // Uncontrolled component using ref
                rows="4"
                placeholder="Enter movie description"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              onClick={handleAddMovie}
              disabled={loading}
            >
              {loading ? 'Adding Movie...' : 'Add Movie'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

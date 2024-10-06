import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase/firebase'; // Ensure Firebase Firestore is configured
import { addDoc, collection, getDoc, doc, updateDoc } from 'firebase/firestore'; // Import necessary functions from Firestore

const AdminDashboard = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [newGenre, setNewGenre] = useState('');
  const [image, setImage] = useState('');
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]); // State to hold genres from Firestore
  const descriptionRef = useRef(null); // Ref for uncontrolled component

  // Fetch genre names from the genres collection
  const fetchGenres = async () => {
    try {
      const genreDocRef = doc(db, 'genres', 'genres'); // Replace with your actual document ID
      const genreDoc = await getDoc(genreDocRef); // Get the specific document

      if (genreDoc.exists()) {
        const data = genreDoc.data();
        const genreNames = data['genrename']; // Adjust the key based on your Firestore field name

        if (Array.isArray(genreNames)) {
          setGenres(genreNames); // Set the genres state with the fetched genre names
        } else {
          console.error("Genres data format is incorrect");
        }
      } else {
        console.error("No such document!");
      }
    } catch (error) {
      console.error("Error fetching genres: ", error);
      alert("Error fetching genres, please try again.");
    }
  };

  // Function to handle adding a new movie to the selected genre
  const handleAddMovie = async () => {
    if (!genre) {
      alert('Please select a genre or add a new one');
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
      resetForm();
    } catch (error) {
      console.error("Error adding movie: ", error);
      alert("Error adding movie, please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Reset form fields
  const resetForm = () => {
    setTitle('');
    setGenre('');
    setNewGenre(''); // Clear new genre input
    setImage('');
    setLink('');
    descriptionRef.current.value = ''; // Clear textarea using ref
  };

  // Function to handle adding a new genre
  const handleAddGenre = async () => {
    if (newGenre.trim() === '') {
      alert('Please enter a valid genre');
      return;
    }

    if (!genres.includes(newGenre)) {
      // Add new genre to the Firestore and local state
      const updatedGenres = [...genres, newGenre]; // Update genres array

      const genreDocRef = doc(db, 'genres', 'genres'); // Replace with your actual document ID
      try {
        await updateDoc(genreDocRef, {
          genrename: updatedGenres // Update the array in the document
        });

        // Update local state
        setGenres(updatedGenres);
        setGenre(newGenre); // Set the new genre as the selected genre
        setNewGenre(''); // Clear the new genre input
      } catch (error) {
        console.error("Error updating genres in Firestore: ", error);
        alert("Error adding genre, please try again.");
      }
    } else {
      alert('This genre already exists');
    }
  };

  // Lifecycle management
  useEffect(() => {
    console.log('AdminDashboard mounted');
    fetchGenres(); // Fetch genres when component mounts

    return () => {
      console.log('AdminDashboard unmounted');
    };
  }, []); // Empty dependency array to run effect only on mount

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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter movie title"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="genre" className="form-label">Genre</label>
              <select
                id="genre"
                className="form-select"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                required
              >
                <option value="">Select a genre</option>
                {genres.map((g) => (
                  <option key={g} value={g}>
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </option>
                ))}
              </select>
              <div className="mt-2">
                <input
                  type="text"
                  className="form-control"
                  value={newGenre}
                  onChange={(e) => setNewGenre(e.target.value)}
                  placeholder="Add new genre"
                />
                <button
                  type="button"
                  className="btn btn btn-primary mt-2"
                  onClick={handleAddGenre}
                >
                  Add Genre
                </button>
              </div>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="image" className="form-label">Image URL</label>
              <input
                type="url"
                id="image"
                className="form-control"
                value={image}
                onChange={(e) => setImage(e.target.value)}
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
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Enter movie link (trailer/streaming)"
                required
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                id="description"
                className="form-control"
                ref={descriptionRef}
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

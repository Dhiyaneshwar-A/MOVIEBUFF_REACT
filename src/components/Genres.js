import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase/firebase'; // Ensure Firebase Firestore is configured
import { getDoc, doc } from 'firebase/firestore'; // Import necessary functions from Firestore
import './Genres.css'; // Ensure this CSS file includes the updated styles

const GenreSelection = () => {
  const [genrenames, setGenrenames] = useState([]); // State to hold genre names

  // Fetch genre names from Firestore on component mount
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreDocRef = doc(db, 'genres', 'genres'); // Replace with your actual document ID
        const genreDoc = await getDoc(genreDocRef); // Get the specific document

        if (genreDoc.exists()) {
          const data = genreDoc.data();
          const genreNames = data['genrename']; // Adjust the key based on your Firestore field name

          if (Array.isArray(genreNames)) {
            setGenrenames(genreNames); // Set the genres state with the fetched genre names
          } else {
            console.error("Genres data format is incorrect");
          }
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching genres: ", error);
      }
    };

    fetchGenres(); // Fetch genres when component mounts
  }, []); // Empty dependency array to run effect only on mount

  return (
    <div className="genre-selection-container">
      <h2>Select a Genre</h2>
      <div className="button-container">
        {genrenames.map((genre, index) => (
          <Link key={index} to={`/genre/${genre}`} className="genre-button">
            {genre.charAt(0).toUpperCase() + genre.slice(1)} {/* Capitalizes the first letter */}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GenreSelection;

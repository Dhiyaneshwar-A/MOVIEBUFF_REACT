import React, { useEffect, useState } from 'react';
import GenreSection from './GenreSection'; // Ensure this is correctly imported
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './SearchBar'; // Ensure this is correctly imported
import { db } from '../firebase/firebase'; // Import your Firebase configuration
import { doc, getDoc } from 'firebase/firestore';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState(''); // State to manage a common search query for all genres
  const [genres, setGenres] = useState([]); // State to hold genre names

  // Function to handle the search query change
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

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
            setGenres(genreNames); // Set the genres state with the fetched genre names
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
    <div className="container">
      <h1 className="my-4">MOVIEBUFF</h1>
      {/* Common Search Bar for all genres */}
      <div className="search-bar-container my-4">
        <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      </div>
      {/* Render GenreSection for each genre dynamically */}
      {genres.map((genre, index) => (
        <GenreSection 
          key={index} 
          defaultGenre={genre} 
          searchQuery={searchQuery} 
        />
      ))}
      {/* You can add more GenreSection components if needed */}
    </div>
  );
};

export default Home;

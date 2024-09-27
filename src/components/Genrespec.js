import React, { useState } from "react";
import GenreSection from "./GenreSection";
import SearchBar from "./SearchBar"; // Ensure this path is correct
import { useParams } from 'react-router-dom'; // Import useParams

const GenreSpec = ({ defaultGenre }) => {
  // State to manage the search query for the specific genre
  const [searchQuery, setSearchQuery] = useState("");
  const { genre: urlGenre } = useParams(); // Get genre from URL parameters
  const genre = urlGenre || defaultGenre;

  // Function to handle search query changes
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="container">
      <h1 className="my-4">{genre.charAt(0).toUpperCase() + genre.slice(1)}</h1>
      <div className="search-bar-container my-4">
        <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      </div>

      {/* Always render GenreSection */}
      <div className="my-4">
        <GenreSection 
          defaultGenre={genre} 
          searchQuery={searchQuery} 
        />
      </div>
    </div>
  );
};

export default GenreSpec;

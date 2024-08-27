import React from 'react';
import GenreSection from './GenreSection';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <div className="container">
      <h1 className="my-4">MOVIEBUFF</h1>
      <GenreSection defaultGenre="action" />
      <GenreSection defaultGenre="drama" />
      <GenreSection defaultGenre="comedy" />
      {/* Add more GenreSection components as needed */}
    </div>
  );
};

export default Home;

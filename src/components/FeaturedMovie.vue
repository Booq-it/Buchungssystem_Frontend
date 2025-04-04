<template>
    <div class="featured-movie">
      <div class="poster">
        <slot name="poster"></slot>
      </div>
      <div class="movie-info">
        <h2 class="movie-title">
          <slot name="title">Featured Movie Title</slot>
        </h2>
        <p class="movie-genre">
          <slot name="genre">Genre</slot>
        </p>
        <p class="movie-duration">
          <slot name="duration">Duration</slot>
        </p>
        <p class="movie-description">
          <slot name="description">Exciting movie synopsis goes here...</slot>
        </p>
        <div class="showtimes">
          <slot name="showtimes">
            <p>Showtimes not available</p>
          </slot>
        </div>
        <button class="buy-ticket">
          <slot name="action">Get Tickets Now</slot>
        </button>
      </div>
    </div>
  </template>
  
  <style scoped>
  .featured-movie {
    display: flex;
    flex-direction: row;
    gap: 20px;
    border-radius: 12px;
    background: linear-gradient(135deg, #111, #333);
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.3);
    padding: 20px;
    width: 100%;
    max-width: 900px;
    margin: 30px auto;
    color: #fff;
    transition: transform 0.3s ease-in-out;
  }
  
  .featured-movie:hover {
    transform: scale(1.03);
  }
  
  .poster img {
    width: 180px;
    height: 270px;
    object-fit: cover;
    border-radius: 10px;
    box-shadow: 2px 2px 15px rgba(255, 255, 255, 0.2);
  }
  
  .movie-info {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .movie-title {
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
    text-transform: uppercase;
    color: #ffcc00;
  }
  
  .movie-genre, .movie-duration, .movie-description {
    margin: 10px 0;
    font-size: 1rem;
    opacity: 0.85;
  }
  
  .showtimes {
    margin-top: 15px;
  }
  
  .buy-ticket {
    margin-top: 15px;
    padding: 12px 18px;
    background-color: #ffcc00;
    color: #000;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: bold;
    text-transform: uppercase;
    transition: background 0.3s ease;
  }
  
  .buy-ticket:hover {
    background-color: #ffaa00;
  }
  </style>
  
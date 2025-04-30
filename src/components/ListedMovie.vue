<template>
  <div class="listed-movie">
    <div class="poster">
      <slot name="poster"></slot>
    </div>
    <div class="movie-info">
      <h3 class="movie-title">
        <slot name="title">Movie Title</slot>
      </h3>
      <p class="movie-genre">
        <slot name="genre">Genre</slot>
      </p>
      <p class="movie-duration">
          <slot name="duration">Duration</slot>
      </p>
      <p class="movie-description">
        <slot name="description">Short description...</slot>
      </p>
      <div class="showtimes">
        <slot name="showtimes">
          <p>Showtimes not available</p>
        </slot>
      </div>
      <!-- <slot name="action">Buy Tickets</slot> -->
    </div>
  </div>
</template>

<style scoped>
.listed-movie {
display: flex;
flex-direction: row;
gap: 15px;
border: 1px solid #ccc;
padding: 15px;
border-radius: 8px;
background: #4f4b4b;
box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
width: 100%; /* Make it take full width */
margin: 20px auto; /* Center it horizontally */
}
.poster img {
width: 20px;
height: 20px;
object-fit: cover;
border-radius: 5px;
}

.movie-info {
flex: 1;
}
.movie-title {
font-size: 1.5rem;
margin: 0;
}
.movie-title:hover {
color: #ce0000;
cursor: pointer;
}
.movie-genre, .movie-duration, .movie-description {
margin: 5px 0;
font-size: 0.9rem;
color: #e7e7e7;
}
.showtimes {
margin-top: 10px;
}
.buy-ticket {
margin-top: 10px;
padding: 8px 12px;
background-color: #ce0000;
color: white;
border: none;
border-radius: 5px;
cursor: pointer;
font-size: 1rem;
}
.buy-ticket:hover {
background-color: #ff0000;
}
</style>

<template>
    <div class="movies-container" id="moviesContainer">
        <div class="movie-card">
            <slot name="poster"></slot>
            <div class="movie-info">
                
                <h2 class="movie-title">
                    <slot name="title"></slot>
                </h2>
                <div class="movie-meta">
                    <span>
                        <slot name="fsk">Keine FSK Angabe</slot>
                    </span>
                    <span>
                        <slot name="duration">Laufzeit</slot>
                    </span>
                </div>
                <p class="movie-description">
                    <slot name="description">Kurze Beschreibung des Films...</slot>
                </p>
                <div class="showings">
                    <slot name="showtimes">
                        <p>Keine Vorführungen verfügbar</p>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.movies-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: stretch;
}

.movie-card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    height: 100%;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
}

.movie-card:hover {
    transform: translateY(-5px);
}

.movie-poster {
    height: 380px;
    width: 100%;
    object-fit: cover;
}

.movie-info {
    padding: 1.5rem;
    min-height: auto;;
}

.movie-title {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #333;
    height: 4rem;
    display: flex;
}

.movie-meta {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    color: #555;
    font-size: 0.9rem;
}

.movie-description {
    color: #666;
    margin-bottom: 1rem;
    line-height: 1.5;
    height: 10rem;
}
.three-d-badge {
    background: #ff6b6b;
    color: white;
    padding: 0.1rem 0.3rem;
    border-radius: 3px;
    font-size: 0.8rem;
    margin-left: 0.5rem;
}

</style>

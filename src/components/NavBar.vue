<template>
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">Buchungssystem</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse navbar-links" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/login" v-if="this.$store.getters.getRolle == null">Login</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/register" v-if="this.$store.getters.getRolle == null">Registrierung</a>
            </li>
          </ul>
          <li class="nav-link" v-if="this.$store.getters.getRolle != null">
            <div class="dropdown">
              <a class="dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                <span>{{ this.$store.getters.getNameVorname }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                  class="bi bi-person-circle" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                </svg>
              </a>
  
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" aria-current="page" href="/bookings">Buchungen</a>
                </li>
                <li>
                  <a class="dropdown-item" href="/profile">Profil Bearbeiten</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#" v-on:click.prevent="logOut()">Ausloggen</a>
                </li>
              </ul>
            </div>
          </li>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: "NavBar",
    methods: {
      logOut() {
        this.$store.commit('clearKundenDaten');
        // this redirects to the view with the name login
        this.$router.push({ name: "login" });
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  
  
  .navbar {
    position: fixed;
    top: 0;
    z-index: 1000;
      background-color: #1a1a1a;
      color: white;
      padding: .3rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }

  .navbar-brand {
      color: white;
      font-size: 1.8rem;
      font-weight: bold;
  }

  .navbar-links {
      display: flex;
      gap: 1.5rem;
  }

  .navbar-links a {
      color: white;
      text-decoration: none;
      transition: color 0.3s;
  }

  .navbar-links a:hover {
      color: #ff6b6b;
  }
  
  .bg-custom,
  .dropdown-menu {
    background-color: black;
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    /* border: 1px solid rgba(255, 255, 255, 0.3); */
    z-index: 1000;
  }
  .dropdown-menu {
    transform: translate(-20%, 0);
  }
  
  svg {
    margin: 0 0 0 1em;
  }
/* .dropdown-menu a:hover{
  color: black;
} */
/* .dropdown-item:focus, .dropdown-item:hover {
  color: #514e4e;
  text-decoration: none;
  background-color: #adb0b4;
} */
  </style>
  
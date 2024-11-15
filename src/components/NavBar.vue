<template>
    <nav class="navbar navbar-expand-lg bg-custom m-3">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">Buchungssystem</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="/home">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/login">Login</a> <!-- v-if="this.$store.getters.getRolle == 2">Login</a> -->
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/register">Registrierung</a> <!-- v-if="this.$store.getters.getRolle == 2">Registrierung</a> -->
            </li>
          </ul>
          <li class="nav-link"> <!-- v-if="this.$store.getters.getRolle != null">-->
            <div class="dropdown">
              <a class="dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                <!-- <span>{{ this.$store.getters.getNameVorname }}</span> -->
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                  class="bi bi-person-circle" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                </svg>
              </a>
  
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" aria-current="page" href="/">Buchungen</a>
                </li>
                <li>
                  <a class="dropdown-item" href="/home">Profil Bearbeiten</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#" v-on:click.prevent="logOut()">Logout</a>
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
        //this.$store.commit('clearKundenDaten');
        // this redirects to the view with the name login
        this.$router.push({ name: "login" });
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  
  nav {
    padding: 30px;
    margin-bottom: 4rem;
    border-radius: 10px;
  }
  
  nav a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
  }
  
  nav a.router-link-exact-active {
    color: #42b983;
  }
  
  .bg-custom,
  .dropdown-menu {
    background: rgba(255, 255, 255, 0.7);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
  
  svg {
    margin: 0 0 0 1em;
  }
  </style>
  
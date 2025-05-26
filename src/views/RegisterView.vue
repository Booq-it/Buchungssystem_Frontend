<template>
    <div class="form text-center">
        <form>
          <p class="h2">Registrierung</p>
          <div class="row mt-4 mb-4">
            <div class="col">
            <input type="text" class="form-control" id="Vorname" placeholder="Vorname" v-model="Vorname">
            </div>
            <div class="col">
            <input type="text" class="form-control" id="Nachname" placeholder="Nachname" v-model="Name">
            </div>
          </div>
          <div class="mb-4">
            <input type="text" class="form-control" id="E-Mail" placeholder="E-Mail" v-model="Email">
          </div>
          <div class="mb-4">
            <input type="password" class="form-control" id="password" placeholder="Password" v-model="Passwort">
          </div>
          <div class="buttons">
            <span type="submit" class="login" v-on:click.prevent="onLogin"> &lt;- Login</span>
            <button type="submit" class="btn btn-primary register" v-on:click.prevent="onRegistrieren">Registrieren</button>
          </div>
        </form>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import axios from 'axios'
  import APIURLService from '../services/API.service';

  export default {
    name: 'RegisterView',
    components: {
      
    },
    data() {
    return{
      Name: null,
      Vorname: null,
      Email: null,
      Passwort: null
    };},
    methods: {
    async onLogin(){
      this.$router.push('/login')
    },
    onRegistrieren(){
      axios.post(APIURLService.getAPIUrl()+'/api/Login/register', { email: this.Email,
                                                                    password: this.Passwort, 
                                                                    firstName: this.Vorname,
                                                                    lastName: this.Name,});

      this.$router.push('/login')
    }
  }
  }
  </script>
  
  <style scoped>
  .buttons{
    display: flex;
  }
    .login{
      float: left;
    }
    .form{
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .register{
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
    }

  </style>
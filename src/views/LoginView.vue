<template>
    <div class="form">
      <div class="container p-5 text-center">
        <form>
          <p class="h2">Login</p>
          <div class="mb-3">
            <input type="text" class="form-control" id="e-mail" placeholder="E-Mail" v-model="email">
          </div>
          <div class="mb-3">
            <input type="password" class="form-control" id="password" placeholder="Passwort" v-model="passwort">
          </div>
          <button type="submit" class="btn btn-primary mb-2 mt-2" v-on:click.prevent="onLogin">Login</button>
          <button type="submit" class="btn btn-primary mb-2 mt-2" v-on:click.prevent="onRegistrieren">Registrieren</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import axios from 'axios'
  import APIURLService from '@/services/API.service';
  
  export default {
    name: 'LoginView',
    components: {
      
    },
    setup(){
  
    },
    data() {
    return{
      kundenId: null,
      email: null,
      passwort: null
    };
    },
    methods: {
      async onLogin(){
        // var res = await axios.post(APIURLService.getAPIUrl()+'/api/Login/LoginUser', {email: this.email,
                                                                                  //  passwort: this.passwort});
        axios.post(APIURLService.getAPIUrl()+'/api/Login/login', {email: this.email,
		                                                              password: this.passwort}).then(
          (response)=>{
			      if(response.data != -1){
              this.$store.commit('setKundenDaten', response.data);
              const rolle = this.$store.getters.getRolle;
              const kundenId = this.$store.getters.getKundenId;
              this.$router.push('/')
            }else{
              alert("Email oder Passwort falsch");
              this.$router.push('/login');
            }
          }
        )
        
  
      },
      onRegistrieren(){
        this.$router.push('/register')
      }
    }
  }
  </script>
  
  <style scoped>
  .form {
    width: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  
  button{
    margin-left: 1rem;
    margin-right: 1rem;
  }
  .registerButton{
    text-decoration: none;
    color: white;
  }
  .registerButton:hover{
    text-decoration: none;
    color: white;
  }
  
  </style>
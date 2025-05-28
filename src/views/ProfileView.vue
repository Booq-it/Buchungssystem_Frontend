<template>

    <div class="container rounded bg-custom mt-5 mb-5">
        <div class="row">
            <div class="col-md-2 border-right">
                <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" width="82" height="82" fill="currentColor"
                        class="bi bi-person-bounding-box profilePic" viewBox="0 0 16 16">
                        <path
                            d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z" />
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    </svg> -->
                    <img src="https://www.ts-plan.de/images/vollmer-passbild-2007-10-15-klein.png" alt="">
                    <span class="font-weight-bold">{{ this.$store.getters.getNameVorname }}</span>
                    <span class="">{{ this.$store.getters.getKundenDaten.Email }}</span>
                    <span> </span>
                </div>
            </div>
            <div class="col-md-5">
                <div class="p-3 py-5">
                <form action="" method="post" v-on:submit.prevent="onDatenSpeichern">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h4 class="text-right">Profil Bearbeiten</h4>
                    </div>
                    <div class="row mt-2">
                        <div class="col-md-6">
                            <label class="labels">Name</label>
                            <input type="text" class="form-control" placeholder="Name" v-model=this.Name>
                        </div>
                        <div class="col-md-6">
                            <label class="labels">Vorname</label>
                            <input type="text" class="form-control" v-model=this.Vorname placeholder="Vorname">
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-12">
                            <label class="labels">Email</label>
                            <input type="text" class="form-control" placeholder="Email" v-model=this.Email>
                        </div>
                    </div>
                    <div class="mt-3 text-center">
                        <input class="input-group-text saveButton" type="submit" value="Speichern"></input>
                    </div>
                </form>
                </div>
            </div>
            <div class="col-md-4 add">
                <div class="p-3 py-5">
                    <div class="d-flex justify-content-between align-items-center experience"><span>Passwort
                            ändern</span></div><br>
                    <div class="col-md-12"><label class="labels">Altes Passwort</label><input type="password"
                            class="form-control" placeholder="Passwort" v-model=this.Passwort1></div> <br>
                    <div class="col-md-12"><label class="labels">Neues Passwort</label><input type="password"
                            class="form-control" placeholder="Passwort" v-model=this.Passwort2></div> <br>
                    <div class="col-md-12"><label class="labels">Passwort bestätigen</label><input type="password"
                            class="form-control" placeholder="Passwort bestätigen" v-model=this.Passwort3></div>
                    <div class="mt-3 text-center"><button class="input-group-text saveButton"
                            type="button" v-on:click.prevent="onPasswortSpeichern">Ändern</button></div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

import axios from 'axios'
import APIURLService from '@/services/API.service';

export default {

    name: 'ProfileView',
    components: {

    },
    data() {
        return {
            Name: null,
            Vorname: null,
            Email: null,
            Passwort1: null,
            Passwort2: null,
            Passwort3: null,
            PasswortMaching: true
        }
    },
    created() {
        const kunden_id = this.$store.getters.getRolle;
        if (kunden_id == null) {
            this.$router.push({ name: "login" });
        }

        this.Name = this.$store.getters.getKundenDaten.Name;
        this.Vorname = this.$store.getters.getKundenDaten.Vorname;
        this.Email = this.$store.getters.getKundenDaten.Email;

    },
    methods: {
        async onDatenSpeichern() {
            await axios.patch(APIURLService.getAPIUrl() + '/api/Login/ChangeUserInfo', {
                id: this.$store.getters.getKundenId,
                lastName: this.Name,
                firstName: this.Vorname,
                email: this.Email
            });
            this.updateStoreDaten();

        },
        async onPasswortSpeichern(){
            if(this.Passwort2 == this.Passwort3){
                var res = await axios.post(APIURLService.getAPIUrl() + '/api/User/ChangePassword', {
                id: this.$store.getters.getKundenId,
                oldPassword: this.Passwort1,
                newPassword: this.Passwort2
                })
                if(res.data == -1){
                    alert("Passwort konnte nicht geändert werden");
                    this.PasswortMaching = false;
                }else{
                    alert("Passwort erfolgreich geändert");
                    this.PasswortMaching = true;
                }
            
            }else{
                alert("kracht");
                this.PasswortMaching = false;
            }
        },
        updateStoreDaten(){
            var kundendaten = {
                id: this.$store.getters.getKundenId,
                email: this.Email,
                firstName: this.Vorname,
                lastName: this.Name,
                role: this.$store.getters.getRolle
            }
            this.$store.commit('setKundenDaten', kundendaten);
            alert("Änderungen gespeichert");
        }
    }
}
</script>

<style scoped>
.container {
    max-width: 1200px;
    padding: 0 1rem;
    position: relative;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}
.profilePic {
    margin-top: 2em;
    margin-bottom: 1em;
}

.saveButton {
    position: relative;
    left: 100%;
    transform: translate(-100%, 0);
}

.border-right {
    border-right: 1px solid rgba(192, 176, 176, 0.425);
}

img {
    border-radius: 12px;
    margin-bottom: 10px;
}

</style>
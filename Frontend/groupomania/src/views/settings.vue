<template>
  <div class="container">
    <div class="delete" v-if="deleteAccount">
      <div class="wrapper fadeInDown">
        <div id="formContent">
          <h2 class="suppr" v-if="!modePassword">SUPPRIMER LE PROFIL</h2>
          <!-- Modif Form -->
          <form v-on:submit.prevent="accountDelete()">
            <input
              type="text"
              id="password"
              name="login"
              placeholder="Mot de passe"
              required
            />
            <div class="alert alert-danger app" role="alert" v-if="errorMdp">
              Mot de passe incorrect !
            </div>
            <button class="btn btn-danger mt-3 mb-5" @click="accountDelete()">
              SUPPRIMER
            </button>
          </form>
        </div>
      </div>
    </div>
    <div class="modifyBox" v-if="!deleteAccount">
      <div class="wrapper fadeInDown">
        <div id="formContent">
          <h2
            class="modif colorfull underlineHoverH2"
            v-if="modePassword"
            @click="switchTo()"
          >
            Modifier ton profil
          </h2>
          <h2
            class="modif colorfull underlineHoverH2"
            v-if="!modePassword"
            @click="switchTo()"
          >
            Modifier ton mot de passe
          </h2>
          <!-- Modif Form -->
          <form v-on:submit.prevent="modifier, changePassword">
            <input
              type="text"
              id="nom"
              name="nom"
              placeholder="Nom"
              v-if="!modePassword"
            />
            <input
              v-if="!modePassword"
              type="text"
              id="prenom"
              name="prenom"
              placeholder="Prenom"
            />
            <input
              v-if="!modePassword"
              type="text"
              id="desc"
              name="desc"
              placeholder="Poste chez Groupomania"
            />
            <p class="red app" v-if="long && !modePassword">
              Les champs doivent faire au moins 3 caractères.
            </p>
            <input
              v-if="modePassword"
              type="password"
              id="oldPassword"
              name="login"
              placeholder="Ancien mot de passe"
              required
            />
            <input
              v-if="modePassword"
              type="password"
              id="password"
              name="login"
              placeholder="Nouveau mot de passe"
              required
            />
            <p class="red" v-if="errorNewMdp && modePassword">
              Ton mot de passe doit contenir 8 caractères, une majuscule, une
              minuscule et un caractère spécial
            </p>
            <input
              v-if="!modePassword"
              @click="modifier()"
              type="submit"
              value="MODIFIER"
            />
            <input
              v-if="modePassword"
              @click="changePassword()"
              type="submit"
              value="CHANGER MOT DE PASSE"
            />
            <div class="alert alert-success app" role="alert" v-if="update">
              Utilisateur mis à jour !
            </div>
            <div class="alert alert-danger app" role="alert" v-if="errorMdp">
              Mot de passe incorrect !
            </div>
          </form>
          <div id="formFooter">
            <p @click="switchToDelete()" class="underlineHover colorfullDelete" href="#">
              SUPPRIMER LE COMPTE
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const CryptoJS = require("crypto-js");
export default {
  data() {
    return {
      long: false,
      errorNewMdp: false,
      deleteAccount: false,
      oldPassword: null,
      modePassword: false,
      update: false,
      nom: null,
      prenom: null,
      password: null,
      desc: null,
      image: null,
      errorMdp: false,
      userId: document.cookie
        ? CryptoJS.AES.decrypt(
            document.cookie
              .split("; ")
              .find((row) => row.startsWith("userId="))
              .split("=")[1],
            this.$store.state.CryptoKey
          ).toString(CryptoJS.enc.Utf8)
        : null,
    };
  },
  methods: {
    accountDelete() {
      this.password = document.querySelector("#password")
        ? document.querySelector("#password").value
        : null;
      console.log(this.password);
      const that = this;
      axios
        .delete(
          `http://localhost:3000/api/user/delete/${that.userId}`,
          { data: { password: that.password } },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then(function (response) {
          console.log(response);
          document.cookie = "userId=";
          document.cookie = "user-token=";
          that.$router.go("/");
        })
        .catch(function (error) {
          that.errorMdp = true;
          console.log(error);
        });
    },
    switchToDelete() {
      this.deleteAccount = true;
      this.modePassword = false;
    },
    switchTo() {
      this.modePassword
        ? (this.modePassword = false)
        : (this.modePassword = true);
    },
    upload(event) {
      this.image = event.target.files[0];
    },
    changePassword() {
      this.password = document.querySelector("#password")
        ? document.querySelector("#password").value
        : null;
      this.oldPassword = document.querySelector("#oldPassword")
        ? document.querySelector("#oldPassword").value
        : null;
      this.token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("user-token="))
        .split("=")[1];
      let validPassword = new RegExp(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*.]).{8,}$/
      );
      if (validPassword.test(this.password)) {
        console.log(true);
        const that = this;
        axios
          .put(
            `http://localhost:3000/api/user/modifyPassword/${that.userId}`,
            {
              oldPassword: that.oldPassword,
              password: that.password,
            },
            {
              headers: {
                Authorization: `Bearer ${this.token}`,
              },
            }
          )
          .then(function (response) {
            console.log(response);
            that.update = true;
          })
          .catch(function (error) {
            console.log(error);
            that.errorMdp = true;
            that.update = false;
          });
      } else {
        console.log(false);
        this.errorNewMdp = true;
        this.update = false;
      }
    },
    modifier() {
      this.nom = document.querySelector("#nom")
        ? document.querySelector("#nom").value
        : null;
      this.prenom = document.querySelector("#prenom")
        ? document.querySelector("#prenom").value
        : null;
      this.desc = document.querySelector("#desc")
        ? document.querySelector("#desc").value
        : null;
      this.token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("user-token="))
        .split("=")[1];
      let validName = new RegExp(
        /^[a-zA-Z]+[a-zA-Z]+[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*){3,}$/
      );
      const that = this;
      if (
        validName.test(this.nom) ||
        validName.test(this.prenom) ||
        validName.test(this.desc)
      ) {
        axios
          .put(
            `http://localhost:3000/api/user/modifyAccount/${that.userId}`,
            {
              prenom: that.prenom,
              nom: that.nom,
              desc: that.desc,
            },
            {
              headers: {
                Authorization: `Bearer ${this.token}`,
              },
            }
          )
          .then(function (response) {
            console.log(response);
            that.update = true;
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        that.long = true;
      }
    },
  },
  mounted() {
    if (!this.userId) {
      this.$router.push("/");
    }
  },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Dosis:wght@300;500;604;800&family=Quicksand:wght@500;550;700&display=swap');
@keyframes disparition {
  100% {
    opacity: 0;
  }
}
.app {
  animation: disparition 3.5s forwards;
}
.red {
  color: red;
  margin: 0px;
}
.underlineHover {
  color: red;
  cursor: pointer;
}
#image {
  margin: 20px;
}
.modif {
  color: #091f43;
  text-align: center;
  cursor: pointer;
  position: relative;
}
.container {
  margin-top: 50px;
}
.error {
  color: red;
  margin-top: -30px;
}
.signup {
  margin-top: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 550px;
  font-family: "Dosis";
}
a {
  color: #92badd;
  display: inline-block;
  text-decoration: none;
  font-weight: 400;
  font-family: "Dosis";
}
h2 {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-block;
  margin: 40px 8px 10px 8px;
  color: #cccccc;
  color: #fff;
}
@keyframes textclip {
	to {
		background-position: 200% center;
	}
}
/* STRUCTURE */
.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 20px;
  font-family: "Dosis";
}
.colorfull{
  font-weight: bolder;
	font-family: "Dosis";
	background: linear-gradient(to right,#095fab 10%, #25abe8 50%, #c51e1e 60%);
	background-size: auto auto;
	background-clip: border-box;
	background-size: 200% auto;
	color: #fff;
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	animation: textclip 2s linear infinite;
}
.colorfullDelete{
  font-weight: bolder;
	font-family: "Dosis";
	background: linear-gradient(to right,#ff053b 10%, #ff0000 50%, #c51e1e 60%);
	background-size: auto auto;
	background-clip: border-box;
	background-size: 200% auto;
	color: #fff;
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	animation: textclip 2s linear infinite;
}
@keyframes textclip {
	to {
		background-position: 200% center;
	}
}

#formContent {
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  background: #fff;
  padding: 30px;
  width: 90%;
  max-width: 450px;
  position: relative;
  padding: 0px;
  -webkit-box-shadow: 0 30px 60px 0 rgb(74, 174, 255);
  box-shadow: 0 30px 60px 0 rgb(74, 174, 255);
  text-align: center;
}
#formFooter {
  background-color: #f6f6f6;
  border-top: 1px solid #dce8f1;
  font-family: "Dosis";
  padding: 25px;
  font-size: 800;
  text-align: center;
  -webkit-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
  -webkit-box-shadow: 0 30px 60px 0 rgb(255, 74, 74);
  box-shadow: 0 30px 60px 0 rgb(255, 74, 74);
}
.btn{
  background-color: #a51313;
  border: none;
  font-family: "Dosis";
  color: white;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 900;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
/* TABS */
h2.inactive {
  color: #cccccc;
}
h2.active {
  color: #0d0d0d;
  border-bottom: 2px solid #5fbae9;
}
/* FORM TYPOGRAPHY*/
input[type="button"],
input[type="submit"],
input[type="reset"] {
  background-color: #56baed;
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
input[type="button"]:hover,
input[type="submit"]:hover,
input[type="reset"]:hover {
  background-color: #091f43;
}
input[type="button"]:active,
input[type="submit"]:active,
input[type="reset"]:active {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}


input[type="text"],
input[type="password"] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 6px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}
input[type="text"]:focus {
  background-color: #fff;
  border-bottom: 2px solid #5fbae9;
}
input[type="text"]:placeholder {
  color: #cccccc;
}
.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}
@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}
@keyframes incorrect {
  0% {
    transform: translateX(20px);
  }
  50% {
    transform: translateX(-20px);
  }
  100% {
    transform: translateX(0px);
  }
}
/* Simple CSS3 Fade-in Animation */
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-moz-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.incorrect {
  animation: incorrect ease-in 1;
}
.fadeIn {
  opacity: 0;
  -webkit-animation: fadeIn ease-in 1;
  -moz-animation: fadeIn ease-in 1;
  animation: fadeIn ease-in 1;
  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  -webkit-animation-duration: 1s;
  -moz-animation-duration: 1s;
  animation-duration: 1s;
}
.fadeIn.first {
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  animation-delay: 0.4s;
}
/* Simple CSS3 Fade-in Animation */
.underlineHover:after {
  display: block;
  left: 0;
  bottom: -10px;
  width: 0;
  height: 2px;
  background-color: red;
  content: "";
  transition: width 0.2s;
}
.underlineHover:hover {
  color: #0d0d0d;
}
.underlineHover:hover:after {
  width: 100%;
}
.underlineHoverH2:after {
  display: block;
  left: 0;
  bottom: -10px;
  width: 0;
  height: 2px;
  background-color: #2c658e;
  content: "";
  transition: width 0.2s;
}
.underlineHoverH2:hover {
  color: #0d0d0d;
}
.underlineHoverH2:hover:after {
  width: 100%;
}
.suppr {
  color: rgb(197, 38, 38);
  font-family: "Dosis";
  font-weight: 900;
}
</style>
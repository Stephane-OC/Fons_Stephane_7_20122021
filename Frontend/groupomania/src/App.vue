<template>
  <header>
    <div class="navigation">
      <nav
        class="
          navbar navbar-light
          white
          nav
          d-flex
          justify-content-center
          flex-nav
        "
      >
        <a class="nav-link">
          <router-link to="/home"
            ><img
              class="homeLinkBig"
              id="nav_groupomania"
              src="../image/groupomania-blue.svg"
              alt="lien acceuil"
          /></router-link>
        </a>
        <a class="nav-link">
          <router-link to="/home"
            ><img
              class="homeResponsive"
              src="../image/groupomania-blue.svg"
              alt="lien acceuil"
          /></router-link>
        </a>
        <ul class="nav justify-content-center">
          <li class="nav-item" v-if="user">
            <a class="nav-link">
              <router-link :to="{ name: 'user', params: { userId: user.id } }">
                <img
                  v-bind:src="user.pp"
                  alt="pp"
                  class="userPageLink"
                  @click="refresh"
                />
              </router-link>
            </a>
          </li>
          <li class="nav-item" v-if="user">
            <a class="nav-link">
              <router-link to="/settings">
                <img
                  src="../image/settings-gear.svg"
                  alt="setting"
                  class="setting"
                />
              </router-link>
            </a>
          </li>
          <li class="nav-item" v-if="user">
            <img
              @click="appResearch"
              class="loupe"
              src="../image/search.svg"
              alt=""
            />
          </li>
          <li class="nav-item" v-if="user">
            <a class="nav-link">
              <router-link to="/"
                ><img
                  @click="logout"
                  src="../image/sign-out.svg"
                  alt="logout"
                  class="logout"
              /></router-link>
            </a>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0" v-if="user">
          <div class="flex_input">
            <input
              class="form-control marginTop mr-sm-2 inputsearch"
              type="search"
              placeholder="   Chercher un utilisateur"
              aria-label="Search"
              @keyup="search"
              @click="researchStop"
              @blur="researchStop"
            />
            <img
              @click="dispResearch"
              class="cross"
              src="../image/delete-cross.svg"
              alt=""
            />
          </div>
          <div class="results" v-if="userSearch && research != ''">
            <div v-for="result in userSearch" :key="result.id" class="result">
              <router-link
                :to="{ name: 'user', params: { userId: result.id } }"
              >
                <img
                  class="imgSearch"
                  v-bind:src="result.pp"
                  alt=""
                  srcset=""
                />
                <span class="nameSearch"
                  >{{ result.prenom }} {{ result.nom }}</span
                >
              </router-link>
            </div>
          </div>
        </form>
      </nav>
    </div>
  </header>
  <!-- eslint-disable -->
  <router-view :key="$route.Path"/>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Dosis:wght@604;800&family=Quicksand:wght@500;550;700&display=swap');
.loupe {
  height: 35px;
  margin-top: 7px;
  margin-left: 10px;
  &:hover {
    transition: 0.3s;
    transform: scale(1.1);
  }
}
.inputsearch {
  background-color: #f0f2f5;
  border-radius: 20px;
  text-align: center;
  font-family: "Quicksand";
  font-weight: 900;
  margin-right: 2em;
}
.nameSearch {
  text-decoration: none;
  color: #091f43;
}
a:link {
  text-decoration: none;
}
.imgSearch {
  object-fit: cover;
  height: 45px;
  width: 45px;
  margin: 10px;
  border-radius: 100%;
}
.results {
  position: absolute;
  z-index: 150;
  
}
.result {
  width: 221px;
  border: 1px solid #dbdbdb;
  background-color: white;
  &:hover {
    background-color: #90b3d6;
  }
}
a:hover {
  transition: 0.3s;
  transform: scale(1.1);
}
.userPageLink {
  object-fit: cover;
  height: 40px;
  width: 40px;
  margin-top: -0.3em;
  margin-bottom: 0px;
  margin-right: 40px;
  border-radius: 100%;
}
.homeResponsive {
  height: 35px;
  margin-right: 20px;
}
.setting {
  height: 32px;
  margin-left: 20px;
}
.logout {
  height: 30px;
  width: 80px;
}
.navlink {
  margin-bottom: 1em;
}
.navbar {
  border-bottom: 1px solid #dbdbdb;
  height: 55px;
  padding-bottom: 6.5rem;
}
.navigation {
  padding-bottom: 0em;
}
.white {
  background-color: #fff;
}
body {
  margin: 0;
  background-color: #fafafa;
}
#app {
  font-family: dosis, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
* {
  box-sizing: border-box;
}
#nav {
  background-color: #091f43;
  &_groupomania {
    width: 200px;
  }
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #d1515a;
    }
  }
}
@media only screen and (min-width: 1000px) {
  .homeResponsive {
    display: none;
  }
  .loupe {
    display: none;
  }
  .cross {
    display: none;
    height: 35px;
    position: absolute;
  }
}
@media only screen and (max-width: 1000px) {
  .homeLinkBig {
    display: none;
  }
  .userPageLink {
    margin: 0px;
  }
  #nav_groupomania {
    width: 30px;
    align-content: center;
  }
  .homeLinkLil {
    margin: 0px;
  }
  .inputsearch {
    display: none;
  }
  .loupe {
    height: 28px;
    margin-top: 11px;

  }
  .setting {
    height: 32px;
  }
  .logout{
    margin-top: 3px;
  }
  .cross {
    height: 35px;
    margin-left: 20px;
    display: none;
  }
  .flex_input {
    display: flex;
  }
}
@media only screen and (max-width: 570px) {
  .loupe {
    height: 28px;
  }
  nav {
    margin-bottom : 48px;
  }
  .navigation {
    padding-bottom: 2.5rem;
  }
  .navbar{
    margin-bottom : 48px;
  }
  .container {
    padding-top: 1.2em;
  }
  .navbar {
    margin-bottom: 5.5rem;
  }
  .navlink {
    margin-bottom: 3px;
  }
  .userPageLink {
    margin-top: 1em;
  }
  .setting {
    margin-top: 1em;
  }
  .logout {
    margin-top: 1.2em;
  }
  .loupe {
    margin-top: 1.6em;
  }  
  .marginBottonm {
    margin-top: 7px;
  }

  li {
    margin-top: -15px;
  }
  .homeResponsive {
    margin-top: -16px;
  }
}
</style>


<script>
import axios from "axios";
const CryptoJS = require("crypto-js");
export default {
  data() {
    return {
      research: "",
      userSearch: null,
      user: null,
      token: document.cookie
        ? document.cookie
            .split("; ")
            .find((row) => row.startsWith("user-token="))
            .split("=")[1]
        : null,
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
    appResearch() {
      document.querySelector(".inputsearch").style.display = "block";
      document.querySelector(".cross").style.display = "block";
    },
    dispResearch() {
      document.querySelector(".inputsearch").style.display = "none";
      document.querySelector(".cross").style.display = "none";
    },
    researchStop() {
      const that = this;
      setTimeout(function () {
        that.research = null;
        that.userSearch = null;
      }, 100);
    },
    search(event) {
      this.research = event.target.value;
      const that = this;
      axios
        .post(
          "http://localhost:3000/api/user/getAs",
          { nom: that.research },
          {
            headers: {
              Authorization: `Bearer ${that.token}`,
            },
          }
        )
        .then((response) => {
          that.userSearch = response.data;
        })
        .catch(function (error) {
          if (error.response && error.response.status === 403) {
            that.$router.push("/");
          }
        });
    },
    logout() {
      document.cookie = "userId=";
      document.cookie = "user-token=";
      this.$router.go();
    },
    getCurrentUser() {
      const that = this;
      axios
        .post(
          "http://localhost:3000/api/user",
          { userId: that.userId },
          {
            headers: {
              Authorization: `Bearer ${that.token}`,
            },
          }
        )
        .then((response) => (that.user = response.data[0]))
        .catch(function (error) {
          if (error.response && error.response.status === 400) {
            document.cookie = "userId=";
            document.cookie = "user-token=";
            that.$router.push("/");
          }
        });
    },
  },
  mounted() {
    this.getCurrentUser();
    this.researchStop();
  },
};
</script>
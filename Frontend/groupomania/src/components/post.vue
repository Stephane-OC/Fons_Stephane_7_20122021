<template>
  <router-view>
    <div class="contein">
    <div class="d-flex justify-content-center newPost">
      <div
        class="
          home
          col-xs-12 col-md-10 col-lg-6
          d-flex
          flex-row
          justify-content-center
          align-items-center
          p-2
          bg-white
          border
          mt-5
          
        "
      >
        <div class="form">
          <form v-on:submit.prevent>
            <div
              class="
                form-group
                mb-3
                col-12
                d-flex
                justify-content-center
                align-items-center
              "
            >
              <img v-if="user" v-bind:src="user.pp" alt="pp" class="ppPost" />
              <input
                type="text"
                class="form-control mb-2"
                id="text"
                aria-describedby="emailHelp"
                placeholder=" Quoi de neuf ?"
              />
            </div>
            <div class="d-flex justify-content-between">
              <input
                @change="upload2"
                type="file"
                id="image"
                name="image"
                accept="image/png, image/jpeg"
              />
              <button @click="addPost()" class="publier btn btn-primary">
                Publier
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div v-if="first">
      <div
        v-for="post in posts"
        :key="post.postId"
        class="d-flex justify-content-center"
      >
        <div
          class="bg-white border mt-2 mb-2 col-sm-12 col-md-10 col-lg-6 posts"
        >
          <div>
            <div
              class="
                d-flex
                flex-row
                justify-content-between
                align-items-center
                p-2
                border-bottom
                infopost
              "
            >
              <div class="d-flex flex-row align-items-center px-2">
                <router-link
                  :to="{ name: 'user', params: { userId: post.authorId } }"
                >
                  <img
                    class="rounded-circle pp"
                    v-bind:src="post.pp"
                    width="45"
                  />
                </router-link>

                <div class="d-flex flex-column flex-wrap ml-2">
                  <span class="font-weight-bold nomUser"
                    >{{ post.prenom }} {{ post.nom }}</span
                  ><span class="text-black-50"
                    >Posté le {{ formatDate(post.date) }}</span
                  >
                </div>

                <!-- Modal post Delete -->
                <div 
                  class="btn-group deletePost btn-group-sm" 
                  role="group" 
                  aria-label="Button to delete in a nested dropdown" 
                  v-if="post.authorId == userId || (user && user.admin)"> 
                  <div 
                    class="btn-group deletePost btn-group-sm" 
                    role="group">
                    <button 
                      id="btnGroupDrop1" 
                      type="button" 
                      class="btn btnModal btn-primary dropdown-toggle" 
                      data-bs-toggle="dropdown" 
                      aria-expanded="false">
                      ✜</button>
                          <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                            <li><a 
                                class="dropdown-item" 
                                alt="supprimer"
                                v-if="post.authorId == userId || (user && user.admin)"
                                @click="deletePost(post.postId, post.authorId)"
                                href="#">Supprimer
                              </a>
                            </li>  
                          </ul>
                    </div>
                </div>
                
              </div>
            </div>
          </div>
          <div v-if="post.text != ' '">
            <span class="text">{{ post.text }}</span>
          </div>
          <div v-if="post.imageUrl" class="mb-2">
            <img
              class="img-fluid img-responsive imagePost"
              v-bind:src="post.imageUrl"
            />
          </div>
          <div class="react">
            <div class="like" @click="liked">
              <svg
                @click="like(post.postId)"
                v-if="likedPost.includes(post.postId)"
                aria-label="Je n’aime plus"
                class="_8-yf5 heart"
                color="#ed4956"
                fill="#ed4956"
                height="30"
                role="img"
                viewBox="0 0 48 48"
                width="24"
              >
                <path
                  d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"
                ></path>
              </svg>
              <svg
                @click="like(post.postId)"
                v-else
                aria-label="J’aime"
                class="_8-yf5 svg-react"
                color="#262626"
                fill="#262626"
                height="30"
                role="img"
                viewBox="0 0 48 48"
                width="24"
              >
                <path
                  d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"
                ></path>
              </svg>
              <span class="commentPage">{{ post.like }}</span>
            </div>
            <div class="comment">
              <svg
                @click="displayComment"
                aria-label="Commenter"
                class="_8-yf5 svg-react"
                color="#262626"
                fill="#262626"
                height="24"
                role="img"
                viewBox="0 0 48 48"
                width="24"
              >
                <path
                  clip-rule="evenodd"
                  d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z"
                  fill-rule="evenodd"
                ></path>
              </svg>
              <span class="commentPage">{{ post.comment }}</span>
            </div>
          </div>
          <div class="block-com disp">
            <div
              class="comments"
              v-for="comment in comments"
              :key="comment.idComment"
            >
              <div class="pp" v-if="post.postId === comment.postId">
                <router-link
                  :to="{ name: 'user', params: { userId: comment.authorId } }"
                >
                  <img
                    class="rounded-circle pp2"
                    v-bind:src="comment.pp"
                    alt="pp comment"
                    srcset=""
                  />
                </router-link>
              </div>
              <div v-if="post.postId === comment.postId" class="commentStructur">
                <span class="commentByAuthor"
                  >{{ comment.prenom }} {{ comment.nom }}</span
                >
                <p class="commentText">{{ comment.comments }}</p>

                <!-- Modal Comment Delete -->
                <div class="dropdown delete">
                  <button 
                    class="btn btn-secondary dropdown-toggle" 
                    type="button" 
                    id="btnGroupEnd" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false">
                  ✜</button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <li>
                      <button 
                        class="dropdown-item" 
                        alt="supprimer" 
                        type="button" 
                        v-if="post.authorId == userId || (user && user.admin) "
                        @click="deleteComment(comment.idComment, comment.authorId, post.postId)">
                        Supprimer
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-10 d-flex justify-content-center comment">
            <input
              v-on:keyup.enter="comment($event, post.postId)"
              @change="upload"
              type="text"
              class="form-control mt-3 mb-3"
              id="comment"
              aria-describedby="comment"
              placeholder="Ajoutez un commentaire ..."
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="noPost">
      <p class="text-noPost">Aucun post ici pour le moment ...</p>
    </div>
    </div>
  </router-view>
</template>



<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Dosis:wght@604;800&family=Quicksand:wght@500;550;700&display=swap');
.text-noPost {
  text-align: center;
  font-weight: 500;
  font-style: italic;
  font-size: 20px;
  color: #091f43;
}

.contein {
  background-color: #091f43;
  margin: 0px;
  width: 100%;
  height: 100%;
}
#btnGroupDrop1 {
  top:-0.4em;
  padding: 0.25rem 0.2rem;
  font-size: .875rem;
  border-radius: 0.7rem;
  background-color: #091f43;
  border-color: #d1515a;
}
#btnGroupEnd {
 
  padding: 0rem 0.3rem;
  font-size: .875rem;
  border-radius: 1rem;
  background-color: #091f43;
  border-color: #d1515a;
}
.noPost {
  width: 500px;
  margin: auto;
  margin-top: 100px;
}
.infopost {
  position: relative;
}
.text {
  display: block;
  padding-top: 15px;
  padding-bottom: 10px;
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  color: #091f43;
}
.imagePost {
  object-fit: cover;
  max-height: 500px;
  width: 100%;
  margin: 0px;
  padding: 0px;
}
.infopost:hover {
  .deletePost {
    display: inline;
  }
}
.deletePost {
  height: 20px;
  position: absolute;
  right: 10px;
  display: none;
  cursor: pointer;
}
.dropend {
  padding: 0px;
}
.svg-react {
  &:hover {
    fill: #aaaaaa;
    animation: heart 0.5s cubic-bezier(0.06, 1.16, 0.83, 0.67) forwards;
  }
}
.react {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 5px;
}
.like {
  margin: auto;
  cursor: pointer;
}

.heart {
  animation: heart 0.3s cubic-bezier(0.08, 1.18, 0.86, 0.68);
}
@keyframes heart {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.2);
  }
}
.ppPost {
  margin-right: 10px;
  border-radius: 100%;  
  height: 45px;
  width: 45px;
  object-fit: cover;
}
.publier {
  width: 100px;
}
.home {
  height: 140px;

}
.form {
  width: 90%;
}
#text {
  border-radius: 20px;
  background-color: #f0f2f5;
  color: #091f43;
}
.delete {
  height: 15px;
  position: absolute;
  top: 5px;
  right: 10px;
  display: none;
  cursor: pointer;
  margin-left: 20px;
}
.nomUser {
  font-family: "Quicksand";
  font-weight: bold;
  font-size: 19px;
  color: #091f43;
}
.pp {
  object-fit: cover;
  margin-right: 18px;
  height: 55px;
  width: 55px;
}
.pp2 {
  object-fit: cover;
  height: 40px;
  width: 40px;
  margin-left: 20px;
}
.disp {
  display: none;
}
.time {
  font-size: 9px !important;
}
.socials i {
  margin-right: 14px;
  font-size: 17px;
  color: #d2c8c8;
  cursor: pointer;
}
.feed-image img {
  width: 100%;
  height: auto;
}
.commentText {
  margin-left: 10px;
  margin-right: 10px;
  color: #091f43;
  color: black;
  font-weight: 600;
  font-family: "Dosis";
}
.commentByAuthor {
  font-weight: bold;
  margin-left: 10px;
  margin-right: 10px;
  padding-top: 10px;
  color: #091f43;
}
.comment {
  margin: auto;
}
#comment {
  border-radius: 20px;
  background-color: #f0f2f5;
}
.commentStructur {
  display: inline-block;
  padding-left: 10px;
  padding-right: 20px;
  padding-top: 10px;
  margin-bottom: 10px;
  background-color: #4b99ff28;
  border-radius: 20px;
  position: relative;
  &:hover {
    .delete {
      display: block;
    }
  }
}
.comment {
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
  &__img {
    height: 40px;
  }
}
.commentPage {
  margin-left: 10px;
  margin-right: 10px;  
  font-weight: 300;
  font-size: 20px;
  font-family: "Quicksand";
  font-weight: 500;
}
.comments {
  display: flex;
}
@media (max-width: 560px) {
  .posts {
    width: 92%;
  }
  .newPost {
    width: 100%;
  }
}
</style>

<script>
import axios from "axios";
const CryptoJS = require("crypto-js");
export default {
  data() {
    return {
      first: null,
      user: null,
      likedPost: [],
      posts: null,
      postsRecive: null,
      token: document.cookie
        ? document.cookie
            .split("; ")
            .find((row) => row.startsWith("user-token="))
            .split("=")[1]
        : null,
      comments: null,
      newComment: null,
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
    formatDate(input) {
      var datePart = input.match(/\d+/g),
        year = datePart[0].substring(2), // get only two digits
        month = datePart[1],
        day = datePart[2];
      return day + "/" + month + "/" + year;
    },

    upload(event) {
      this.newComment = event.target.value;
    },    

    upload2(event) {
      this.image = event.target.files[0];
    },

    addPost() {
      this.token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("user-token="))
        .split("=")[1];
      this.text = document.querySelector("#text").value;
      const fd = new FormData();
      fd.append("userId", this.userId);
      if (this.text != "") {
        fd.append("text", this.text);
      }
      if (this.image) {
        fd.append("image", this.image, "image");
      }
      if (this.text || this.image) {
        const that = this;
        axios
          .post("http://localhost:3000/api/post", fd, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${this.token}`,
            },
          })
          .then(function (response) {
            console.log(response);
            document.querySelector("#text").value = null;
            that.getPost();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },

    comment(event, id) {
      if (this.newComment) {
        const that = this;
        axios
          .post(
            "http://localhost:3000/api/comment",
          
            {
              comment: this.newComment,
              authorId: this.userId,
              postId: id,
            },
            {
              headers: { Authorization: `Bearer ${this.token}` },
            }
          )
          .then(function (response) {
            console.log(response);
            let pathClass, pathInput;
            if (event.path[2].children[3].matches(".react")) {
              pathClass = event.path[2].children[4];
              pathInput = event.path[2].children[5].children[0];
            } else {
              pathClass = event.path[2].children[3];
              pathInput = event.path[2].children[4].children[0];
            }
            pathClass.classList.remove("disp");
            pathInput.value = null;
            that.getPost();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    

    displayComment(event) {
      let path;
      if (event.path[3].children[3].matches(".react")) {
        path = event.path[3].children[4];
      } else {
        path = event.path[3].children[3];
      }
      if (path.matches(".disp")) {
        path.classList.remove("disp");
      } else {
        path.classList.add("disp");
      }
    },

    deleteComment(id, authorId, currentPostId) {
      const that = this;
      if (this.userId == authorId || (that.user && that.user.admin)) {
        axios
          .delete(`http://localhost:3000/api/comment/${id}/${currentPostId}`, {
            headers: { Authorization: `Bearer ${this.token}` },
            data: { userId: that.userId, admin: that.user.admin },
          })
          .then((response) => {
            console.log(response);
            that.getPost();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },    

    liked() {
      const that = this;
      axios
        .post("http://localhost:3000/api/like/liked", {
          userId: this.userId,
        })
        .then(function (response) {
          const ObjlikedPosts = response.data;
          that.likedPost = [];
          for (const ObjlikedPost of ObjlikedPosts) {
            that.likedPost.push(ObjlikedPost.postId);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    deletePost(postId, authorId) {
      const that = this;
      if (this.userId == authorId || (that.user && that.user.admin)) {
        axios
          .delete(`http://localhost:3000/api/post/${postId}`, {
            headers: { Authorization: `Bearer ${this.token}` },
            data: { userId: that.userId, admin: that.user.admin },
          })
          .then((response) => {
            console.log(response);
            that.getPost();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },

    like(currentPostId) {
      const that = this;
      axios
        .post("http://localhost:3000/api/like", {
          userId: this.userId,
          postId: currentPostId,
        })
        .then(function (response) {
          console.log(response);
          that.liked();
          that.getPost();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
 
    getPost() {
      if (document.cookie) {
        this.token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("user-token="))
          .split("=")[1];
      }

      const that = this;
      axios
        .get("http://localhost:3000/api/post", {
          headers: { Authorization: `Bearer ${this.token}` },
        })
        .then((response) => {
          this.postsRecive = response.data;
          this.first = this.postsRecive[0];
          if (this.posts != this.postsRecive) {
            this.posts = this.postsRecive;
          }
        })
        .catch(function (error) {
          if (error.response && error.response.status === 401) {
            that.$router.push("/");
          }
        });
      axios
        .get("http://localhost:3000/api/comment", {
          headers: { Authorization: `Bearer ${this.token}` },
        })
        .then((response) => (this.comments = response.data) (console.log(this.comments)))
        .catch(function (error) {
          if (error.response && error.response.status === 401) {
            that.$router.push("/");
          }
        });
    },
  },

  mounted() {
    (this.userId = document.cookie
      ? CryptoJS.AES.decrypt(
          document.cookie
            .split("; ")
            .find((row) => row.startsWith("userId="))
            .split("=")[1],
          this.$store.state.CryptoKey
        ).toString(CryptoJS.enc.Utf8)
      : null),
      (this.token = document.cookie
        ? document.cookie
            .split("; ")
            .find((row) => row.startsWith("user-token="))
            .split("=")[1]
        : null);
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
      .then((response) => {
        that.user = response.data[0];
      })
      .catch(function (error) {
        if (error.response && error.response.status === 400) {
          document.cookie = "userId=";
          document.cookie = "user-token=";
          that.$router.push("/");
        }
      });
    this.getPost();
    this.liked();
    if (!this.userId) {
      this.$router.push("/");
    }
  },
};
</script>
<template>
  <div class="home">
    <div class="container">
      <Post />
    </div>
  </div>
</template>

<style lang="scss" scoped>
body, html {
  max-width: 1440px;  
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
  background-color: rgba(26, 32, 78, 0.815);
}
.home {
  background-color: #091f43;
}
</style>

<script>
// @ is an alias to /src
import Post from "@/components/post.vue";
export default {
  name: "Home",
  components: {
    Post,
  },
};
</script>
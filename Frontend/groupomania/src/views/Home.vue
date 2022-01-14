<template>
  <div class="home">
    <div class="container">
      <Post />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  background-color: rgba(100, 148, 237, 0.226);
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
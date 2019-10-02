<template>
  <v-content class="my-5 py-5">
    <nuxt-link to="/products/all/products">
      <v-parallax
        dark
        height="700"
        src="https://myfilesflch0707.s3.eu-west-3.amazonaws.com/belt-952834_1280.jpg"
      >
        <v-row align="center" justify="center">
          <h1 class="display-3 font-weight-bold mb-4">Flo's Shoes</h1>
          <h4 class="subheading">Sell and Buy shoes Now!</h4>
        </v-row>
      </v-parallax>
    </nuxt-link>
  </v-content>
</template>

<script>

export default {
  data() {
    return {};
  }
}
</script>
<style>
a {
  text-decoration: none;
  background-image: none;
}
</style>
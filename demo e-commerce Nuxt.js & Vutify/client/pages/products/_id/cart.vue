<template>
  <v-container>
    <Cart v-if="!updated" v-on:updatedStatus="updatedStatus($event)" />
    <v-card v-if="updated" class="my-5 py-5">
      <v-img
        max-height="450px"
        :src="product.url"
        class="white--text"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      >
        <v-card-title class="d-flex justify-center">BRAVO!</v-card-title>
        <v-card-title class="d-flex justify-center">
          Get more shoes
        <nuxt-link class="title" to="/"><small>here</small></nuxt-link>
        </v-card-title>
      </v-img>
    </v-card>
  </v-container>
</template>

<script>
import Cart from "@/components/cart/Cart";

export default {
  async fetch({ route, store, error }) {
    const user = await store.getters["user"];
    if (route.params.id) {
      let params = route.params.id;
      try {
        await store.dispatch("loadSingleProduct", params);
      } catch (e) {
        console.error(e);
        return error({ status: 404 });
      }
    }
  },
  data() {
    return {
      updated: false
    };
  },
  components: {
    Cart
  },
  computed: {
    product() {
      return this.$store.getters["product"];
    }
  },
  methods: {
    updatedStatus(e) {
      this.updated = e;
    }
  }
};
</script>
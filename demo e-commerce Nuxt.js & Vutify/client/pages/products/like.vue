<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="9">
        <Products params="all" :list="listwithLikes" />
      <h3 v-if="listwithLikes.length<1" class="mt-3">
        You dont have any shoes saved yet, shop
        <nuxt-link to="/products/all/products">
          <span>here</span>
        </nuxt-link>
      </h3>      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Products from "@/components/products/Products";
export default {
  async fetch({ route, store, redirect }) {
     const token = await store.getters["usertoken"]
         if (!token) {
      return redirect('/auth/login')
    }
    await store.dispatch("loadLikedProducts");
    await store.dispatch("loadProducts", "all");
  },
  components: {
    Products
  },

  computed: {
 
    products() {
      return this.$store.getters["products"];
    },
    likes() {
        return this.$store.getters["likes"].map(like => like.productId)
    },
    listwithLikes() {
      return this.products.filter(prod => {
      if(this.likes.includes(prod._id)) 
        return prod 
       });
    }
  },

  methods: {}
};
</script>
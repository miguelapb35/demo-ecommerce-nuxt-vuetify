<template>
  <v-row justify="center" class="my-5">
    <v-col cols="12" sm="6">
      <v-card>
        <v-img
          :src="product.url"
          class="white--text"
          height="370px"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        >
          <v-card-title v-text="product.title"></v-card-title>
        </v-img>
      </v-card>
    </v-col>
    <v-col cols="12" sm="6">
      <v-card class="mx-auto">
        <v-list-item two-line>
          <v-list-item-content>
            <v-col>
              <v-list-item-title class="display-1">{{product.price}}€</v-list-item-title>
            </v-col>
            <v-col>
              <v-list-item-title class="headline text-right">{{product.title}}</v-list-item-title>
            </v-col>
            <v-list-item-title class="subheading text-center my-5">"{{product.description}}"</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider />

        <v-list color="#F9F9F9">
          <v-row>
            <v-col>
              <v-list-item-title class="text-center">category</v-list-item-title>
            </v-col>
            <v-col>
              <v-list-item-subtitle>{{product.category}}</v-list-item-subtitle>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-list-item-title class="text-center">Brand</v-list-item-title>
            </v-col>
            <v-col>
              <v-list-item-subtitle>{{product.brand}}</v-list-item-subtitle>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-list-item-title class="text-center">For</v-list-item-title>
            </v-col>
            <v-col>
              <v-list-item-subtitle>{{product.gender}}</v-list-item-subtitle>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-list-item-title class="text-center">Size</v-list-item-title>
            </v-col>
            <v-col>
              <v-list-item-subtitle>{{product.size}}</v-list-item-subtitle>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-list-item-title class="text-center">Condition</v-list-item-title>
            </v-col>
            <v-col>
              <v-list-item-subtitle>{{product.condition}}</v-list-item-subtitle>
            </v-col>
          </v-row>
        </v-list>
      </v-card>
      <v-card-actions
        v-if="(product && product.seller && product.seller._id) !== (user && user._id)"
        class="px-auto"
      >
        <v-spacer />
        <v-btn @click="updateLikes(product)" icon small>
          <v-icon color="red lighten-1">{{ product.like ?'mdi-heart':'mdi-heart-outline'}}</v-icon>
        </v-btn>

        <v-btn icon small color="blue darken-3" :to="'/products/' + product._id + '/cart'">
          <v-icon>mdi-cart</v-icon>
        </v-btn>
      </v-card-actions>
      <v-card-actions v-else>
        <v-spacer />
        <v-btn icon color="blue darken-3" small to="/products/editProduct">
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </v-card-actions>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    product() {
      return this.$store.getters["product"];
    },
    user() {
      return this.$store.getters["user"];
    }
  },
  methods: {
    async updateLikes(prod) {
      if (this.user !== null) {
        await this.$store.dispatch("addLikedProduct", prod);
        await this.$store.dispatch("loadLikedProducts");
        await this.$store.dispatch("loadSingleProduct", this.product._id);
      } else {
        location.replace("/auth/login");
      }
    }
  }
};
</script>
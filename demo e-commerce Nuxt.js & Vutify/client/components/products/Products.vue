<template>
  <v-row>
    <v-col cols="12">
      <h2 class="font-weight-thin my-auto">{{title}}</h2>
    </v-col>
    <v-col cols="12" sm="6" lg="3" v-for="product in list" :key="product.id">
      <v-card outlined>
        <nuxt-link :to="'/products/' + product._id + '/singleProduct'">
          <v-img
            :src="product.url"
            class="white--text"
            height="370px"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          >
            <v-card-title v-text="product.title"></v-card-title>
          </v-img>
        </nuxt-link>
        <v-card-actions>
          <span class="font-weight-thin">
          {{product.price}}€
          </span>
          <v-spacer />
          <div v-if="(product && product.seller && product.seller._id) !== (user && user._id)">
            <v-btn title="favorite" @click="updateLikes(product)" icon small>
              <v-icon color="red lighten-1">{{ product.like ?'mdi-heart':'mdi-heart-outline'}}</v-icon>
            </v-btn>

            <v-btn title="Buy" icon small color="blue darken-3" :to="'/products/' + product._id + '/cart'"> 
              <v-icon>mdi-cart</v-icon>
            </v-btn>
          </div>
          <div v-else>
            <v-btn
              title="Your shoes, see the whole list of them"
              icon
              color="blue darken-3"
              small
              to="/products/editProduct"
            >
              <v-icon>mdi-home</v-icon>
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true
    },
    title: {
      type: String
    },
    params: {
      type: String
    }
  },

  data() {
    return {};
  },

  computed: {
    user() {
      return this.$store.getters["user"];
    },
    auth() {
      return this.$store.getters["usertoken"];
    },
    likes() {
      return this.$store.getters["likes"];
    }
  },
  methods: {
    async updateLikes(prod) {
      if (this.user !== null) {
        await this.$store.dispatch("addLikedProduct", prod);
        await this.$store.dispatch("loadLikedProducts");
        await this.$store.dispatch("loadProducts", this.params);
      } else {
        location.replace("/auth/login");
      }
    }
  }
};
</script>

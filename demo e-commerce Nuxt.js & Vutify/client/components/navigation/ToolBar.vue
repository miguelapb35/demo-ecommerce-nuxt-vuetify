<template>
  <v-app-bar dense fixed>
    <v-menu :offset-y="offset">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" class="hidden-md-and-up">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-show="auhtenticated(link)"
          link
          v-for="(link, i) in links"
          :key="i"
          :to="link.to"
          class="mr-1 my-4"
        >
          <v-list-item-title>{{ link.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <nuxt-link to="/" class="green--text">
      <v-toolbar-title>Flo's shoes</v-toolbar-title>
    </nuxt-link>
    <div class="flex-grow-1"></div>
    <v-btn icon to="/products/like/">
      <v-icon small>{{likes}}</v-icon>
    </v-btn>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn
        text
        v-for="(link, i) in links"
        :key="i"
        v-show="auhtenticated(link)"
        :to="link.to"
      >{{ link.title }}</v-btn>
    </v-toolbar-items>
    <v-spacer />

    <v-btn icon v-if="user === null" to="/auth/login"  class="mr-3">
      login
      <v-icon small>mdi-account</v-icon>
    </v-btn>

    <v-menu v-else :offset-y="offset">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" class="mr-3">
          {{user && user.userName}}
          <v-icon small>mdi-account</v-icon>
        </v-btn>
      </template>
      <v-list>
          <v-btn text @click="logout">logout</v-btn>
      </v-list>
    </v-menu>

  </v-app-bar>
</template>

  <script>
import Cookies from "js-cookie";

export default {
  data() {
    return {
      offset: true,
      links: [
        {
          title: "All",
          to: "/products/all/products",
          auth: false
        },
        {
          title: "Women",
          to: "/products/women/products",
          auth: false
        },
        {
          title: "Men",
          to: "/products/men/products",
          auth: false
        },
        {
          title: "Sell",
          to: "/products/sellProduct",
          auth: true
        },
        {
          title: "edit",
          to: "/products/editProduct",
          auth: true
        }
      ]
    };
  },
  mounted() {
    let token = JSON.parse(Cookies.get("token"));
    let user = JSON.parse(Cookies.get("user"));
    let dateLog = user && user.time + 3600000;
    if (!user === "null" || new Date().getTime() < dateLog) {
      this.$store.dispatch("refresh", {
        token: token,
        payload: user
      });
    }
  },
  computed: {
    user() {
      return this.$store.getters["user"];
    },
    products() {
      return this.$store.getters["products"];
    },
    likes() {
      return this.products.find(product => product.like)
        ? "mdi-heart"
        : "mdi-heart-outline";
    }
  },
  methods: {
    auhtenticated(link) {
      if (link.auth === true) return this.user === null ? false : true;
      else {
        return true;
      }
    },
    logout() {
      this.$store.dispatch("logout").then(() => location.replace("/"));
    }
  }
};
</script>
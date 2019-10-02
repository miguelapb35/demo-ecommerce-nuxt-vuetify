<template>
  <v-container>
    <v-toolbar dark>
      <v-toolbar-title>Your shoes to sell</v-toolbar-title>
      <div class="flex-grow-1"></div>
    </v-toolbar>
    <v-list two-line>
      <template v-for="(product) in products">
        <v-divider v-if="products.indexOf(product) >0" :key="product.url" />
        <v-list-item :key="product._id">
          <v-list-item-avatar>
            <v-img :src="product.url"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="d-flex justify-center title">
              {{product.title}}
              <span class="grey--text subtitle-1">{{product.price}}€</span>
            </v-list-item-title>
            <v-list-item-subtitle class="d-flex justify-center" v-html="product.description"></v-list-item-subtitle>

            <v-list-item-subtitle
              class="d-flex justify-center font-italic"
            >{{product.category}}/{{product.condition}}/size{{product.size}}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-icon>
            <v-btn icon @click="$emit('displayProductToUpdate',product)">
              <v-icon>mdi-pen</v-icon>
            </v-btn>
            <v-dialog class="mx-auto" max-width="300">
              <template v-slot:activator="{on}">
                <v-btn icon v-on="on">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="title grey lighten-2">Delete Shoes</v-card-title>
                <v-card-text class="pt-3">
                  Do you want to delete:
                  <span class="subtitle-2">{{product.title}}?</span>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red" text @click="$emit('deleteProduct',product)">Delete</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-list-item-icon>
        </v-list-item>
      </template>
    </v-list>
  </v-container>
</template>

<script>
export default {
  data: () => {
    return {};
  },
  computed: {
    products() {
      return this.$store.getters["products"];
    }
  },
  methods: {}
};
</script>
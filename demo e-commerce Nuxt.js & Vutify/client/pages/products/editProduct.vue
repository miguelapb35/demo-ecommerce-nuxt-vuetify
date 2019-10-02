<template>
  <v-container class="my-5">
    <div v-if="products.length>0">
      <ListProducts
        v-on:displayProductToUpdate="displayProductToUpdate($event)"
        v-on:deleteProduct="deleteProduct($event)"
      />
      <v-dialog v-model="alert" max-width="500px" loading>
        <v-alert
          type="warning"
          border="top"
          dark
        >Admin users only! Ask the mighty SuperAdmin for more rights</v-alert>
      </v-dialog>
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar dark>
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Edit product</v-toolbar-title>
          </v-toolbar>
          <EditProduct
            :editedItem="editedItem"
            v-on:editedItem="updateProduct($event)"
            v-on:updateFile="updateFile($event)"
          />
        </v-card>
      </v-dialog>
    </div>
    <div v-else class="mt-3">
      <h3>
        You dont have any shoes to edit yet, you can add some
        <nuxt-link to="/products/sellProduct">
          <span>here</span>
        </nuxt-link>
      </h3>
    </div>
  </v-container>
</template>

<script>
import EditProduct from "@/components/products/EditProduct";
import ListProducts from "@/components/products/ListProducts";

export default {
  async fetch({ route, store, redirect }) {
    const token = await store.getters["usertoken"];
    if (!token) {
      return redirect("/auth/login");
    }
    await store.dispatch("loadUserProducts");
    await store.dispatch("isAdmin");
  },

  data: () => {
    return {
      editedItem: {},
      file: "",
      dialog: false,
      alert: false
    };
  },
  components: {
    EditProduct,
    ListProducts
  },
  computed: {
    products() {
      return this.$store.getters["products"];
    },
    isAdmin() {
      return this.$store.getters["isAdmin"];
    }
  },
  methods: {
    displayProductToUpdate(prod) {
      this.editedItem = { ...prod };
      this.dialog = true;
    },
    async deleteProduct(prod) {
      if (this.isAdmin) {
        await this.$store.dispatch("deleteProduct", prod._id);
        await this.$store.dispatch("loadUserProducts");
      } else {
        this.alert = true;
      }
    },
    updateFile(e) {
      this.file = e;
    },
    async updateProduct(product) {
      if (this.isAdmin) {
        if (this.file) {
          await this.$store.dispatch("uploadProductURL", this.file);
        }
        await this.$store.dispatch("updateProduct", this.editedItem);
        await this.$store.dispatch("loadUserProducts");
        this.file = "";
        this.dialog = false;
      }
      if (!this.isAdmin) {
        this.dialog = false;
        this.alert = true;
      }
    }
  }
};
</script>
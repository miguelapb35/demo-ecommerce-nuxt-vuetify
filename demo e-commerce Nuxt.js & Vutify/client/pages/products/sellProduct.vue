<template>
  <v-container>
    <v-dialog v-model="alert" max-width="500px">
      <v-alert
        border="left"
        color="deep-purple accent-4"
        dark
      >Admin users only! Ask the mighty SuperAdmin for more rights</v-alert>
    </v-dialog>
    <EditProduct
      v-if="updated === false"
      :editedItem="editedItem"
      v-on:editedItem="uploadProduct"
      v-on:updateFile="updateFile($event)"
    />

    <div v-if="updated === true" class="pt-5 mt-5">
      <h3>Bravo! You've added new shoes to sell!</h3>
      <Product />
    </div>
  </v-container>
</template>


<script>
import Product from "@/components/products/Product";
import EditProduct from "@/components/products/EditProduct";
export default {
  async fetch({ route, store, redirect }) {
    const token = await store.getters["usertoken"];
    if (!token) {
      return redirect("/auth/login");
    }
    await store.dispatch("isAdmin");
  },
  data() {
    return {
      editedItem: {
        title: "",
        description: "",
        category: "",
        url:
          "https://myfilesflch0707.s3.eu-west-3.amazonaws.com/sneaker-305322_640.png",
        brand: "",
        gender: "women",
        size: "",
        condition: "",
        price: 200
      },
      updated: false,
      file: "",
      alert: false
    };
  },
  computed: {
    isAdmin() {
      return this.$store.getters["isAdmin"];
    }
  },
  methods: {
    updateFile(e) {
      this.file = e;
    },
    async uploadProduct(product) {
      if (this.isAdmin) {
        await this.$store.dispatch("uploadProductURL", this.file);
        await this.$store.dispatch("addProduct", this.editedItem);
        this.file = "";
        this.updated = true;
      }
      if (!this.isAdmin) this.alert = true;
    }
  },
  components: {
    Product,
    EditProduct
  }
};
</script>
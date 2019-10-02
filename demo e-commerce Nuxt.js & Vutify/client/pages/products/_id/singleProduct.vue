<template>
  <v-container>
    <Product />
    <Products params="all" :title="title" :list="productList" />
  </v-container>
</template>


<script>
import Product from "@/components/products/Product";
import Products from "@/components/products/Products";
export default {
  async fetch({ route, store, error }) {
    if (route.params.id) {
      let routeId = route.params.id;
      try {
        await store.dispatch("loadSingleProduct", routeId);
        await store.dispatch("loadSellerProducts");
      } catch (e) {
        console.error(e);
        return error({ status: 404 });
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    product() {
      return this.$store.getters["product"];
    },
      products() {
      return this.$store.getters["products"];
    },
    productList() {
        return this.products.filter(prod => prod._id !== this.product._id);
    },
    title() {
      return this.productList
        ? "Products from the same seller:"
        : "This Seller doesn't have any other shoes to sell";
    }
  },
  components: {
    Product,
    Products
  }
};
</script>
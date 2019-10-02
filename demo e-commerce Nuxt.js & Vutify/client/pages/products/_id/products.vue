<template>
  <v-container class="mt-2">
    <v-row>
      <v-col cols="12" sm="3" class="d-flex align-stretch">
        <ProductFilters
          v-on:updateCategory="updateCategory($event)"
          v-on:updateBrand="updateBrand($event)"
          v-on:updateSize="updateSize($event)"
          v-on:updatePrice="updatePrice($event)"
          v-on:updateCondition="updateCondition($event)"
          :list="updateAll"
        />
      </v-col>
      <v-col cols="12" sm="9">
        <Products :params="params" :list="updateAll" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Products from "@/components/products/Products";
import ProductFilters from "@/components/products/ProductFilters";

export default {
  async fetch({ route, store, error }) {
    const user = await store.getters["user"];
    if (user) await store.dispatch("loadLikedProducts");

    if (route.params.id) {
      let params = route.params.id;
      try {
        await store.dispatch("loadProducts", params);
      } catch (e) {
        console.error(e);
        return error({ status: 404 });
      }
    }
  },
  data() {
    return {
      ctfilter: "",
      brdFilter: "",
      cndtnFilter: "",
      szFilter: "",
      prcFilter: "",
      params: this.$route.params.id
    };
  },
  components: {
    Products,
    ProductFilters
  },

  computed: {
    products() {
      return this.$store.getters["products"];
    },
    user() {
      return this.$store.getters["user"];
    },
    categoryFilter() {
      if (!this.ctfilter) {
        return this.products;
      } else {
        return this.products.filter(prod => prod.category === this.ctfilter);
      }
    },
    SizeFilter() {
      if (!this.szFilter) {
        return this.categoryFilter;
      } else {
        return this.categoryFilter.filter(prod => prod.size === this.szFilter);
      }
    },
    brandFilter() {
      if (!this.brdFilter) {
        return this.SizeFilter;
      } else {
        return this.SizeFilter.filter(prod => prod.brand === this.brdFilter);
      }
    },

    ConditionFilter() {
      if (!this.cndtnFilter) {
        return this.brandFilter;
      } else {
        return this.brandFilter.filter(
          prod => prod.condition === this.cndtnFilter
        );
      }
    },
    updateAll() {
      if (!this.prcFilter) {
        return this.ConditionFilter;
      } else {
        return this.ConditionFilter.filter(
          prod => prod.price <= this.prcFilter
        );
      }
    }
  },
  methods: {
    updateCategory(cat) {
      this.ctfilter = cat;
    },
    updateBrand(brand) {
      this.brdFilter = brand;
    },
    updateSize(size) {
      this.szFilter = size;
    },
    updatePrice(price) {
      this.prcFilter = price;
    },
    updateCondition(cond) {
      this.cndtnFilter = cond;
    }
  }
};
</script>
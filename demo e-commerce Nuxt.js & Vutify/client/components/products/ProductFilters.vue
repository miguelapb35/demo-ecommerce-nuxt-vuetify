<template>
  <v-container>
    <h2 class="font-weight-light mb-2">Filters:</h2>
    <v-row>
      <v-col cols="12" class="py-0">
        <v-select
          solo-inverted
          chips
          label="Category"
          clearable
          v-model="ctModel"
          :items="filterListCategory"
          @change="$emit('updateCategory',ctModel)"
        ></v-select>
      </v-col>
      <v-col cols="12" class="py-0">
        <v-select
          solo-inverted
          label="Size"
          clearable
          v-model="szModel"
          :items="filterListSize"
          @change="$emit('updateSize',szModel)"
        ></v-select>
      </v-col>
      <v-col cols="12" class="py-0">
        <v-select
          solo
          label="Brand"
          clearable
          v-model="brdModel"
          :items="filterListBrand"
          @change="$emit('updateBrand',brdModel)"
        ></v-select>
      </v-col>
      <v-col cols="12" class="py-0">
        <v-select
          solo
          label="Condition"
          clearable
          v-model="cndtnModel"
          :items="filterlistCondition"
          @change="$emit('updateCondition',cndtnModel)"
        ></v-select>
      </v-col>
      <v-col cols="12" class="py-0">
        <v-subheader class="pl-0">Price</v-subheader>
        <v-slider
          v-model="prcModel"
          max="200"
          min="1"
          thumb-label="always"
          @change="$emit('updatePrice',prcModel)"
        ></v-slider>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import filters from "~/static/filters.json";
import _ from "lodash";

export default {
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      ctModel: "",
      brdModel: "",
      szModel: "",
      prcModel: 200,
      cndtnModel: "",
      listCategory: filters.category,
      listBrand: filters.brand,
      listSize: filters.size,
      listCondition: filters.condition
    };
  },
  components: {},
  computed: {
    filterListCategory() {
      let arrCat = this.list.map(prod => {
        return prod.category;
      });
      let uniqCatArr = [...new Set(arrCat)];
      return this.listCategory.filter(cat => uniqCatArr.includes(cat));
    },
    filterListBrand() {
      let arrBrand = this.list.map(prod => {
        return prod.brand;
      });
      let uniqBrandArr = [...new Set(arrBrand)];
      return this.listBrand.filter(brd => uniqBrandArr.includes(brd));
    },
    filterListSize() {
      let arrSize = this.list.map(prod => {
        return prod.size;
      });
      let uniqSizeArr = [...new Set(arrSize)];
      return this.listSize.filter(size => uniqSizeArr.includes(size));
    },
    filterlistCondition() {
      let arrCond = this.list.map(prod => {
        return prod.condition;
      });
      let uniqCondArr = [...new Set(arrCond)];
      return this.listCondition.filter(cnd => uniqCondArr.includes(cnd));
    }
  },
  methods: {}
};
</script>
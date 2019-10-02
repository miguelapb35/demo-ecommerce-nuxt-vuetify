<template>
    <v-row class="mt-3">
      <v-col cols="12" sm="6">
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title>
                <span class="headline">Buy your new shoes from {{product && product.seller && product.seller.userName}}</span>
              </v-card-title>

            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-img
                max-height="450px"
                :src="product.url"
                class="white--text"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              >
              <v-card-title>{{product.title}}</v-card-title>
              <v-card-text>brand {{product.brand}}</v-card-text>
              <v-card-text>size {{product.size}}</v-card-text>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" sm="6">
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title>Delivery Address</v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="editedItem.street"
                  required
                  label="Street:"
                ></v-text-field>

                <v-text-field
                  v-model="editedItem.city"
                  required
                  label="City:"
                ></v-text-field>

                <v-text-field
                  v-model="editedItem.postCode"
                  required
                  label="Post-code:"
                ></v-text-field>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-row>
                <v-col cols="4">
                  <v-subheader class="mb-0">Item Price</v-subheader>
                  <v-card-text>{{product.price}} €</v-card-text>
                </v-col>
                <v-col cols="4">
                  <v-subheader class="mb-0">Delivery Fees</v-subheader>
                  <v-card-text>Free</v-card-text>
                </v-col>
                <v-col cols="4">
                  <v-subheader class="mb-0">Total Price</v-subheader>
                  <v-card-text>{{product.price}} €</v-card-text>
                </v-col>
              </v-row>
            </v-card>
            <v-card-actions>
              <v-checkbox v-model="valid" label="I pay with magic"></v-checkbox>
              <v-spacer></v-spacer>
              <v-btn :disabled="!valid" color="blue darken-3" @click="$emit('updatedStatus',true)">
                PAY
                <v-icon small right>mdi-cart</v-icon>
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
</template>


<script>
export default {
  data() {
    return {
      valid: false,
      editedItem: {
        street: "",
        city: "",
        postCode: ""
      }
  }
  },
  components: {},
  computed: {
    user() {
      return this.$store.getters["user"];
    },
    product() {
      return this.$store.getters["product"];
    }
  },
  methods: {}
};
</script>
<template>
  <v-container>
    <v-form ref="form" v-model="valid">
      <v-row>
        <v-col cols="12" sm="6">
          <v-card class="my-3">
            <v-card-title>
              <span class="headline">Sell Your Shoes</span>
            </v-card-title>
            <v-card-text>
              <v-subheader>It's never been so easy to sell your shoes with "floes shoes"</v-subheader>
            </v-card-text>
          </v-card>
          <v-card>
            <v-img
              max-height="450px"
              :src="editedItem.url"
              class="white--text"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            ></v-img>
            <v-file-input
              show-size
              :rules="fileRules"
              accept="image/png, image/jpeg, image/jpg"
              placeholder="Pick an photo"
              prepend-icon="mdi-camera"
              label="photo"
              @change="onFileChange"
            ></v-file-input>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6">
          <v-card class="my-3">
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedItem.title"
                    required
                    :rules="titleRules"
                    label="Title"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedItem.description"
                    required
                    :rules="descriptionRules"
                    label="Description"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <v-card class="my-3">
            <v-card-text>
              <v-row>
                <v-col cols="6">
                  <v-select
                    v-model="editedItem.category"
                    :items="listCategory"
                    required
                    :rules="requiredRules"
                    label="Category"
                  ></v-select>
                </v-col>
                <v-col cols="6">
                  <v-select
                    v-model="editedItem.brand"
                    :items="listBrand"
                    required
                    :rules="requiredRules"
                    label="Brand"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-select
                    v-model="editedItem.size"
                    :items="listSize"
                    required
                    :rules="requiredRules"
                    label="Size"
                  ></v-select>
                </v-col>
                <v-col cols="6">
                  <v-select
                    v-model="editedItem.condition"
                    :items="listCondition"
                    reqired
                    :rules="requiredRules"
                    label="Condition"
                  ></v-select>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-card class="my-3">
            <v-row>
              <v-col cols="5">
                <v-subheader class="mb-0">Price</v-subheader>
                <v-slider v-model="editedItem.price" max="200" min="1" thumb-label="always"></v-slider>
              </v-col>
              <v-col cols="2">
                <v-text-field class="mt-5" v-model="editedItem.price"></v-text-field>
              </v-col>
              <v-col cols="5">
                <v-radio-group v-model="editedItem.gender" class="text-right d-flex justify-center">
                  <v-radio label="Women" value="women"></v-radio>
                  <v-radio label="Men" value="men"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-card>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!valid"
              color="blue darken-3"
              @click="$emit('editedItem', editedItem)"
            >
              Upload
              <v-icon small right>mdi-plus</v-icon>
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>


<script>
import filters from "~/static/filters.json";

export default {
  props: {
    editedItem: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      valid: false,
      fileRules: [
        v =>
          this.editedItem.url !==
            "https://myfilesflch0707.s3.eu-west-3.amazonaws.com/sneaker-305322_640.png" ||
          "enter a photo, photo should be less than 2mb!"
      ],
      titleRules: [
        v => !!v || "Title is required",
        v => (v && v.length <= 20) || "Name must be less than 20 characters"
      ],
      descriptionRules: [
        v => !!v || "Description is required",
        v => (v && v.length <= 60) || "Name must be less than 60 characters"
      ],
      requiredRules: [v => !!v || "field required"],
      listCategory: filters.category,
      listBrand: filters.brand,
      listSize: filters.size,
      listCondition: filters.condition
    };
  },

  methods: {
    onFileChange(file) {
      if (file !== null && file.size < 2000000) {
        this.$emit("updateFile", file);
        this.editedItem.url = URL.createObjectURL(file);
      } else {
        this.editedItem.url =
          "https://myfilesflch0707.s3.eu-west-3.amazonaws.com/sneaker-305322_640.png";
      }
      this.loading = false;
    }
  }
};
</script>
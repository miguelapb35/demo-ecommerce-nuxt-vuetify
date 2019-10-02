<template>
  <v-container class="my-5">
    <v-row justify="center">
      <v-col cols="12">
        <nuxt-link to="/auth/register">
          <v-btn>register</v-btn>
        </nuxt-link>
      </v-col>
      <v-col cols="12" sm="6">
        <Form :log="true" />
      </v-col>
    </v-row>
  </v-container>
</template> 


<script>
import Form from "@/components/auth/Form";
export default {
  components: {
    Form
  },

  data: () => {
    return {};
  }
};
</script>
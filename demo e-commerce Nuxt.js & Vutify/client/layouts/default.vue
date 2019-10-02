<template>
  <v-app>
    <ToolBar/>
    <v-container>
      <nuxt/>
    </v-container>
    <v-footer fixed>
      <small> Vue.js/ Nuxt.js / Vuetify </small> <v-spacer></v-spacer>
      <small>&copy; Florian Cheveau 2019 </small>
    </v-footer>
    
  </v-app>
</template>

<script>
import ToolBar from "@/components/navigation/ToolBar";

export default {
  components: {  ToolBar },

  data() {
    return {
      title: "Vuetify.js"
    };
  }
};
</script>

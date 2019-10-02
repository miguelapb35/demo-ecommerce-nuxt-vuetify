<template>
  <v-card>
    <v-toolbar>
      <v-card-title class="title font-weight-regula indigo--text">{{ formLabels.title }}</v-card-title>
      <div class="flex-grow-1"></div>
    </v-toolbar>
    <v-form ref="form" v-model="form" class="pa-4 pt-6">
      <v-text-field
        v-if="!log"
        v-model="auth.userName"
        filled
        :rules="requiredrules"
        label="Username"
        type="text"
      ></v-text-field>

      <v-text-field
        v-model="auth.email"
        filled
        :rules="emailRules"
        label="Email address"
        type="email"
      ></v-text-field>
      <v-text-field
        v-model="auth.password"
        filled
        color="deep-purple"
        :rules="requiredrules"
        label="Password"
        style="min-height: 96px"
        type="password"
      ></v-text-field>
      <v-alert class="space-between" v-model="alert" type="error">
        {{error}}
        <v-btn icon dark @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-alert>
      <v-checkbox v-model="agreement" :rules="requiredrules" color="deep-purple">
        <template v-slot:label>
          I agree to the&nbsp;
          <a href="#" @click.stop.prevent="dialog = true">Privacy Policy</a>*
        </template>
      </v-checkbox>
    </v-form>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn text @click="$refs.form.reset()">Clear</v-btn>
      <div class="flex-grow-1"></div>
      <v-btn
        :disabled="!form"
        :loading="isLoading"
        class="white--text"
        color="deep-purple accent-4"
        depressed
        @click="ValidateForm()"
      >Submit</v-btn>
    </v-card-actions>
    <v-dialog v-model="dialog" absolute max-width="400" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-3">Legal</v-card-title>
        <v-card-text>
          This website is for demonstration purposes only. You cannot buy or sell anything on this platform. None of your details will be used and no emails will be sent to you. Therefore you don't have to use a real email address.
          <br />
          <small>Cabinet Tissier & Mouskouri</small>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn
            class="white--text"
            color="deep-purple accent-4"
            @click="agreement = true, dialog = false"
          >Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>


<script>
export default {
  props: {
    log: Boolean
  },
  data: () => ({
    agreement: false,
    dialog: false,
    auth: {
      email: undefined,
      password: undefined,
      userName: undefined
    },
    form: false,
    isLoading: false,
    requiredrules: [v => !!v || "This field is required"],
    emailRules: [v => !!v || 'E-mail is required',v => /.+@.+\..+/.test(v) || 'E-mail must be valid']
  }),
  computed: {
    formLabels() {
      return this.log
        ? {
            title: "Sign in"
          }
        : {
            title: "Register"
          };
    },

    error() {
      return this.$store.getters["error"];
    },
    alert() {
      return this.error ? true : false;
    }
  },
  methods: {
    async ValidateForm() {
      this.log
        ? await this.$store.dispatch("login", this.auth)
        : await this.$store.dispatch("register", this.auth);
    },
    close() {
      this.$store.dispatch("error");
      this.$refs.form.reset();
    }
  }
};
</script>
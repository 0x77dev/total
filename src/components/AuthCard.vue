<template>
  <v-card :class="error ? 'animate__animated animate__bounce animate__shakeX' : ''">
    <v-tabs dark>
      <v-tab>Login / Email</v-tab>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-form>
              <v-text-field id="email" label="Email" name="login" v-model="email" type="email"></v-text-field>

              <v-text-field
                id="password"
                label="Password"
                name="password"
                v-model="password"
                type="password"
              ></v-text-field>
            </v-form>
            {{ errorMessage }}
          </v-card-text>
          <v-card-actions>
            <v-btn text color="secondary">Reset Password</v-btn>

            <v-spacer></v-spacer>

            <v-btn @click="emailLogin" text>Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>
<script lang="ts">
import Vue from "vue";
import firebase from "@/plugins/firebase";

export default Vue.extend({
  name: "LoginCard",
  data: () => ({
    errorMessage: "",
    email: "",
    password: "",
    error: false,
    loading: false,
  }),
  watch: {
    errorMessage(errorMessage) {
      if (errorMessage.length > 0) {
        setTimeout(() => (this.errorMessage = ""), 3000);
      }
    },
  },
  methods: {
    async emailLogin() {
      this.error = false;
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password);
        this.$router.replace("/home");
      } catch (error) {
        this.error = true;
        this.errorMessage = error.message;
      }
    },
  },
});
</script>

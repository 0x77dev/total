<template>
  <v-card :class="error ? 'animate__animated animate__bounce animate__shakeX' : ''">
    <v-tabs v-model="tab" dark>
      <v-tab>Login</v-tab>
      <v-spacer></v-spacer>
      <v-tab>Register</v-tab>

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
            <v-btn text @click="emailResetPassword" color="secondary">Reset Password</v-btn>

            <v-spacer></v-spacer>

            <v-btn @click="emailLogin" text>Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-form>
              <v-text-field
                id="fullname"
                label="Full Name"
                name="displayName"
                v-model="displayName"
                type="name"
              ></v-text-field>
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
            <div v-if="tab === 0">
              <v-btn text @click="emailResetPassword" color="secondary">Reset Password</v-btn>

              <v-spacer></v-spacer>

              <v-btn @click="emailLogin" text>Login</v-btn>
            </div>
            <div v-if="tab === 1">
              <v-spacer></v-spacer>

              <v-btn @click="emailRegister" text>Register</v-btn>
            </div>
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
    displayName: "",
    email: "",
    password: "",
    tab: 0,
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
    async emailRegister() {
      this.error = false;
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password);
        await firebase
          .auth()
          // @ts-ignore
          .updateCurrentUser({ displayName: this.displayName });
        this.$router.replace("/home");
      } catch (error) {
        this.error = true;
        this.errorMessage = error.message;
      }
    },
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
    async emailResetPassword() {
      this.error = false;
      try {
        await firebase.auth().sendPasswordResetEmail(this.email);
        this.errorMessage = "Link was sent to your email";
      } catch (error) {
        this.error = true;
        this.errorMessage = error.message;
      }
    },
  },
});
</script>

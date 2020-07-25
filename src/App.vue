<template>
  <v-app>
    <v-app-bar app dark class="elevation-0">
      <div class="d-flex align-center">
        <h2>Total</h2>
      </div>

      <v-spacer></v-spacer>
      {{user ? (user.displayName ? user.displayName : "") : ""}}
      <v-spacer></v-spacer>

      <v-btn v-if="user !== null" href="/#/home" icon>
        <v-icon>mdi-wallet</v-icon>
      </v-btn>
      <v-btn v-if="user !== null" href="/#/iam" icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn v-if="user !== null" @click="logOut" icon>
        <v-icon>mdi-exit-run</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import firebase from "firebase/app";
import "firebase/auth";

export default Vue.extend({
  name: "App",
  data: (): { user: firebase.User | null } => ({
    user: null,
  }),
  beforeMount() {
    this.user = firebase.auth().currentUser;
    if (this.user !== null) {
      this.$router.replace("/home");
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => (this.user = user));
  },
  methods: {
    async logOut() {
      await firebase.auth().signOut();
      this.$router.push("/auth");
    },
  },
});
</script>

<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <AuthCard />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script lang="ts">
import Vue from "vue";
// @ts-ignore
import AuthCard from "../components/AuthCard.vue";
import firebase from "firebase/app";
import "firebase/auth";

export default Vue.extend({
  name: "Auth",
  components: {
    AuthCard,
  },
  beforeMount() {
    if (firebase.auth().currentUser !== null) {
      this.$router.replace("/home");
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) this.$router.replace("/home");
    });
  },
});
</script>
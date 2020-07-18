<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <LoginCard />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script lang="ts">
import Vue from "vue";
// @ts-ignore
import LoginCard from "../components/LoginCard.vue";

export default Vue.extend({
  name: "Login",
  components: {
    LoginCard
  }
});
</script>
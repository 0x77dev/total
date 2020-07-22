<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h2>Total</h2>
      </div>

      <v-spacer></v-spacer>

      <v-btn href="/#/iam" icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

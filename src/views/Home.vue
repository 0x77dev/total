<template>
  <v-main>asd</v-main>
</template>

<script lang="ts">
import Vue from "vue";
import gql from "graphql-tag";

export default Vue.extend({
  // @ts-ignore
  apollo: {
    iam: gql`
      query {
        iam {
          uid
          displayName
          email
          phoneNumber
          emailVerified
          photoURL
          disabled
        }
      }
    `,
  },
});
</script>

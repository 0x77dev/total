<template>
  <v-main>
    <v-list two-line>
      <v-list-item-group active-class="gray--text">
        <template v-for="(item, index) in transactions">
          <v-list-item :key="item.id">
            <template>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
                <v-list-item-subtitle v-text="item.description"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text v-text="item.amount"></v-list-item-action-text>
                <v-list-item-action-text v-text="item.currency"></v-list-item-action-text>
              </v-list-item-action>
            </template>
          </v-list-item>

          <v-divider v-if="index + 1 < transactions.length" :key="index"></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </v-main>
</template>

<script lang="ts">
import Vue from "vue";
import gql from "graphql-tag";

export default Vue.extend({
  // @ts-ignore
  apollo: {
    transactions: gql`
      query {
        transactions {
          id
          title
          amount
          currency
          addedBy
          timestamp
        }
      }
    `
  },
  data: () => ({ transactions: [] })
});
</script>

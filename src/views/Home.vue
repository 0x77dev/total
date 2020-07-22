<template>
  <v-container>
    <v-data-iterator
      :items="transactions"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar
          :loading="$apollo.queries.transactions.loading"
          dark
          color="blue darken-3"
          class="mb-1"
        >
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              prepend-inner-icon="mdi-sort-variant"
              label="Sort by"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle v-model="sortDesc" mandatory>
              <v-btn large depressed color="blue" :value="false">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn large depressed color="blue" :value="true">
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">{{
                item.title
              }}</v-card-title>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title
                      >{{ item.amount / 100 }}
                      {{ item.currency }}</v-list-item-title
                    >
                    <v-list-item-subtitle>{{
                      item.description
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <span class="grey--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                text
                color="primary"
                class="ml-2"
                v-bind="attrs"
                v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span
            class="mr-4
            grey--text"
          >
            Page {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn
            text
            dark
            color="blue darken-3"
            class="mr-1"
            @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn text dark color="blue darken-3" class="ml-1" @click="nextPage">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
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
          description
          amount
          currency
          addedBy
          timestamp
        }
      }
    `,
  },
  data: () => ({
    itemsPerPageArray: [4, 8, 12],
    search: "",
    filter: {},
    sortDesc: false,
    page: 1,
    itemsPerPage: 12,
    sortBy: "name",
    keys: [
      "title",
      "description",
      "amount",
      "currency",
      "addedBy",
      "timestamp",
    ],
    transactions: [],
  }),
  computed: {
    numberOfPages() {
      return Math.ceil(this.transactions.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== `Name`);
    },
  },
  methods: {
    nextPage() {
      //@ts-ignore
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number: number) {
      this.itemsPerPage = number;
    },
  },
});
</script>

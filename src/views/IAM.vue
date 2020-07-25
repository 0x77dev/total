<template>
  <v-form>
    <v-container>
      <v-card :loading="$apollo.loading" max-width="344" class="mx-auto">
        <v-list-item v-if="!$apollo.loading">
          <v-list-item-content>
            <v-list-item-title class="headline">{{iam.displayName}}</v-list-item-title>
            <v-list-item-subtitle>{{iam.email}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-text v-if="!$apollo.loading">
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field v-model="iam.displayName" label="Full name"></v-text-field>
            </v-col>

            <v-col cols="12" md="12">
              <v-text-field v-model="iam.email" label="E-mail"></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field v-model="iam.phoneNumber" label="Phone Number"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="9">
              <v-text-field v-model="token" readonly label="API Token"></v-text-field>
            </v-col>
            <v-col cols="4" md="2">
              <v-flex x1 class="pt-3">
                <v-btn @click="generateToken" icon api>
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </v-flex>
              <v-flex x1 class="pt-2">
                <v-btn href="https://budget-0x77.web.app/graphql" target="_blank" icon api>
                  <v-icon>mdi-open-in-new</v-icon>
                </v-btn>
              </v-flex>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions v-if="!$apollo.loading">
          <v-spacer></v-spacer>
          <v-btn text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-form>
</template>
<script lang="ts">
import Vue from "vue";
import gql from "graphql-tag";
import firebase from "../plugins/firebase";

export default Vue.extend({
  // @ts-ignore
  apollo: {
    iam: gql`
      query {
        iam {
          displayName
          email
          phoneNumber
        }
      }
    `,
  },
  data: (): { token: undefined | string; iam: firebase.User | null } => ({
    token: undefined,
    iam: null,
  }),
  methods: {
    async generateToken(): Promise<void> {
      this.token = await firebase.auth().currentUser?.getIdToken(false);
    },
    async save(): Promise<void> {
      firebase.auth().updateCurrentUser(this.iam);
    },
  },
});
</script>

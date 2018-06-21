<template>
  <v-dialog width="350px" persistent v-model="registerDialog">
    <v-btn class="primary" right accent slot="activator">
      {{ userIsRegistered ? 'Unregister' : 'Register'}}
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title v-if="userIsRegistered">
              Unregister from Pages?
            </v-card-title>
            <v-card-title v-else>
              Register for pages?
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
           <v-card-text>
             You can always change your decision later on
           </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn
                class="red--text darken-1"
                flat
                @click="registerDialog = false">Cancel</v-btn>
              <v-btn
                class="green--text"
                flat
                @click="onAgree">Confirm</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>

      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['pageId'],
    data () {
      return {
        registerDialog: false
      }
    },
    computed: {
      userIsRegistered () {
        return this.$store.getters.user.registeredPages.findIndex(pageId => {
          return pageId === this.pageId
        }) >= 0
      }
    },
    methods: {
      onAgree () {
        if (this.userIsRegistered) {
          this.$store.dispatch('unregisterUserForPages', this.pageId)
        } else {
          this.$store.dispatch('registerUserForPages', this.pageId)
        }
      }
    }
  }
</script>

<style scoped>

</style>

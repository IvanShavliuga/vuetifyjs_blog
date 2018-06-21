<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate class="primary-text"
                             :width="7"
                             :size="70">
        </v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h4 class="primary--text">{{items.title}}</h4>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-pages-details :items="items"></app-edit-pages-details>
            </template>
          </v-card-title>
          <v-card-media
            :src="items.imageUrl" height="400px">
          </v-card-media>
          <v-card-text>
            <div class="info--text">{{items.date | date}}-{{items.location}}</div>
            <div>
              <app-edit-pages-date :items="items" v-if="userIsCreator"></app-edit-pages-date>
              <app-edit-pages-time :items="items" v-if="userIsCreator"></app-edit-pages-time>
            </div>
            <div>{{items.description}}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <app-page-register :pageId="items.id"></app-page-register>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      items () {
        return this.$store.getters.loaderPage(this.id)
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userIsCreator () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.id === this.items.createrId
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>

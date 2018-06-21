<template>
    <v-dialog width="350px" persistent v-model="editDialog">
      <v-btn fab accent slot="activator">
        <v-icon>edit</v-icon>
      </v-btn>
      <v-card>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-title>
                Edit Page
              </v-card-title>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-text>
                <v-text-field
                  name="title"
                  label="Title"
                  v-model="editTitle"
                  id="title"
                  required
                ></v-text-field>
                <v-text-field
                  name="description"
                  label="Description"
                  id="description"
                  v-model="editDescription"
                  multi-line
                  required
                ></v-text-field>
              </v-card-text>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-actions>
                <v-btn flat
                       class="blue--text darken-1"
                       @click="editDialog = false">Close</v-btn>
                <v-btn flat
                       class="blue--text darken-1"
                       @click="onSave">Save</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
</template>

<script>
  export default {
    props: ['items'],
    data () {
      return {
        editDialog: false,
        editTitle: this.items.title,
        editDescription: this.items.description
      }
    },
    methods: {
      onSave () {
        if (this.editTitle.trim() === '' || this.editDescription.trim() === '') {
          return
        }
        this.editDialog = false
        this.$store.dispatch('updatePageData', {
          id: this.items.id,
          title: this.editTitle,
          description: this.editDescription

        })
      }
    }
  }
</script>
<style scoped>
</style>

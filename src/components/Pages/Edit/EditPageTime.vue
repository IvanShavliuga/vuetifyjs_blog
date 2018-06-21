<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn accent slot="activator">
      Edit Time
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>
              Edit Page Time
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-time-picker v-model="editableTime" style="width: 100%" actions format="24hr">
              <v-flex>
                <v-btn
                  class="blue--text darker-1"
                  flat
                  @click.native="editDialog = false"
                > Close </v-btn>
                <v-btn
                  class="blue--text darker-1"
                  flat
                  @click.native="onSave"
                > Accept </v-btn>
              </v-flex>
            </v-time-picker>
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
        editableTime: null
      }
    },
    methods: {
      onSave () {
        const newDate = new Date(this.items.date)
        const hours = this.editableTime.match(/^(\d+)/)[1]
        const minutes = this.editableTime.match(/:(\d+)/)[1]
        newDate.setHours(hours)
        newDate.setMinutes(minutes)
        this.$store.dispatch('updatePageData', {
          id: this.items.id,
          date: newDate
        })
      }
    },
    created () {
      const date = new Date(this.items.date)
      const hour = date.getHours()
      const minute = date.getMinutes()
      this.editableTime = hour + ':' + minute
    }
  }
</script>

<style scoped>

</style>

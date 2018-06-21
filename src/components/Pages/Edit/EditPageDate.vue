<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn accent slot="activator">
      Edit Date
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>
              Edit Page Date
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-date-picker v-model="editableDate" style="width: 100%" actions>
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
            </v-date-picker>
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
        const newDay = new Date(this.editableTime).getUTCDate()
        const newMonth = new Date(this.editableTime).getUTCMonth()
        const newYear = new Date(this.editableTime).getUTCFullYear()
        newDate.setUTCDate(newDay)
        newDate.setUTCMonth(newMonth)
        newDate.setUTCFullYear(newYear)
        this.$store.dispatch('updatePageData', {
          id: this.items.id,
          date: newDate
        })
      }
    },
    computed: {
      submittableDateTime () {
        let date = new Date(this.date)
        if (typeof this.editableTime === 'string') {
          const hours = this.editableTime.match(/^(\d+)/)[1]
          const minutes = this.editableTime.match(/:(\d+)/)[1]
          date.setHours(hours)
          date.setMinutes(minutes)
        } else {
          date.setHours(this.editableTime.getHours())
          date.setMinutes(this.editableTime.getMinutes())
        }
        return date
      }
    },
    created () {
      var formattedDate = new Date(this.items.date).toISOString().slice(0, 10)
      this.editableDate = formattedDate
    }
  }
</script>

<style scoped>

</style>

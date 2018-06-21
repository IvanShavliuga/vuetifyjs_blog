<template>
  <v-alert @input="onClose" :value="true" type="error" error dismissible>
    {{text}}
  </v-alert>
</template>
<script>
  export default {
    props: ['text'],
    methods: {
      onClose () {
        this.$emit('dismissed')
      }
    }
  }
</script>

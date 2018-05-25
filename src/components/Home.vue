<template>
	<v-container >
	<v-layout  row wrap >
		<v-flex xs12 sm6 class="text-xs-center text-sm-right">
			<v-btn large router to="/page" class="info">Explore Pages</v-btn>
			</v-flex>
			<v-flex xs12 sm6 class="text-xs-center text-sm-left">
			<v-btn large router to="/page/new" class="info">Organize Pages</v-btn>
		</v-flex>
	</v-layout>
	<v-layout  row wrap align-center justify-center class="mt-2">
		<v-flex xs6>
			<v-carousel style="cursor: pointer;">
    <v-carousel-item v-for="item in items" 
    :src="item.src" 
    :key="item.id"
    @click.native="onLoadPage(item.id)">
    	
    </v-carousel-item>
  </v-carousel>
		</v-flex>
	</v-layout>
	<v-layout  row wrap class="mt-2">
		<v-flex xs12 align-end class="text-xs-center">
			<p>Join our awesome pages!</p>
		</v-flex>
	</v-layout>
</v-container>
</template>
<script>
  export default {
   computed: {
      items() {
        return this.$store.getters.featurePages
      }
    },  
    methods: {
      onLoadPage (id) {
        this.$router.push('/page/' + id)
      }

    }
  }
</script>
<style>
</style>
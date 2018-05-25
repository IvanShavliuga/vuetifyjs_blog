<template>
	<v-container>
		<v-layout row wrap>
			<v-flex xs12>
				<v-card>
					<v-card-title>
						<h4 class="primary--text">{{items.title}}</h4>
					</v-card-title>
					<v-card-media 
					:src="items.src" height="400px">
					</v-card-media>
					<v-card-text>
						<div class="info--text">{{items.date}}Located two hours south of Sydney</div>
						<div>Located two hours south of Sydney in the
							Southern Highlands of New South Wales</div>
					</v-card-text>
					<v-card-actions  class="text-xs-center ">
          	<v-btn flat color="primary" to="" >
          		<v-icon left ligt>arrow_forward</v-icon>
          		View page
          	</v-btn>
        	</v-card-actions>
				</v-card>
			</v-flex>	
		</v-layout>	
	</v-container>
</template>

<script>
	export default{
		props: ['id'],
		 computed: {
      items() {
        return this.$store.getters.loaderPage(this.id)
      }
    }

	}
</script>
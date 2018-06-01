<template>
	<v-container>
		<v-layout row >
		  <v-flex xs12 sm6 offset-sm3>
		    <h2>Create new Page</h2>
		  </v-flex>
		</v-layout>
		<v-layout row >
		  <v-flex xs12>
		  	<v-form @submit.prevent="onCreatePages">
		  		<v-layout row >
		  		  <v-flex xs12 sm6 offset-sm3>
		  		  	<v-text-field
		  		  	  name="title"
		  		  	  label="Title"
		  		  	  id="title"
		  		  	  v-model="title"
		  		  	  required
		  		  	></v-text-field>
		  		    
		  		  </v-flex>
		  		</v-layout>
		  		<v-layout row >
		  		  <v-flex xs12 sm6 offset-sm3>
		  		  	<v-text-field
		  		  	  name="location"
		  		  	  label="Location"
		  		  	  id="location"
		  		  	  v-model="location"
		  		  	  required
		  		  	></v-text-field>
		  		    
		  		  </v-flex>
		  		</v-layout>
		  		<v-layout row >
		  		  <v-flex xs12 sm6 offset-sm3>
		  		  	<v-text-field
		  		  	  name="imageUrl"
		  		  	  label="Image Url"
		  		  	  id="imageUrl"
		  		  	  v-model="imageUrl"
		  		  	  required
		  		  	></v-text-field>
		  		    
		  		  </v-flex>
		  		</v-layout>
		  		<v-layout row >
		  		  <v-flex xs12 sm6 offset-sm3 >
		  		  	<img :src="imageUrl" height="150">
		  		    
		  		  </v-flex>
		  		</v-layout>
		  		<v-layout row >
		  		  <v-flex xs12 sm6 offset-sm3>
		  		  	<v-text-field
		  		  	  name="description"
		  		  	  label="Description"
		  		  	  id="description"
		  		  	  v-model="description"
		  		  	  multi-line
		  		  	  required
		  		  	></v-text-field>
		  		    
		  		  </v-flex>
		  		</v-layout>

		  		<v-layout row>
		  			<v-flex xs12 sm6 offset-sm3>
		  				<h4>Choose a Date and Time</h4>
    				</v-flex> 
		  		</v-layout>
		  		<v-layout row class="mb-3">
		  			<v-flex xs12 sm6 offset-sm3>
      				<v-date-picker v-model="date" color="green lighten-1" header-color="primary"></v-date-picker>
    				</v-flex> 
		  		</v-layout>
		  		<v-layout row>
		  			<v-flex  >
      				<v-time-picker v-model="time" color="green lighten-1" format="24hr" header-color="primary"></v-time-picker>
    				</v-flex> 
		  		</v-layout>

		  		<v-layout row >
		  		  <v-flex xs12 sm6 offset-sm3>
		  		  	<v-btn 
		  		  	class="primary" 
		  		  	:disabled="!formIsValid"
		  		  	type="submit"
		  		  	>
		  		  	Create
		  		  </v-btn>
		  		  </v-flex>
		  		</v-layout>


		  	  
		  	</v-form>
		    
		  </v-flex>
		</v-layout>
	</v-container>
</template>    

<script>
export default{
		data: () => ({
				title: '',
				location: '',
				imageUrl: '',
				description: '',
				date: null,
				time: null
			
		}),
		computed: {
			formIsValid () {
				return this.title !== '' && 
				this.location !== '' && 
				this.imageUrl !== '' && 
				this.description !== '' 

			},
			subDate(){
				const date = new Date(this.date)
				if(typeof this.time === 'string'){
					let hours = this.time.match(/^(\d+)/)[1]
					const minutes = this.time.match(/:(\d+)/)[1]
					date.setHours(hours)
					date.setMinutes(minutes)
				}else{
					date.setHours(this.time.getHours())
					date.setMinutes(this.time.getMinutes())
				}
				
				return date
			}
		},
		methods:{
			onCreatePages(){
				if(!this.formIsValid){
					return
				}
				const pagesData = {
					title: this.title,
					location: this.location,
					src: this.imageUrl,
					description: this.description,
					date: this.subDate
				}
				this.$store.dispatch('createPage', pagesData)
				this.$router.push('/page')
			}
		}

	}
</script>                                                                                                                                                                             
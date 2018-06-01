<template>
	<v-container>
		<v-layout row wrap>
			<v-flex xs12 sm6 offset-sm3>
				<v-card>
				  <v-card-text>
				  	<v-container>
				  	  <v-form @submit.prevent="onSignup">
				  	    <v-layout row wrap>
				  	      <v-flex xs12>
				  	      	<v-text-field
				  	      	  name="email"
				  	      	  label="Mail"
				  	      	  id="email"
				  	      	  v-model="email"
				  	      	  type="email"
				  	      	  required
				  	      	></v-text-field>
				  	      </v-flex>
				  	    </v-layout>
				  	    <v-layout row wrap>
				  	      <v-flex xs12>
				  	      	<v-text-field
				  	      	  name="password"
				  	      	  label="Password"
				  	      	  id="password"
				  	      	  v-model="password"
				  	      	  type="password"
				  	      	  required
				  	      	></v-text-field>
				  	      </v-flex>
				  	    </v-layout>
				  	    <v-layout row wrap>
				  	      <v-flex xs12>
				  	      	<v-text-field
				  	      	  name="confPassword"
				  	      	  label="Confirm Password"
				  	      	  id="confPassword"
				  	      	  v-model="confPassword"
				  	      	  type="confPassword"
				  	      	  :rules="[comparePass]"
				  	      	></v-text-field>
				  	      </v-flex>
				  	    </v-layout>
				  	    <v-layout row wrap>
				  	      <v-flex xs12>
				  	      	<v-btn type="submit" color="success">Sign Up</v-btn>
				  	        
				  	      </v-flex>
				  	    </v-layout>
				  	  </v-form>
				  	</v-container>
				    
				  </v-card-text>
				</v-card>
			  
			</v-flex>
		  
		</v-layout>
	</v-container>
</template>

<script>
	export default{
	data () {
      return {
        email: '',
        password: '',
        confPassword: ''
      }
    },
		computed:{
			comparePass(){
				return this.password !== this.confPassword ? 'Password do not match':''
			}
		},
		methods: {
			onSignup (){
				this.$store.dispatch('singUserUp', {email: this.email, password:this.password})

			}
		}

	}
</script>
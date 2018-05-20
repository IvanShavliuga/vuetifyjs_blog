<template>
	<v-container>
		<v-layout row flex>
			<v-flex xs12 sm10 md8 offset-sm1 offset-md2>
				<v-card class="primary">
					<v-container >
						<v-layout>
							<v-flex xs5 sm4 md3>
								<v-card-media src="https://vuetifyjs.com/static/doc-images/carousel/squirrel.jpg" height="200px">
									
								</v-card-media>
							</v-flex>

							<v-flex xs7 sm8 md9>
								<v-card-title primary-title>
          					<div>
            						<h3 class="headline white--text mb-0">Kangaroo Valley Safari</h3>
            						<div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
          					</div>
        				</v-card-title>
        				<v-card-actions  class="text-xs-center ">
          					<v-btn flat color="white--text " to="/page/1" >
          						<v-icon left ligt>arrow_forward</v-icon>
          					View page
          				</v-btn>
        				</v-card-actions>
							</v-flex>
						</v-layout>
					</v-container>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>
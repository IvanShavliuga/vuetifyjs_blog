import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'


Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
	loaderPages:[
          {
            src: 'https://vuetifyjs.com/static/doc-images/carousel/squirrel.jpg', 
            id: '1',
            date: new Date(),
            location: 'fors',
            description: 'Lorem',
            title: "Title 1"
          },
          {
            src: 'https://vuetifyjs.com/static/doc-images/carousel/sky.jpg', 
            id: 'sdgsdsd',
            date: new Date(),
            location: 'fors',
            description: 'Lorem',
            title: "Title 2"
          },
          {
            src: 'https://vuetifyjs.com/static/doc-images/carousel/bird.jpg', 
            id: 'rerghafdh',
            date: new Date(),
            location: 'fors',
            description: 'Lorem',
            title: "Title 3"
          },
          {
            src: 'https://vuetifyjs.com/static/doc-images/carousel/planet.jpg', 
            id: 'xhkjlkjkj',
            date: new Date(),
            location: 'fors',
            description: 'Lorem',
            title: "Title 4"
          }
        ],
        user: {
        id: 'safasfadfas12',
        registeredPages: [
        '1'
        ]
      }
},
	mutations: {
		createPage(state, payload){
			state.loaderPages.push(payload)
		},
		setUser(state,payload){
			state.user = payload
		}
	},
	actions: {
		createPage({commit}, payload){
			const page = {
				title: payload.title,
				location: payload.location,
				src: payload.src,
				description: payload.description,
				date: payload.date,
				id: 'xhjhjh'
			}
			commit ('createPage', page)
		},
		singUserUp({commit}, payload){
		firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password )
				.then(
					user => {
						const newUser = {
							id: user.uid,
							registeredPages: []
						}
						commit('setUser', newUser)

					}
					)
				.catch(
					error =>{
						console.log(error)
					})
		}

	},
	getters: {
		loaderPages(state){
			return state.loaderPages.sort((pageA, pageB) =>{
				return pageA.date > pageB.date
			})
		},
		featurePages(state,getters){
			return getters.loaderPages.slice(0, 5)
		},
		loaderPage(state){
			return (pageId) =>{
				return state.loaderPages.find((page) => {
					return page.id === pageId
				})
			}
		}
	}
})


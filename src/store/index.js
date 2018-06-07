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
        user: null,
        loading: false,
        error: null
},
	mutations: {
		setLoaderPages (state,payload){
			state.loaderPages = payload
		},
		createPage(state, payload){
			state.loaderPages.push(payload)
		},
		setUser(state,payload){
			state.user = payload
		},
		setLoading(state, payload){
			state.loading = payload
		},
		setError(state, payload){
			state.error = payload
		},
		clearError(state){
			state.error = null
		}
	},
	actions: {
		loadPages({commit}){
			commit('setLoading', true)
			firebase.database().ref('pages').once('value')
			.then((data) => {
				const pages = []
				const obj = data.val()
				for(let key in obj){
					pages.push({
						id: key,
						title: obj[key].title,
						description: obj[key].description,
						imageUrl: obj[key].imageUrl,
						date: obj[key].date,
						location: obj[key].location,
						createrId: obj[key].createrId
					})
				}
				commit('setLoaderPages', pages)
				commit('setLoading', false)
			})
			.catch((error) => {
				console.log(error)
				commit('setLoading', true)
			})

		},
		createPage({commit, getters}, payload){
			const page = {
				title: payload.title,
				location: payload.location,
				description: payload.description,
				date: payload.date.toISOString(),
				createrId: getters.user.id
			}
			let imageUrl
			let key
			firebase.database().ref('pages').push(page)
			.then((data) => {
				key = data.key
				return key
			})
			.then(key => {
				const filename = payload.image.name
				const ext = filename.slice(filename.lastIndexOf('.'))
				return firebase.storage().ref('pages/'+key+ext).put(payload.image)
			})
			.then(fileData =>{
				console.log(fileData.metadata)
					imageUrl = fileData.metadata.fullPath
					console.log(fileData.metadata)
					return firebase.database().ref('pages').child(key).update({
						imageUrl: imageUrl
					})
			})
			.then(() =>{
				commit ('createPage', {
					...page,
					imageUrl: imageUrl,
					id: key
				})
			})
			.catch((error) => {
				console.log(error)
			})
			
		},
		singUserUp({commit}, payload){
			commit('setLoading', true)
			commit('clearError')
		firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password )
				.then(
					user => {
						commit('setLoading', false)
						const newUser = {
							id: user.uid,
							registeredPages: []
						}
						commit('setUser', newUser)

					}
					)
				.catch(
					error =>{
						commit('setLoading', false)
						commit('setError', error)
						console.log(error)
					})
		},
		singUserIn({commit}, payload){
			commit('setLoading', true)
			commit('clearError')
			firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
			.then(
				user => {
					commit('setLoading', false)
					const newUser = {
							id: user.uid,
							registeredPages: []
						}
						commit('setUser', newUser)
				}
				)
			.catch(
				error =>{
					commit('setLoading', false)
					commit('setError', error)
					console.log(error)
				}
				)
		},
		autoSignIn ({commit}, payload) {
				commit('setUser', {id: payload.uid, registeredPages: []})
		},
		logout({commit}){
			firebase.auth().signOut()
			commit('setUser', null)

		},
		clearError ({commit}) {
			commit('clearError')
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
		},
		user (state) {
			return state.user
		},
		loading (state) {
			return state.loading
	},
		error (state) {
			return state.error
	}
}
})


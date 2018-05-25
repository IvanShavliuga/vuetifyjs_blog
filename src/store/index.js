import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
	loaderPages:[
          {
            src: 'https://vuetifyjs.com/static/doc-images/carousel/squirrel.jpg', 
            id: '1',
            date: '10-12-18',
            location: 'fors',
            description: 'Lorem',
            title: "Title 1"
          },
          {
            src: 'https://vuetifyjs.com/static/doc-images/carousel/sky.jpg', 
            id: 'sdgsdsd',
            date: '11-12-18',
            location: 'fors',
            description: 'Lorem',
            title: "Title 2"
          },
          {
            src: 'https://vuetifyjs.com/static/doc-images/carousel/bird.jpg', 
            id: 'rerghafdh',
            date: '12-12-18',
            location: 'fors',
            description: 'Lorem',
            title: "Title 3"
          },
          {
            src: 'https://vuetifyjs.com/static/doc-images/carousel/planet.jpg', 
            id: 'xhkjlkjkj',
            date: '13-12-18',
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
				id: 'xhkjlkjkj'
			}
			commit ('createPage', page)
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


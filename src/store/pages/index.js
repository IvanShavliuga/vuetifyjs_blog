import * as firebase from 'firebase'

export default {
  state: {
    loaderPages: [
      {
        src: 'https://vuetifyjs.com/static/doc-images/carousel/squirrel.jpg',
        id: '1',
        date: new Date(),
        location: 'fors',
        description: 'Lorem',
        title: 'Title 1'
      },
      {
        src: 'https://vuetifyjs.com/static/doc-images/carousel/sky.jpg',
        id: 'sdgsdsd',
        date: new Date(),
        location: 'fors',
        description: 'Lorem',
        title: 'Title 2'
      },
      {
        src: 'https://vuetifyjs.com/static/doc-images/carousel/bird.jpg',
        id: 'rerghafdh',
        date: new Date(),
        location: 'fors',
        description: 'Lorem',
        title: 'Title 3'
      },
      {
        src: 'https://vuetifyjs.com/static/doc-images/carousel/planet.jpg',
        id: 'xhkjlkjkj',
        date: new Date(),
        location: 'fors',
        description: 'Lorem',
        title: 'Title 4'
      }
    ]
  },
  mutations: {
    setLoaderPages (state, payload) {
      state.loaderPages = payload
    },
    createPage (state, payload) {
      state.loaderPages.push(payload)
    },
    updatePage (state, payload) {
      const pages = state.loaderPages.find(pages => {
        return pages.id === payload.id
      })
      if (payload.title) {
        pages.title = payload.title
      }
      if (payload.description) {
        pages.description = payload.description
      }
      if (payload.date) {
        pages.date = payload.date
      }
    }
  },
  actions: {
    loadPages ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('pages').once('value')
        .then((data) => {
          const pages = []
          const obj = data.val()
          for (let key in obj) {
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
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    createPage ({commit, getters}, payload) {
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
          return firebase.storage().ref('pages/' + key + ext).put(payload.image)
        })
        .then(fileData => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          firebase.storage().ref().child('pages/' + key + ext).getDownloadURL().then(function (url) {
            return firebase.database().ref('pages').child(key).update({
              imageUrl: url
            })
          })
        })
        .then(() => {
          commit('createPage', {
            ...page,
            imageUrl: imageUrl,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updatePageData ({commit}, payload) {
      commit('setLoading', true)
      const uploadeObj = {}
      if (payload.title) {
        uploadeObj.title = payload.title
      }
      if (payload.description) {
        uploadeObj.description = payload.description
      }
      if (payload.date) {
        uploadeObj.date = payload.date
      }
      firebase.database().ref('pages').child(payload.id).update(uploadeObj)
        .then(() => {
          commit('setLoading', false)
          commit('updatePage', payload)
        })
        .catch((error) => {
          console.log(error)
          commit('setLoading', false)
        })
    }
  },
  getters: {
    loaderPages (state) {
      return state.loaderPages.sort((pageA, pageB) => {
        return pageA.date > pageB.date
      })
    },
    featurePages (state, getters) {
      return getters.loaderPages.slice(0, 5)
    },
    loaderPage (state) {
      return (pageId) => {
        return state.loaderPages.find((page) => {
          return page.id === pageId
        })
      }
    }
  }
}

import * as firebase from 'firebase'

export default {
  state: {
    user: null
  },
  mutations: {
    registerUserForPages (state, payload) {
      const id = payload.id
      if (state.user.registeredPages.findIndex(pages => pages.id === id) >= 0) {
        return
      }
      state.user.registeredPages.push(id)
      state.user.fbKeys[id] = payload.fbKey
    },
    registerUserFromPages (state, payload) {
      const registeredPages = state.user.registeredPages
      registeredPages.splice(registeredPages.findIndex(pages => pages.id === payload), 1)
      Reflect.defineProperty(state.user.fbKeys, payload)
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    registerUserForPages ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      firebase.database().ref('/users/' + user.id).child(('/registrations/'))
        .push(payload)
        .then(data => {
          commit('setLoading', false)
          commit('registerUserForPages', {id: payload, fbKey: data.key})
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    unregisterUserForPages ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      if (!user.fbKeys) {
        return
      }
      const fbKey = user.fbKeys[payload]
      firebase.database().ref('/users/' + user.id + '/registrations').child((fbKey))
        .remove()
        .then(() => {
          commit('setLoading', false)
          commit('unregisterUserForPages', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    singUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredPages: [],
              fbKeys: {}
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          })
    },
    singUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredPages: [],
              fbKeys: {}
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {
        id: payload.uid,
        registeredPages: [],
        fbKeys: {}
      })
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
}

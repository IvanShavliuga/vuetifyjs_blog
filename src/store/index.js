import Vue from 'vue'
import Vuex from 'vuex'
import pages from './pages'
import user from './user'
import shared from './shared'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    pages: pages,
    user: user,
    shared: shared
  }
})

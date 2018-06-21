// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from './store/index.js'
import * as firebase from 'firebase'
import DateFilter from './filters/date.js'
import AlertCmp from './components/Shared/Alert.vue'
import EditPageDetails from './components/Pages/Edit/EditPageDetails.vue'
import EditPageDate from './components/Pages/Edit/EditPageDate.vue'
import EditPageTime from './components/Pages/Edit/EditPageTime.vue'
import RegisterDialog from './components/Pages/Registration/RegisterDialog.vue'
import './stylus/main.styl'
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VCarousel,
  VCard,
  VForm,
  VTextField,
  VDatePicker,
  VTimePicker,
  VAlert,
  VProgressCircular,
  VDivider,
  VDialog,
  transitions
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VCarousel,
    VCard,
    VForm,
    VTextField,
    VDatePicker,
    VTimePicker,
    VAlert,
    VProgressCircular,
    VDivider,
    VDialog,
    transitions
  },
  theme: {
    primary: '#FF5722',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

Vue.config.productionTip = false
Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-pages-details', EditPageDetails)
Vue.component('app-edit-pages-date', EditPageDate)
Vue.component('app-edit-pages-time', EditPageTime)
Vue.component('app-page-register', RegisterDialog)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyAH-2nTWol3i4W_JOV5oozm8ReKPBxDYf8',
      authDomain: 'vuejs-c67a5.firebaseapp.com',
      databaseURL: 'https://vuejs-c67a5.firebaseio.com',
      projectId: 'vuejs-c67a5',
      storageBucket: 'gs://vuejs-c67a5.appspot.com'

    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })

    this.$store.dispatch('loadPages')
  },
  template: '<App/>'
})

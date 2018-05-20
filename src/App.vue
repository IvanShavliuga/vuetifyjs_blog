<template>
  <v-app>
    <v-navigation-drawer app temporary v-model="sideNav">
      <v-list>
        <v-list-tile 
        v-for="item in menuItems" 
        :key="item.title"
        router
        :to="item.link">
          <v-list-tile-action>
            <v-icon >{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{item.title}}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app dark  class="primary">
     <v-toolbar-side-icon @click='sideNav=!sideNav'
     class="hidden-sm-and-up" ></v-toolbar-side-icon>

     <v-toolbar-title>
      <router-link to="/" style="cursor: pointer" tag="span">Title</router-link></v-toolbar-title>

     <v-spacer></v-spacer>
     <v-toolbar-items class="hidden-xs-only">
      <v-btn flat 
      v-for="item in menuItems" 
      :key="item.title"
      router
        :to="item.link">
        <v-icon left>{{item.icon}}</v-icon>
      {{item.title}}
    </v-btn>
    </v-toolbar-items>
  </v-toolbar>
  <main>
    <v-content> 
      <router-view></router-view>
</v-content>
  </main>

</v-app>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false,
      menuItems: [
      {icon: 'supervisor_account', title: 'Link One', link: '/page'},
      {icon: 'room', title: 'Link Two', link: '/page/new'},
      {icon: 'person', title: 'Link Three', link: '/profile'},
      {icon: 'face', title: 'Link Four', link: '/sigup'},
      {icon: 'lock_open', title: 'Link Five', link: '/sigin'}

      ]
    }
  }
}
</script>

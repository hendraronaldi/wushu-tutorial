<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :loggedAs="loggedAs"
      :background-color="sidebarBackground"
      short-title="Argon"
      title="Argon"
    >
      <template slot="links">
        
        <sidebar-item :link="{name: 'Dashboard', icon: 'ni ni-tv-2 text-primary', path: '/dashboard'}"/>
        <sidebar-item :link="{name: 'Courses', icon: 'ni ni-hat-3 text-success', path: '/courses'}"/>
        <sidebar-item :link="{name: 'User Profile', icon: 'ni ni-single-02 text-yellow', path: '/profile'}"/>

      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar
        :loggedAs="loggedAs"
      ></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapState} from 'vuex';
  import DashboardNavbar from './DashboardNavbar.vue';
  import ContentFooter from './ContentFooter.vue';
  import { FadeTransition } from 'vue2-transitions';

  export default {
    components: {
      DashboardNavbar,
      ContentFooter,
      FadeTransition
    },
    data() {
      return {
        loggedAs: this.$store.state.userProfile,
        sidebarBackground: 'vue' //vue|blue|orange|green|red|primary
      };
    },
    computed: {
      ...mapGetters([
        'currentUser'
      ]),
      ...mapState([
        'userProfile'
      ])
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      }
    }
  };
</script>
<style lang="scss">
</style>

<template>
    <nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white" id="sidenav-main">
        <div class="container-fluid">

            <!--Toggler-->
            <navbar-toggle-button @click.native="showSidebar">
                <span class="navbar-toggler-icon"></span>
            </navbar-toggle-button>
            <router-link class="navbar-brand" to="/">
                <img :src="logo" class="navbar-brand-img" alt="...">
            </router-link>

            <slot name="mobile-right">
                <ul class="nav align-items-center d-md-none">
                    <base-dropdown class="nav-item" position="right">
                        <a slot="title" class="nav-link" href="#" role="button">
                            <div class="media align-items-center">
                              <span class="avatar avatar-sm rounded-circle">
                                <img v-if="loggedAs.Avatar" alt="Image placeholder" :src="loggedAs.Avatar">
                                <img v-else alt="Image placeholder" src="img/theme/default-profile.jpg">
                              </span>
                            </div>
                        </a>

                        <div class=" dropdown-header noti-title">
                            <h6 class="text-overflow m-0">Welcome!</h6>
                        </div>
                        <div class="dropdown-divider"></div>
                        <button v-if="loggedAs.Name == 'Admin'" @click="adminLogout" class="dropdown-item">
                            <i class="ni ni-user-run"></i>
                            <span>Logout</span>
                        </button>
                        <button v-else @click="logout" class="dropdown-item">
                            <i class="ni ni-user-run"></i>
                            <span>Logout</span>
                        </button>
                    </base-dropdown>
                </ul>
            </slot>
            <slot></slot>
            <div v-show="$sidebar.showSidebar" class="navbar-collapse collapse show" id="sidenav-collapse-main">

                <div class="navbar-collapse-header d-md-none">
                    <div class="row">
                        <div class="col-6 collapse-brand">
                            <router-link to="/">
                                <img :src="logo">
                            </router-link>
                        </div>
                        <div class="col-6 collapse-close">
                            <navbar-toggle-button @click.native="closeSidebar"></navbar-toggle-button>
                        </div>
                    </div>
                </div>

                <ul class="navbar-nav">
                    <slot name="links">
                    </slot>
                </ul>
            </div>
            </div>
    </nav>
</template>
<script>
  import {mapActions} from 'vuex';
  import NavbarToggleButton from '@/components/NavbarToggleButton'

  export default {
    name: 'sidebar',
    components: {
      NavbarToggleButton
    },
    props: {
      loggedAs: Object,
      logo: {
        type: String,
        default: 'img/brand/logoTP.jpg',
        description: 'Sidebar app logo'
      },
      autoClose: {
        type: Boolean,
        default: true,
        description: 'Whether sidebar should autoclose on mobile when clicking an item'
      }
    },
    provide() {
      return {
        autoClose: this.autoClose
      };
    },
    methods: mapActions(
      {
        closeSidebar(dispatch) {
          this.$sidebar.displaySidebar(false)
        },
        showSidebar(dispatch) {
          this.$sidebar.displaySidebar(true)
        },
        logout(dispatch){
          const {userProfile} = this.$store.state;
          // this.isFetching = true;
          dispatch('logout', {userProfile})
          .then((response) => {
            this.$router.push("/")
          })
          .catch(error => {
            // this.fail = true;
          })
          .finally(() => {
            // if(this.fail) {
            //   setTimeout(function(){
            //     this.fail = false;
            //   }, 3000);
            // }

            // this.isFetching = false;
          })
        },
        adminLogout(dispatch){
          const {admin} = this.$store.state;
          // this.isFetching = true;
          dispatch('adminLogout', {admin})
          .then((response) => {
            this.$router.push("/")
          })
          .catch(error => {
            // this.fail = true;
          })
          .finally(() => {
            // if(this.fail) {
            //   setTimeout(function(){
            //     this.fail = false;
            //   }, 3000);
            // }

            // this.isFetching = false;
          })
        }
      }
    ),
    beforeDestroy() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.showSidebar = false;
      }
    }
  };
</script>

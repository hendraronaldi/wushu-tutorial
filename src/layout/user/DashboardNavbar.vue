<template>
    <base-nav class="navbar-top navbar-dark"
              id="navbar-main"
              :show-toggle-button="false"
              expand>
        <form class="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <div class="form-group mb-0">
                <base-input placeholder="Search"
                            class="input-group-alternative"
                            alternative=""
                </base-input>
            </div>
        </form>
        <ul class="navbar-nav align-items-center d-none d-md-flex">
            <li class="nav-item dropdown">
                <base-dropdown class="nav-link pr-0">
                    <div class="media align-items-center" slot="title">
                <span class="avatar avatar-sm rounded-circle">
                  <img v-if="loggedAs.Avatar" alt="Image placeholder" :src="loggedAs.Avatar">
                  <img v-else alt="Image placeholder" src="img/theme/default-profile.jpg">
                </span>
                        <div class="media-body ml-2 d-none d-lg-block">
                            <span class="mb-0 text-sm  font-weight-bold">{{loggedAs.Name}}</span>
                        </div>
                    </div>

                    <template>
                        <div class=" dropdown-header noti-title">
                            <h6 class="text-overflow m-0">Welcome!</h6>
                        </div>
                        <div class="dropdown-divider"></div>
                        <button @click="logout" class="dropdown-item">
                            <i class="ni ni-user-run"></i>
                            <span>Logout</span>
                        </button>
                    </template>
                </base-dropdown>
            </li>
        </ul>
    </base-nav>
</template>
<script>
  import {mapActions, mapState, mapGetters} from 'vuex';

  export default {
    data() {
      return {
        activeNotifications: false,
        showMenu: false,
        searchQuery: ''
      };
    },

    props:{
      loggedAs: Object,
    },

    methods: mapActions(
      {
        toggleSidebar(dispatch) {
          this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
        },
        hideSidebar(dispatch) {
          this.$sidebar.displaySidebar(false);
        },
        toggleMenu(dispatch) {
          this.showMenu = !this.showMenu;
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
        }
      }
    )
  };
</script>

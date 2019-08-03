<template>
    <div class="main-content">
        <header class="header-global">
            <base-nav class="navbar-top navbar-horizontal navbar-dark" containerClasses="px-4 container" effect="light" expand>
                <router-link slot="brand" class="navbar-brand" to="/landing">
                    <i class="fa fa-home"></i>
                    <span>Home</span>
                </router-link>

                <template v-slot="{closeMenu}">
                <!-- Collapse header -->
                    <div class="navbar-collapse-header d-md-none">
                        <div class="row">
                            <div class="col-6 collapse-brand">
                                <img src="img/brand/logoTP.jpg">
                            </div>
                            <div class="col-6 collapse-close">
                                <button type="button"
                                        @click="closeMenu"
                                        class="navbar-toggler"
                                        aria-label="Toggle sidenav">
                                    <span></span>
                                    <span></span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a class="nav-link nav-link-icon" href="https://www.instagram.com/wushuterataiputih/"
                            target="_blank" rel="noopener" data-toggle="tooltip" title="Follow us on Instagram">
                                <i class="fa fa-instagram"></i>
                                <span class="nav-link-inner--text d-lg-none">Instagram</span>
                            </a>
                        </li>
                        <li class="nav-item d-lg-block ml-lg-4">
                            <router-link class="nav-link nav-link-icon" to="/register">
                                <i class="ni ni-circle-08"></i>
                                <span class="nav-link-inner--text">Join Us</span>
                            </router-link>
                        </li>
                        <li class="nav-item d-lg-block ml-lg-4">
                            <router-link class="nav-link nav-link-icon" to="/login">
                                <i class="ni ni-key-25"></i>
                                <span class="nav-link-inner--text">Login</span>
                            </router-link>
                        </li>
                    </ul>
                </template>
            </base-nav>
        </header>
        <main>
            <slide-y-up-transition mode="out-in" origin="center top">
                <router-view></router-view>
            </slide-y-up-transition>
        </main>
        <footer class="footer has-cards">
            <div class="container">
                <div class="row align-items-center justify-content-md-between">
                    <div class="col-md-6">
                        <div class="copyright">
                            &copy; {{year}}
                            <a href="https://www.creative-tim.com" target="_blank" rel="noopener">Creative Tim</a> & <a href="https://www.binarcode.com" target="_blank" rel="noopener">Binar Code</a>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <ul class="nav nav-footer justify-content-end">
                            <li class="nav-item">
                                <a href="https://github.com/creativetimofficial/argon-design-system/blob/master/LICENSE.md"
                                class="nav-link" target="_blank" rel="noopener">MIT License</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";
import { SlideYUpTransition } from 'vue2-transitions';

export default {
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown,
    SlideYUpTransition
  },
  data() {
    return {
      year: new Date().getFullYear(),
      showMenu: false
    }
  }
};
</script>
<style>
</style>

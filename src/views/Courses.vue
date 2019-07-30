<template>
    <div>
        <base-header type="gradient-dark" class="pb-6 pb-8 pt-5 pt-md-8">
        </base-header>

        <div v-if="!clickedCategory" class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow">
                        <div class="card-header bg-transparent">
                            <h3 class="mb-0">COURSES</h3>
                        </div>
                        <div class="card-body">
                            <div class="row icon-examples">
                                <div class="col-xl-4 col-lg-6"
                                    v-for="(course, index) in courses" :key="course.class + index"
                                >
                                    <stats-card :sub-title="course.class"
                                                type="gradient-success"
                                                icon="ni ni-hat-3"
                                                class="mb-4 mb-xl-0"
                                    >
                                        <template
                                            slot="footer"
                                            v-for="(item, index) in course.category"
                                        >
                                            <button  :key="item.title + index"
                                                    type="button"
                                                    @click="toggleCategory(course.class.toLowerCase(), item.title.toLowerCase())"
                                                    v-b-tooltip.hover.top
                                                    class="btn-icon-clipboard" data-clipboard-text="air-baloon">
                                                <div>
                                                    <i class="ni ni-hat-3"></i>
                                                    <span>{{item.title}}</span>
                                                    <span>{{item.description}}</span>
                                                </div>
                                            </button>
                                        </template>
                                    </stats-card>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <course-category
            v-else
            :category="category"
            :level="level"
        ></course-category>
    </div>
</template>
<script>
import Vue from 'vue'
import {mapActions} from 'vuex';
import VueClipboard from 'vue-clipboard2'
import BTooltipDirective from 'bootstrap-vue/es/directives/tooltip'
import CourseCategory from './courses/CourseCategory.vue'

  Vue.use(VueClipboard)
  export default {
    components: {
        CourseCategory
    },

    created(){
        this.loadCourseCategory()
    },

    directives: {
      'b-tooltip': BTooltipDirective
    },

    data() {
      return {
        clickedCategory: false,
        courses: [],
        category: "",
        level: ""
      }
    },
    methods: mapActions(
        {
            onCopy() {
                this.$notify({
                    type: 'success',
                    title: 'Copied to clipboard'
                })
            },

            toggleCategory(dispatch, category, level) {
                this.category = category;
                this.level = level;
                this.clickedCategory = true;
            },

            loadCourseCategory(dispatch) {
                dispatch('getCourses')
                .then((response) => {
                    this.courses = response;
                })
                .catch(() => {
                    this.courses = [];
                })
            }
        }
    )
  };
</script>
<style></style>

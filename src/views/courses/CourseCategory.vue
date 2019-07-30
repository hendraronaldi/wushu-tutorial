<template>
    <div>
        <div  v-if="!clickedDetails" class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow">
                        <div class="card-header bg-transparent">
                            <h3 class="mb-0">{{category.toUpperCase()}} {{level.toUpperCase()}} CATEGORY</h3>
                        </div>
                        <div class="card-body">
                            <div class="row icon-examples">
                                <div class="col-xl-4 col-lg-6"
                                    v-for="(course, index) in courses" :key="course + index"
                                >
                                    <stats-card :sub-title="course.toUpperCase()"
                                                icon="ni ni-hat-3"
                                                class="mb-4 mb-xl-0"
                                    >
                                        <template slot="footer">
                                            <button type="button"
                                                    @click="toggleDetails(course)"
                                                    v-b-tooltip.hover.top
                                                    class="btn-icon-clipboard" data-clipboard-text="air-baloon">
                                                <div>
                                                    <i class="ni ni-hat-3"></i>
                                                    <span>See Course</span>
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
        <course-details
            v-else
            :level="level"
            :category="category"
            :course="course"
        ></course-details>
    </div>
</template>
<script>
import Vue from 'vue'
import {mapActions, mapGetters, mapState} from 'vuex';
import VueClipboard from 'vue-clipboard2'
import BTooltipDirective from 'bootstrap-vue/es/directives/tooltip'
import CourseDetails from './CourseDetails.vue'

  Vue.use(VueClipboard)
  export default {
    name: 'course-category',
    components: {
        CourseDetails
    },
    props: {
        level: String,
        category: String
    },

    created(){
        this.loadCourses();
    },

    directives: {
      'b-tooltip': BTooltipDirective
    },
    data() {
      return {
        clickedDetails: false,
        courses: [],
        course: ""
      }
    },
    computed: {
        ...mapGetters([
            'currentCategory',
            'currentLevel'
        ]),
        ...mapState([
            'currentCategory',
            'currentLevel'
        ])
    },
    methods: mapActions(
        {
            onCopy() {
                this.$notify({
                    type: 'success',
                    title: 'Copied to clipboard'
                })
            },
            toggleDetails(dispatch, course) {
                this.course = course;
                this.clickedDetails = true;
            },

            loadCourses(dispatch) {
                dispatch('getCourseLevels', this.category+ "/" + this.level)
                .then((response) => {
                    this.courses = response;
                })
                .catch(() => {
                    this.courses = []
                })
            }
        }
    )
  };
</script>
<style></style>

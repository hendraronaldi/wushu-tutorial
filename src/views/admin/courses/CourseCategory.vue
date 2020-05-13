<template>
    <div>
        <div  v-if="!clickedDetails" class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow">
                        <div class="card-header bg-transparent">
                            <h3 class="mb-0">{{category.toUpperCase()}} {{level.toUpperCase()}} CATEGORY</h3>
                        </div>
                        <!-- Modal Add New Course -->
                        <span>
                            <base-button class="ml-4 my-4" @click="toggleCourse('add', -1)" type="primary">
                                Add New Course
                            </base-button>
                            <div>
                                <modal :show.sync="showModal"
                                body-classes="p-0"
                                modal-classes="modal-dialog-centered modal-sm"
                                >
                                <card type="secondary" shadow
                                        header-classes="bg-white pb-5"
                                        body-classes="px-lg-5 py-lg-5"
                                        class="border-0">
                                    <template>
                                        <form role="form">
                                            <h3>New Course</h3>
                                            <div>
                                                <div class="form-group mb-3 input-group input-group-alternative">
                                                    <input v-model="newCourse" placeholder="Course Title" class="form-control" required>
                                                </div>
                                            </div>
                                            <div v-if="showAddCourseModal" class="text-center">
                                                <base-button @click="addCourse()" type="default" class="my-4">Submit</base-button>
                                            </div>
                                            <div v-else class="text-center">
                                                <base-button @click="editCourse()" type="default" class="my-4">Submit</base-button>
                                            </div>
                                        </form>
                                    </template>
                                </card>
                                </modal>
                            </div>
                        </span>

                        <!-- Modal Confirmation -->
                        <span>
                            <div>
                                <modal :show.sync="showConfirmationModal"
                                body-classes="p-0"
                                modal-classes="modal-dialog-centered modal-sm"
                                >
                                <card type="secondary" shadow
                                        header-classes="bg-white pb-5"
                                        body-classes="px-lg-5 py-lg-5"
                                        class="border-0">
                                    <template>
                                        <div>
                                            <h3>Do you want to delete this course?</h3>
                                            <base-button @click="showConfirmationModal = false" class="ml-4 my-4" type="danger">
                                                No
                                            </base-button>
                                            <base-button @click="deleteCourse()" class="ml-4 my-4" type="success">
                                                Yes
                                            </base-button>
                                        </div>
                                    </template>
                                </card>
                                </modal>
                            </div>
                        </span>

                        <!-- Courses -->
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
                                                <span>
                                                    <i class="ni ni-hat-3"></i>
                                                    <span>See Course</span>
                                                </span>
                                            </button>
                                            <div>
                                                <base-button @click="toggleCourse('edit', index)" type="primary">Edit</base-button>
                                                <base-button @click="toggleConfirmation(index)" type="danger">Delete</base-button>
                                            </div>
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
        indexCourse: -1,
        showEditCourseModal: false,
        showAddCourseModal: false,
        showModal: false,
        showConfirmationModal: false,
        clickedDetails: false,
        courses: [],
        course: "",
        newCourse: "",
        newCourseDetails: {
            id: "",
            materials: [],
            name: ""
        }
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

            toggleCourse(dispatch, modal, index){
                this.showModal = true;
                if(modal == "edit"){
                    this.indexCourse = index;
                    this.showEditCourseModal = true;
                    this.showAddCourseModal = false;
                    this.newCourse = this.courses[this.indexCourse];
                } else {
                    this.showEditCourseModal = false;
                    this.showAddCourseModal = true;
                    this.newCourse = '';
                }
            },

            toggleConfirmation(dispatch, index){
                this.indexCourse = index;
                this.showConfirmationModal = true;
            },

            deleteCourse(){
                this.courses.splice(this.indexCourse, 1);
                this.showConfirmationModal = false;
            },

            addCourse() {
                this.newCourseDetails.id = this.newCourse.replace(/\s/g,'').toLowerCase() + this.level;
                this.newCourseDetails.name = this.newCourse + " " + this.level.toUpperCase();

                // TODO: Save new course detail using API
                this.courses.push(this.newCourse.replace(/\s/g,'').toLowerCase());
                this.newCourse = "";
                this.newCourseDetails = {
                    id: "",
                    materials: [],
                    name: ""
                }
                this.showModal = false;
            },

            editCourse(){
                // TODO: Save edited material to db
                alert("Edit Course")
                this.courses[this.indexCourse] = this.newCourse;
                this.showEditCourseModal = false;
                this.showModal = false;
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

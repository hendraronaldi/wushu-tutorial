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
                        <!-- Modal Add New Course -->
                        <span>
                            <base-button class="ml-4 my-4" @click="toggleClass('add', -1)" type="primary">
                                Add New Class
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
                                                    <input v-model="newCourse.class" placeholder="Course Class" class="form-control" required>
                                                </div>
                                                <div v-for="(category, index) in newCourse.category" :key="index+1">
                                                    <span>
                                                        Category {{index+1}}
                                                        <button v-if="newCourse.category.length > 1" @click="deleteCourseCategory(0, index, false)" type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </span>
                                                    <div class="form-group mb-3 input-group input-group-alternative">
                                                        <input v-model="newCourse.category[index].title" placeholder="Course Category" class="form-control" required>
                                                    </div>
                                                    <div class="form-group mb-3 input-group input-group-alternative">
                                                        <input v-model="newCourse.category[index].description" placeholder="Course Description" class="form-control" required>
                                                    </div>
                                                </div>
                                                <div class="text-center">
                                                    <base-button @click="addCourseCategory()" type="info" class="my-4">Add Category</base-button>
                                                </div>
                                            </div>
                                            <div v-if="showAddClassModal" class="text-center">
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
                                    v-for="(course, indexClass) in courses" :key="course.class + indexClass"
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
                                                <span>
                                                    <i class="ni ni-hat-3"></i>
                                                    <span>{{item.title}}</span>
                                                    <div>{{item.description}}</div>
                                                </span>
                                            </button>
                                            <div class="row" :key="'action'+index" v-if="index == course.category.length - 1">
                                                <div class="col">
                                                    <base-button @click="toggleClass('edit', indexClass)" type="primary">Edit</base-button>
                                                    <base-button @click="toggleConfirmation(indexClass)" type="danger">Delete</base-button>
                                                </div>
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
        indexClass: -1,
        showEditClassModal: false,
        showAddClassModal: false,
        showModal: false,
        showConfirmationModal: false,
        clickedCategory: false,
        courses: [],
        category: "",
        level: "",
        newCourse: {
            class: "",
            category: [
                {
                    image: "url",
                    title: "",
                    description: ""
                }
            ]
        },
        newCategory: {
            image: "url",
            title: "",
            description: ""
        }
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

            addCourseCategory(){
                this.newCourse.category.push(this.newCategory);
            },

            deleteCourseCategory(dispatch, indexCourse, indexCategory, existed){
                if(existed){
                    this.courses[indexCourse].category.splice(indexCategory, 1);
                } else {
                    this.newCourse.category.splice(indexCategory, 1);
                }
            },

            toggleClass(dispatch, modal, index){
                this.showModal = true;
                if(modal == "edit"){
                    this.indexClass = index;
                    this.showEditClassModal = true;
                    this.showAddClassModal = false;
                    this.newCourse = JSON.parse(JSON.stringify(this.courses[this.indexClass]));
                } else {
                    this.showEditClassModal = false;
                    this.showAddClassModal = true;
                    this.newCourse = {
                        class: "",
                        category: [
                            {
                                image: "url",
                                title: "",
                                description: ""
                            }
                        ]
                    }
                }
            },

            toggleConfirmation(dispatch, index){
                this.indexClass = index;
                this.showConfirmationModal = true;
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
            },

            deleteCourse() {
                // TODO: Delete course from db
                this.courses.splice(this.indexClass, 1);
                this.showConfirmationModal = false;
            },

            addCourse() {
                alert("Add Course")
                // TODO: Add new course to db
                this.courses.push(this.newCourse)
                this.newCourse = {
                    class: "",
                    category: [
                        {
                            title: "",
                            description: ""
                        }
                    ]
                }
                this.newCategory = {
                    title: "",
                    description: ""
                }
                this.showAddClassModal = false;
                this.showModal = false;
            },

            editCourse(){
                // TODO: Save edited material to db
                alert("Edit Course")
                this.courses[this.indexClass] = JSON.parse(JSON.stringify(this.newCourse));
                this.showEditClassModal = false;
                this.showModal = false;
            },

        }
    )
  };
</script>
<style></style>

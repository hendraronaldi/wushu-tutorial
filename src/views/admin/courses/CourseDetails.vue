<template>
    <div>
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow">
                        <div class="card-header bg-transparent">
                            <h3 class="mb-0">{{courseDetails.name.toUpperCase()}}</h3>
                        </div>
                        <!-- Modal Material -->
                        <span>
                            <base-button v-if="courseDetails.materials.length" class="ml-4 my-4" @click="toggleMaterial('edit')" type="primary">
                                Edit Material
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
                                            <h3>Material</h3>
                                            <div>
                                                <div class="form-group mb-3 input-group input-group-alternative">
                                                    <input v-model="newMaterial.title.value" placeholder="Material Title" class="form-control" required>
                                                </div>
                                                <h3>Material Content</h3>
                                                <div v-for="(content, index) in newMaterial.content" :key="index" class="my-4">
                                                    <!-- Select Content Type -->
                                                    <base-dropdown class="mb-3 mb-xl-5">
                                                        <base-button v-if="!content.type" slot="title" type="info" class="dropdown-toggle">
                                                            -- Select Type --
                                                        </base-button>
                                                        <base-button v-else slot="title" type="info" class="dropdown-toggle">
                                                            {{newMaterial.content[index].type}}
                                                        </base-button>
                                                        <a @click="newMaterial.content[index].type = 'text'" class="dropdown-item">text</a>
                                                        <a @click="newMaterial.content[index].type = 'image'" class="dropdown-item">image</a>
                                                        <a @click="newMaterial.content[index].type = 'video'" class="dropdown-item">video</a>
                                                        <a @click="newMaterial.content[index].type = 'form'" class="dropdown-item">form</a>
                                                    </base-dropdown>
                                                    <textarea v-if="newMaterial.content[index].type == 'text'" v-model="newMaterial.content[index].value" class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Material Content ..."></textarea>
                                                    <div v-else-if="newMaterial.content[index].type == 'form'">

                                                    </div>
                                                    <div v-else>
                                                        <input v-model="newMaterial.content[index].title" placeholder="Content Title" class="form-control my-2 input-group-alternative" required>
                                                        <input v-model="newMaterial.content[index].value" placeholder="Content URL" class="form-control input-group-alternative" required>
                                                    </div>
                                                </div>
                                                <base-button @click="addMaterialContent()" class="my-2" type="primary">
                                                    Add Material Content
                                                </base-button>
                                            </div>
                                            <div v-if="showAddMaterialModal" @click="addMaterial()" class="text-center">
                                                <base-button type="default" class="my-4">Submit</base-button>
                                            </div>
                                            <div v-else @click="editMaterial()" class="text-center">
                                                <base-button type="default" class="my-4">Submit</base-button>
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
                                            <h3>Do you want to delete current material?</h3>
                                            <base-button @click="showConfirmationModal = false" class="ml-4 my-4" type="danger">
                                                No
                                            </base-button>
                                            <base-button @click="deleteMaterial()" class="ml-4 my-4" type="success">
                                                Yes
                                            </base-button>
                                        </div>
                                    </template>
                                </card>
                                </modal>
                            </div>
                        </span>

                        <!-- Course Details -->
                        <div class="card-body">
                            <div class="row icon-examples">
                                <div class="col-xl-12 col-lg-12"
                                    v-for="(material, index) in courseDetails.materials" :key="material.title.value + index"
                                >
                                    <div v-if="index+1 == pagination.default">
                                        <div v-for="(item, idx) in material.content" :key="idx">
                                            <div v-if="item.type != 'text'">
                                                <h2>
                                                    {{item.title}}
                                                </h2>
                                                <iframe v-if="item.type == 'video'" :src="item.value" frameborder="0"></iframe>
                                                <!-- <video v-if="item.type == 'video'" :src="item.value"></video> -->
                                                <img v-else-if="item.type == 'image'" :src="item.value" alt="">
                                                <form v-else action="" v-for="(question, i) in item.value" :key="i">
                                                    <img v-if="question.image != null" :src="question.image" alt="">
                                                    <p>{{question.question}}</p>
                                                    <template>
                                                        <div>
                                                            <base-radio v-for="(choice, j) in question.choices" :key="j" :name="j.toString()" v-model="answers[j]" class="mb-3">
                                                                <img v-if="choice.type == 'image'" :src="choice.value" alt="">
                                                                <p v-else>{{choice.value}}</p>
                                                            </base-radio>
                                                        </div>
                                                    </template>
                                                </form>
                                            </div>
                                            <div v-else>
                                                <p>{{item.value}}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <span @click="showConfirmationModal = true" v-if="courseDetails.materials.length">
                                    <i class="fa fa-2x fa-minus-circle" aria-hidden="true"></i>
                                </span>
                                <div>
                                    <base-pagination :page-count="courseDetails.materials.length" v-model="pagination.default"></base-pagination>
                                </div>
                                <span @click="toggleMaterial('add')">
                                    <i class="fa fa-2x fa-plus-circle" aria-hidden="true"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import {mapActions, mapGetters, mapState} from 'vuex';
import VueClipboard from 'vue-clipboard2'
import BTooltipDirective from 'bootstrap-vue/es/directives/tooltip'

  Vue.use(VueClipboard)
  export default {
    name: 'course-details',

    props: {
        level: String,
        category: String,
        course: String
    },

    directives: {
      'b-tooltip': BTooltipDirective
    },

    created(){
        this.loadCourseDetails();
    },

    data() {
        return {
            showEditMaterialModal: false,
            showAddMaterialModal: false,
            showModal: false,
            showConfirmationModal: false,
            pagination: {
                default: 1
            },
            answers: [],
            newMaterial: {
                content: [
                    {
                        title: '',
                        type: 'text',
                        value: ''
                    }
                ],

                title: {
                    type: 'text',
                    value: ''
                }
            },
            courseDetails: {
                id: '',
                name: "",
                materials: [
                    {
                        content: [
                            {
                                title: '',
                                type: 'text',
                                value: ''
                            }
                        ],

                        title: {
                            type: 'text',
                            value: ''
                        }
                    }
                ]
            },
        }
    },
    computed: {
        ...mapGetters([
            'currentCategory',
            'currentLevel',
            'currentCourse'
        ]),
        ...mapState([
            'currentCategory',
            'currentLevel',
            'currentCourse'
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

            toggleMaterial(dispatch, modal){
                this.showModal = true;
                if(modal == "edit"){
                    this.showEditMaterialModal = true;
                    this.showAddMaterialModal = false;
                    this.newMaterial = JSON.parse(JSON.stringify(this.courseDetails.materials[this.pagination.default-1]));
                } else {
                    this.showEditMaterialModal = false;
                    this.showAddMaterialModal = true;
                    this.newMaterial = {
                        content: [
                            {
                                type: 'text',
                                value: ''
                            }
                        ],

                        title: {
                            type: 'text',
                            value: ''
                        }
                    }
                }
            },

            deleteMaterial() {
                // TODO: Delete material from db
                if(this.pagination.default == this.courseDetails.materials.length){
                    this.courseDetails.materials.pop();
                    this.pagination.default--;
                } else {
                    this.courseDetails.materials.splice([this.pagination.default-1],1);
                }
                this.showConfirmationModal = false;
            },

            editMaterial(){
                // TODO: Save edited material to db
                alert("Edit Material")
                this.courseDetails.materials[this.pagination.default-1] = JSON.parse(JSON.stringify(this.newMaterial));
                this.showEditMaterialModal = false;
                this.showModal = false;
            },

            addMaterial(){
                // TODO: Add material to db
                alert("Add Material")
                this.courseDetails.materials.push(this.newMaterial);
                this.newMaterial = {
                    content: [
                        {
                            type: 'text',
                            value: ''
                        }
                    ],

                    title: {
                        type: 'text',
                        value: ''
                    }
                }
                this.showAddMaterialModal = false;
                this.showModal = false;
                this.pagination.default = this.courseDetails.materials.length;
            },

            addMaterialContent() {
                this.newMaterial.content.push(
                    {
                        type: 'text',
                        value: ''
                    }
                )
            },

            toggleDetails(dispatch, course) {
                this.course = course;
                this.clickedDetails = true;
            },

            loadCourseDetails(dispatch) {
                dispatch('getCourseDetails', this.category+ "/" + this.level + "/" + this.course)
                .then((response) => {
                    this.courseDetails = response;
                })
                .catch(() => {
                    this.courseDetails = {
                        id: '',
                        name: "",
                        materials: [
                            {
                                content: [
                                    {
                                        type: 'text',
                                        value: ''
                                    }
                                ],

                                title: {
                                    type: 'text',
                                    value: ''
                                }
                            }
                        ]
                    };
                })
            }
        }
    )
  };
</script>
<style></style>

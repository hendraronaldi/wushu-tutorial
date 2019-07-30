<template>
    <div>
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow">
                        <div class="card-header bg-transparent">
                            <h3 class="mb-0">{{courseDetails.name.toUpperCase()}}</h3>
                        </div>
                        <div class="card-body">
                            <div class="row icon-examples">
                                <div class="col-xl-12 col-lg-12"
                                    v-for="(material, index) in courseDetails.materials" :key="material.title.value + index"
                                >
                                    <div v-if="index+1 == pagination.default">
                                        <div v-for="(item, idx) in material.content" :key="idx">
                                            <div v-if="item.type != 'text'">
                                                <h2>{{item.title}}</h2>
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
                                <div>
                                    <base-pagination :page-count="courseDetails.materials.length" v-model="pagination.default"></base-pagination>
                                </div>
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
            pagination: {
                default: 1
            },
            answers: [],
            courseDetails: {
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

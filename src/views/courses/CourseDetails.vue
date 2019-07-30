<template>
    <div>
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow">
                        <div class="card-header bg-transparent">
                            <h3 class="mb-0">Chang Quan C</h3>
                        </div>
                        <div class="card-body">
                            <div class="row icon-examples">
                                <div class="col-xl-12 col-lg-12"
                                    v-for="(material, index) in materials" :key="material.title.value + index"
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
                                    <base-pagination :page-count="materials.length" v-model="pagination.default"></base-pagination>
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
        course: String
    },
    directives: {
      'b-tooltip': BTooltipDirective
    },
    data() {
        return {
            pagination: {
                default: 1
            },
            answers: [],
            materials: [
                {
                    content: [
                        {
                            title: "Chang Quan C Demo",
                            type: "video",
                            value: "https://www.youtube.com/embed/9Xy6KUnZdJI"
                        },
                        {
                            type: "text",
                            value: "text"
                        }
                    ],
                    title: {
                        type: "text",
                        value: "Chang Quan C"
                    }
                },
                {
                    content: [
                        {
                            title: "Chang Quan C Quiz",
                            type: "form",
                            value: [
                                {
                                    answer: "2",
                                    choices: [
                                        {
                                            type: "text",
                                            value: "choice 1"
                                        },
                                        {
                                            type: "text",
                                            value: "choice 2"
                                        },
                                        {
                                            type: "text",
                                            value: "choice 3"
                                        },
                                        {
                                            type: "text",
                                            value: "choice 4"
                                        }
                                    ],
                                    image: "url image",
                                    question: "Question 1"
                                }
                            ]
                        }
                    ],
                    title: {
                        type: "text",
                        value: "Quiz"
                    }
                }
            ],
            name: "Chang Quan C",
            id: "changquanc"
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
            }
        }
    )
  };
</script>
<style></style>

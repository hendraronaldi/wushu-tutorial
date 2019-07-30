<template>
    <div>
        <base-header type="gradient-dark" class="pb-6 pb-8 pt-5 pt-md-8">
        </base-header>

        <div v-if="!clickedCategory" class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow">
                        <div class="card-header bg-transparent">
                            <h3 class="mb-0">Courses</h3>
                        </div>
                        <div class="card-body">
                            <div class="row icon-examples">
                                <div class="col-xl-4 col-lg-6"
                                    v-for="(course, index) in courses" :key="course.name + index"
                                >
                                    <stats-card :sub-title="course.name"
                                                type="gradient-success"
                                                icon="ni ni-hat-3"
                                                class="mb-4 mb-xl-0"
                                    >
                                        <template
                                            slot="footer"
                                            v-for="(item, index) in course.category"
                                        >
                                            <button  :key="item.name + index"
                                                    type="button"
                                                    @click="toggleCategory"
                                                    v-b-tooltip.hover.top
                                                    class="btn-icon-clipboard" data-clipboard-text="air-baloon">
                                                <div>
                                                    <i class="ni ni-hat-3"></i>
                                                    <span>{{item.name}}</span>
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
        <course-category v-else></course-category>
    </div>
</template>
<script>
import Vue from 'vue'
import {mapActions, mapGetters, mapState} from 'vuex';
import VueClipboard from 'vue-clipboard2'
import BTooltipDirective from 'bootstrap-vue/es/directives/tooltip'
import CourseCategory from './courses/CourseCategory.vue'

  Vue.use(VueClipboard)
  export default {
    components: {
        CourseCategory
    },

    directives: {
      'b-tooltip': BTooltipDirective
    },
    data() {
      return {
        clickedCategory: false,
        courses: [
            {
                color: 'gradient-red',
                name: 'Taolu',
                category: [
                    {
                        name: 'D',
                        description: 'Age 6 - 8'
                    },
                    {
                        name: 'C',
                        description: 'Age 9 - 12'
                    },
                    {
                        name: 'B',
                        description: 'Age 13 - 15'
                    },
                    {
                        name: 'A',
                        description: 'Age 16 - 18'
                    },
                    {
                        name: 'Senior',
                        description: 'Age 18 - above'
                    }
                ]
            },
            {
                color: 'gradient-green',
                name: 'Traditional',
                category: [
                    {
                        name: 'D',
                        description: 'Age 6 - 8'
                    },
                    {
                        name: 'C',
                        description: 'Age 9 - 12'
                    },
                    {
                        name: 'B',
                        description: 'Age 13 - 15'
                    },
                    {
                        name: 'A',
                        description: 'Age 16 - 18'
                    },
                    {
                        name: 'Senior',
                        description: 'Age 18 - above'
                    }
                ]
            },
            {
                color: 'gradient-blue',
                name: 'Sanda',
                category: [
                    {
                        name: 'D',
                        description: 'Age 6 - 8'
                    },
                    {
                        name: 'C',
                        description: 'Age 9 - 12'
                    },
                    {
                        name: 'B',
                        description: 'Age 13 - 15'
                    },
                    {
                        name: 'A',
                        description: 'Age 16 - 18'
                    },
                    {
                        name: 'Senior',
                        description: 'Age 18 - above'
                    }
                ]
            }
        ]
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
            toggleCategory() {
                this.clickedCategory = true;
            }
        }
    )
  };
</script>
<style></style>

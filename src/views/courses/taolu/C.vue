<template>
    <div>
        <base-header type="gradient-dark" class="pb-6 pb-8 pt-5 pt-md-8">
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow">
                        <div class="card-header bg-transparent">
                            <h3 class="mb-0">Taolu C Category</h3>
                        </div>
                        <div class="card-body">
                            <div class="row icon-examples">
                                <div class="col-xl-4 col-lg-6"
                                    v-for="course in courses" :key="course.id"
                                >
                                    <stats-card :sub-title="course.name"
                                                icon="ni ni-hat-3"
                                                class="mb-4 mb-xl-0"
                                    >
                                        <template slot="footer">
                                            <p>{{course.description}}</p>
                                            <button type="button"
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

    </div>
</template>
<script>
  import Vue from 'vue'
  import VueClipboard from 'vue-clipboard2'
  import BTooltipDirective from 'bootstrap-vue/es/directives/tooltip'
  Vue.use(VueClipboard)
  export default {
    directives: {
      'b-tooltip': BTooltipDirective
    },
    data() {
      return {
        courses: [
            {
                id: 'changquanc',
                name: 'Chang Quan',
                description: 'Chang Quan Description'
            },
            {
                id: 'nanquanc',
                name: 'Nan Quan',
                description: 'Nan Quan Description'
            }
        ]
      }
    },
    methods: {
      onCopy() {
        this.$notify({
          type: 'success',
          title: 'Copied to clipboard'
        })
      }
    }
  };
</script>
<style></style>

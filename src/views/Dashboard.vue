<template>
    <div>
        <base-header type="gradient-dark" class="pb-6 pb-8 pt-5 pt-md-8">
            <h2 class="text-white">Rank</h2>
            <!-- Card stats -->
            <div class="row">
                <div :key="index" v-for="(item, index) in performance.latest.datasets.rank" class="col-xl-3 col-lg-6 mb-3 mb-xl-5">
                    <stats-card :title="item.label"
                                :type="item.color"
                                :sub-title="item.data[item.data.length - 1].toString()"
                                :icon="item.icon"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span v-if="item.data[item.data.length - 1] - item.data[item.data.length - 2] < 0" class="text-success mr-2">
                              <i class="fa fa-arrow-up"></i>{{item.data[item.data.length - 2] - item.data[item.data.length - 1]}}</span>
                            <span v-else-if="item.data[item.data.length - 1] - item.data[item.data.length - 2] > 0" class="text-danger mr-2">
                              <i class="fa fa-arrow-down"></i>{{item.data[item.data.length - 1] - item.data[item.data.length - 2]}}</span>
                            <span v-else class="mr-2">
                              0</span>
                            <span class="text-nowrap">Since last month</span>
                        </template>
                    </stats-card>
                </div>
            </div>
        </base-header>

        <!--Charts-->
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-xl-12 mb-5 mb-xl-0">
                    <card type="default" header-classes="bg-transparent">
                        <div slot="header" class="row align-items-center">
                            <div class="col">
                                <h6 class="text-light text-uppercase ls-1 mb-1">Overview</h6>
                                <h5 class="h3 text-white mb-0">Performance</h5>
                            </div>
                            <div class="col">
                                <ul class="nav nav-pills justify-content-end">
                                    <li v-for="(item, index) in performance.latest.datasets.details" class="nav-item mr-2 mr-md-0" :key="index">
                                        <a class="nav-link py-2 px-3"
                                           href="#"
                                           :class="{active: bigLineChart.activeIndex === index}"
                                           @click.prevent="initBigChart(index)">
                                            <span class="d-none d-md-block">{{item.label}}</span>
                                            <span class="d-md-none">{{item.label[0]}}</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <line-chart
                                :height="350"
                                ref="bigChart"
                                :chart-data="bigLineChart.chartData"
                                :extra-options="bigLineChart.extraOptions"
                        >
                        </line-chart>
                    </card>
                </div>
            </div>
            <!-- End charts-->

            <!--Tables-->
            <div class="row mt-5">
                <div v-for="(item, index) in performance.latest.datasets.details" :key="index" class="col-xl-12 mb-5 mb-xl-5">
                    <social-traffic-table
                      :performanceData="item"
                      :key="index"
                    ></social-traffic-table>
                </div>
            </div>
            <!--End tables-->
        </div>

    </div>
</template>
<script>
  import {mapActions, mapGetters, mapState} from 'vuex';
  // Charts
  import * as chartConfigs from '@/components/Charts/config';
  import LineChart from '@/components/Charts/LineChart';

  // Tables
  import SocialTrafficTable from './Dashboard/SocialTrafficTable';

  export default {
    components: {
      LineChart,
      SocialTrafficTable,
    },
    created(){
      this.getUserPerformance();
    },
    computed: {
        ...mapGetters([
            'currentUser'
        ]),
        ...mapState([
            'userProfile'
        ])
    },
    data() {
      return {
        bigLineChart: {
          allData: [],
          activeIndex: 0,
          chartData: {
            datasets: [],
            labels: [],
          },
          extraOptions: chartConfigs.blueChartOptions,
        },

        userPerformance: [],

        // Dummy User Performance
        performance: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          latest: {
            datasets: {
              details: [
                {
                  label: 'Power',
                  data: [
                    {
                      name: 'Jump',
                      score: [30, 31, 33, 30, 35, 42, 50, 60, 75, 88, 92, 95]
                    },
                    {
                      name: 'Strike',
                      score: [20, 25, 26, 30, 35, 45, 52, 60, 75, 88, 92, 98]
                    }
                  ],
                  average: [25, 28, 29.5, 30, 35, 43, 51, 60, 75, 88, 92, 96]
                },
                {
                  label: 'Flexibility',
                  data: [
                    {
                      name: 'Shoulder',
                      score: [30, 31, 33, 30, 35, 42, 50, 60, 75, 80, 85, 88],
                      
                    },
                    {
                      name: 'Waist',
                      score: [20, 25, 26, 30, 35, 45, 52, 60, 75, 88, 92, 85]
                    },
                    {
                      name: 'Leg',
                      score: [25, 28, 29.5, 30, 35, 43, 51, 60, 75, 78, 77, 72]
                    }
                  ],
                  average: [25, 28, 29.5, 30, 35, 43, 51, 60, 75, 88, 92, 82]
                }
              ],
              rank: [
                {
                  label: 'Overall',
                  icon: 'ni ni-active-40',
                  color: 'gradient-blue',
                  data: [9, 8, 11, 11, 8, 6, 6, 6, 3, 2, 2, 5]
                
                },
                {
                  label: 'Power',
                  icon: 'ni ni-active-40',
                  color: 'gradient-red',
                  data: [10, 8, 11, 12, 7, 6, 5, 4, 3, 2, 1, 1]
                },
                {
                  label: 'Flexibility',
                  icon: 'ni ni-money-coins',
                  color: 'gradient-green',
                  data: [8, 8, 10, 9, 7, 8, 5, 7, 3, 2, 2, 6]
                }
              ]
            }
          }
        }
      };
    },
    methods: mapActions(
      {
        initBigChart(dispatch, index) {
          let chartData = {
            datasets: [
              {
                label: this.performance.latest.datasets.details[index].label,
                data: this.performance.latest.datasets.details[index].average
              }
            ],
            labels: this.performance.labels,
          };
          this.bigLineChart.chartData = chartData;
          this.bigLineChart.activeIndex = index;
        },

        getUserPerformance(dispatch){
          dispatch('getUserPerformance', this.$store.state.userProfile.Email)
          .then((response) => {
              this.userPerformance = response;
              console.log(this.userPerformance);
          })
          .catch(() => {
              this.userPerformance = [];
          })
        }
      }
    ),
    mounted() {
      this.initBigChart(0);
    }
  };
</script>
<style></style>

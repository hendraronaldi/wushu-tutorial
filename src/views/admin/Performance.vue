<template>
    <div>
        <base-header type="gradient-dark" class="pb-6 pb-8 pt-5 pt-md-8">

            <!-- Select User -->
            <base-dropdown class="mb-3 mb-xl-5">
              <base-button v-if="!activeUser" slot="title" type="info" class="dropdown-toggle">
                -- Select User --
              </base-button>
              <base-button v-else slot="title" type="info" class="dropdown-toggle">
                {{activeUser.Name}}
              </base-button>
              <div :key="index" v-for="(user, index) in users">
                <a @click="getUserPerformance(user)" class="dropdown-item">{{user.Name}}</a>
              </div>
            </base-dropdown>

            <!-- Modal Form Assessment -->
            <span>
              <base-button v-show="activeUser && !isAssessedCurrentMonth" @click="showModal = true" type="primary">
                Make assessment
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
                            <div :key="index" v-for="(val, category, index) in newUserPerformance">
                              <div v-if="category != 'email' && category != 'date'" class="text-center text-muted mb-4">
                                <small>{{category.toUpperCase()}}</small>
                              </div>
                              <div v-if="category != 'email' && category != 'date'" :key="idx" v-for="(value, item, idx) in newUserPerformance[category]" class="form-group mb-3 input-group input-group-alternative">
                                  <input v-model.number="newUserPerformance[category][item]" type="number" min="0" max="100" step="1" :placeholder="item" class="form-control">
                              </div>
                            </div>
                              <base-checkbox v-model="isAssessmentVerified">
                                  Verify Assessment
                              </base-checkbox>
                              <div class="text-center">
                                  <base-button @click="postUserPerformance()" v-if="isAssessmentVerified" type="primary" class="my-4">Submit</base-button>
                                  <base-button v-else type="primary" class="my-4" disabled>Submit</base-button>
                              </div>
                          </form>
                      </template>
                  </card>
                </modal>
              </div>
            </span>
            
            <!-- Ranking Progress -->
            <div v-show="Object.keys(this.userPerformance).length > 0">
              <h2 class="text-white">Rank</h2>
              <!-- Card stats -->
              <div class="row">
                  <div :key="index" v-for="(item, index) in performance.datasets.rank" class="col-xl-3 col-lg-6 mb-3 mb-xl-5">
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
            </div>
            
        </base-header>

        <!--Charts Performance-->
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-xl-12 mb-5 mb-xl-0">
                    <card v-if="Object.keys(this.userPerformance).length > 0" type="default" header-classes="bg-transparent">
                        <div slot="header" class="row align-items-center">
                            <div class="col">
                                <h6 class="text-light text-uppercase ls-1 mb-1">Overview</h6>
                                <h5 class="h3 text-white mb-0">Performance</h5>
                            </div>
                            <div class="col">
                                <ul class="nav nav-pills justify-content-end">
                                    <li v-for="(item, index) in Object.keys(userPerformance)" class="nav-item mr-2 mr-md-0" :key="index">
                                        <a class="nav-link py-2 px-3"
                                           v-if="item != 'email' && item != 'dates'"
                                           :class="{active: bigLineChart.activeIndex === item}"
                                           @click.prevent="initBigChart(item)">
                                            <span class="d-none d-md-block">{{item}}</span>
                                            <span class="d-md-none">{{item[0]}}</span>
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
                    <card v-else type="default" header-classes="bg-transparent">
                        <div slot="header" class="row align-items-center">
                            <div class="col">
                                <h6 class="text-light text-uppercase ls-1 mb-1">Overview</h6>
                                <h5 class="h3 text-white mb-0">Performance</h5>
                            </div>
                        </div>
                    </card>
                </div>
            </div>
            <!-- End charts-->

            <!--Tables Performance-->
            <div class="row mt-5">
                <div v-for="(item, key) in userPerformance" :key="key" class="col-xl-12 mb-5 mb-xl-5">
                    <social-traffic-table
                      v-if="key != 'email' && key != 'dates'"
                      :performanceData="item"
                      :title="key"
                      :key="key"
                    ></social-traffic-table>
                </div>
            </div>
            <!--End tables-->
        </div>

    </div>
</template>
<script>
  import {mapActions, mapGetters, mapState} from 'vuex';
  import {userPerformanceData} from '../../api/performance/performance';

  // Charts
  import * as chartConfigs from '@/components/Charts/config';
  import LineChart from '@/components/Charts/LineChart';

  // Tables
  import SocialTrafficTable from '../Dashboard/SocialTrafficTable';

  export default {
    components: {
      LineChart,
      SocialTrafficTable,
    },
    created(){
      var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      this.newUserPerformance.date = [year, month, day].join('-');
      this.getCurrentMonth();
      this.getUsers();
    },
    data() {
      return {
        isFetchingUsers: true,
        users: [],
        activeUser: null,
        bigLineChart: {
          allData: [],
          activeIndex: 0,
          chartData: {
            datasets: [],
            labels: [],
          },
          extraOptions: chartConfigs.blueChartOptions,
        },
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        currentMonth: '',

        newUserPerformance: userPerformanceData,
        isAssessmentVerified: false,

        userPerformance: {},
        showModal: false,
        isAssessedCurrentMonth: true,

        // Dummy User Performance
        performance: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: {
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
      };
    },
    methods: mapActions(
      {
        getCurrentMonth(dispatch) {
          var date = new Date();
          this.currentMonth = this.months[date.getMonth()];
        },

        initBigChart(dispatch, key) {
          let chartData = {
            datasets: [
              {
                label: key,
                data: this.userPerformance[key].average
              }
            ],
            labels: this.userPerformance.dates,
          };
          this.bigLineChart.chartData = chartData;
          this.bigLineChart.activeIndex = key;
        },

        getUserPerformance(dispatch, user){
          this.activeUser = user;
          this.newUserPerformance.email = this.activeUser.Email;
          this.isAssessedCurrentMonth = true;

          dispatch('getUserPerformance', this.activeUser.Email)
          .then((response) => {
            this.userPerformance = response;
            
            response.dates.forEach((element, i) => {
              this.userPerformance.dates[i] = this.months[parseInt(element.substr(5, 3), 10) - 1]
            })

            if(this.userPerformance.dates[this.userPerformance.dates.length - 1] == this.currentMonth){
              this.isAssessedCurrentMonth = true;
            }else{
              this.isAssessedCurrentMonth = false;
            }
          })
          .catch(() => {
            this.userPerformance = {};
            this.isAssessedCurrentMonth = false;
          })
          .then(() => {
            this.initBigChart("flexibility");
          })
        },

        postUserPerformance(dispatch) {
          dispatch('postUserPerformance', this.newUserPerformance)
          .then((response) => {
            alert("User performance saved successfully");
            this.showModal = false;
            this.isAssessmentVerified = false;
            this.isAssessedCurrentMonth = true;
            this.newUserPerformance = userPerformanceData;
            this.getUserPerformance(this.activeUser);
          })
          .catch((e) => {
            alert("Fail to save assessment data");
          })
        },

        getUsers(dispatch) {
          dispatch('getUsersByStatus', 'verified')
          .then((response) => {
              this.users = response;
          })
          .catch(error => {
              this.users = [];
          })
          .finally(() => {
            this.isFetchingUsers = false;
          })
        },
      }
    ),
  };
</script>
<style></style>

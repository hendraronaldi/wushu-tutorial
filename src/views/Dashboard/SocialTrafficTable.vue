<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">{{performanceData.label}}</h3>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table thead-classes="thead-light"
                  :data="performanceData.data">
        <template slot="columns">
          <th>Details</th>
          <th>Score</th>
          <th>Growth</th>
        </template>

        <template slot-scope="{row}">
            <th scope="row">
              {{row.name}}
            </th>
            <td>
              <div class="d-flex align-items-center">
                <span class="mr-2">{{row.score[row.score.length - 1]}}</span>
                <base-progress :type="row.score[row.score.length - 1] < 30 ? 'gradient-danger' : row.score[row.score.length - 1] < 75 ?  'gradient-warning' : 'gradient-success'"
                              class="pt-0"
                              :show-percentage="false"
                              :value="row.score[row.score.length - 1]"
                />
              </div>
            </td>
            <td>
                <span v-if="row.score[row.score.length - 1] - row.score[row.score.length - 2] < 0" class="text-danger mr-2">
                  <i class="fa fa-arrow-down"></i>{{row.score[row.score.length - 2] - row.score[row.score.length - 1]}}</span>
                <span v-else-if="row.score[row.score.length - 1] - row.score[row.score.length - 2] > 0" class="text-success mr-2">
                  <i class="fa fa-arrow-up"></i>{{row.score[row.score.length - 1] - row.score[row.score.length - 2]}}</span>
                <span v-else class="mr-2">0</span>
                <span class="text-nowrap">Since last month</span>
            </td>
        </template>

      </base-table>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'social-traffic-table',
    props: {
      performanceData: Object
    },

  }
</script>
<style>
</style>

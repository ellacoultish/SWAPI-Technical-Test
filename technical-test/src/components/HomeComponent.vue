<template>
  <div class="home-parent">
      <v-simple-table v-if="!loading">
        <thead>
          <tr>
            <th>Name</th>
            <th>Likes</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="character in charactersList.results" @click="extractIdFromApi(character.url)" :key="character.name">
            <td>{{ character.name }}</td>
            <td>0</td>
          </tr>
        </tbody>
      </v-simple-table>
      <v-skeleton-loader v-else type="table-thead@1,table-row-divider@10"></v-skeleton-loader>
    <v-pagination :value="pageNumber" :circle="true" :length="numbeOfPages" @input="getData($event)"></v-pagination>
  </div>

</template>

<script>
import ApiMixin from '../mixins/ApiMixin.js'
  export default {
    name: 'HomeComponent',
    mixins: [ApiMixin],
    data() {
      return {
        charactersList: [],
        pageNumber: 1,
        numbeOfPages:10,
        loading: true
      }
    },
    methods: {
      async getData(pageNumber) {
        this.pageNumber = pageNumber;
        this.loading = true;
        const res = await fetch("https://swapi.dev/api/people/?page=" + pageNumber);
        const finalRes = await res.json();
        this.charactersList = finalRes;
        this.loading = false;
        console.log(this.charactersList);
      },
    },
    mounted() {
      this.getData(this.pageNumber);
    }
  }
</script>

<style lang="scss">
.home-parent{

  v-simple-table{
    height: 100%;
  }
}
</style>

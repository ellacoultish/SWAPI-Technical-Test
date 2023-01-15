<template>
  <div class="home-parent">
      <v-simple-table v-if="!this.$store.state.loading">
        <thead>
          <tr>
            <th>Name</th>
            <th>Likes</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="character in charactersList.results" @click="goToCharacterPage(character.url)" :key="character.name">
            <td>{{ character.name }}</td>
            <td>{{$store.getters.getCharacterLikesById(extractIdFromApi(character.url)) ?? 0}}</td>
          </tr>
        </tbody>
      </v-simple-table>
      <v-skeleton-loader v-else type="table-thead@1,table-row-divider@10"></v-skeleton-loader>
    <v-pagination :value="pageNumber" :circle="true" :length="numberOfPages" @input="getData($event)"></v-pagination>
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
        numberOfPages:10,
        itemsPerPage: 10
      }
    },
    methods: {
      async getData(pageNumber) {
        this.pageNumber = pageNumber;
        this.$store.commit('loading',{state:true});
        this.charactersList = await this.getCharactersByPage(pageNumber);
        this.$store.commit('loading',{state:false});
      },
      goToCharacterPage(url){
      const id = this.extractIdFromApi(url);
      this.$router.push('/character/' + id);
      }
    },
    async mounted() {
     await this.getData(this.pageNumber);
     //calculates the number of pages needed to show all characters
     this.numberOfPages = Math.ceil(this.charactersList.count/this.itemsPerPage);
    }
  }
</script>

<style lang="scss">
.home-parent{
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 10%;
  .v-data-table{
    flex: 1;
  }
  .v-pagination__item--active{
    background-color: darkcyan !important;
  }
  tr{
    cursor: pointer;
  }
}
</style>

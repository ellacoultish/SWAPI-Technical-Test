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
        numbeOfPages:10
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

<template>
  <div class="character-parent" v-if="!this.$store.state.loading">
    <v-btn elevation="2" @click="navigateHome()"> 
      <v-icon right dark>
        mdi-arrow-left
      </v-icon>
      Go Back
    </v-btn>
    <h2>{{ userData.name }}</h2>
    <div class="content-wrapper">
    <v-card max-width="375" class="mx-auto" >
    <v-list two-line>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{userData.birth_year}}</v-list-item-title>
          <v-list-item-subtitle>Date of Birth</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item-title>{{userData.height}}</v-list-item-title>
          <v-list-item-subtitle>Height</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item-title>{{userData.mass}}</v-list-item-title>
          <v-list-item-subtitle>Mass</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item-title>{{userData.homeworld}}</v-list-item-title>
          <v-list-item-subtitle>Home World</v-list-item-subtitle>
        </v-list-item-content>
        </v-list-item>
        </v-list>
    </v-card>
    <v-btn> 
      <v-icon right dark>
        mdi-pencil-plus
      </v-icon>
      Write Review
    </v-btn>
      <v-btn @click="$store.commit('likeCharacter',$route.params.id)  "> 
      <v-icon right dark>
        mdi-thumb-up
      </v-icon>
      Like Character
    </v-btn>
    </div>
  </div>
  <div class="center" v-else>
    <v-progress-circular
      indeterminate
    ></v-progress-circular>
  </div>

</template>

<script>
  export default {
    name: 'CharacterComponent',

    data() {
      return {
        userData: null,
        loading: true,
        breadcrumbItems: []
      }
    },
    methods: {
      async getUserData(){
        this.$store.commit('loading',{state:true});
        const res = await fetch("https://swapi.dev/api/people/" + this.$route.params.id);
        const finalRes = await res.json();
        this.userData = finalRes;
        this.$store.commit('loading',{state:false});
        console.log(this.userData);
        this.breadcrumbItems.push({
        disabled: false,
        href: "",
        link: true,
        text: this.userData.name
      })
      },
      navigateHome(){
        this.$router.push('/');
      }
    },
    mounted() {
      this.getUserData();
      this.breadcrumbItems.push({
        disabled: false,
        href: "",
        link: true,
        text: "Characters"
      })
    }
  }
</script>
<style lang="scss">
.character-parent{
  padding: 200px;
}
.content-wrapper{

  display: flex;
  margin: auto;
  align-items: center;
  justify-content: center;
}

.center{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
<template>
  <div class="character-parent" v-if="!this.$store.state.loading">
    <ButtonComponent class="back-button" text="Go Back" icon="mdi-arrow-left" @button-clicked="navigateHome()"></ButtonComponent>
    <div class="content-wrapper">
  <v-card max-width="500px" class="d-flex justify-center">
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ userData?.name}}</v-list-item-title>
          <v-list-item-subtitle>Name</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{userData?.birth_year}}</v-list-item-title>
          <v-list-item-subtitle>Date of Birth</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{userData?.height}}</v-list-item-title>
          <v-list-item-subtitle>Height</v-list-item-subtitle>
        </v-list-item-content>
        </v-list-item>
        <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{userData?.mass}}</v-list-item-title>
          <v-list-item-subtitle>Mass</v-list-item-subtitle>
        </v-list-item-content>
        </v-list-item>
        <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{userData?.gender}}</v-list-item-title>
          <v-list-item-subtitle>Gender</v-list-item-subtitle>
        </v-list-item-content>
        </v-list-item>
        <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{userData?.skin_color}}</v-list-item-title>
          <v-list-item-subtitle>Skin Colour</v-list-item-subtitle>
        </v-list-item-content>
        </v-list-item>
        <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{userData?.hair_color}}</v-list-item-title>
          <v-list-item-subtitle>Hair Colour</v-list-item-subtitle>
        </v-list-item-content>
        </v-list-item>
        <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{$store.getters.getCharacterLikesById($route.params.id) ?? 0}}</v-list-item-title>
          <v-list-item-subtitle>Likes</v-list-item-subtitle>
        </v-list-item-content>
        </v-list-item>
        <v-list-item>
        <v-list-item-content>
          <ButtonComponent text="Write Review" icon="mdi-pencil-plus"></ButtonComponent>
          <ButtonComponent text="Like Character" icon=" mdi-thumb-up"  @button-clicked="$store.commit('likeCharacter',$route.params.id)"></ButtonComponent>
          </v-list-item-content>
          </v-list-item>
        </v-list>

    </v-card>
 

    </div>
  </div>
  <div class="center" v-else>
    <v-progress-circular
      indeterminate
    ></v-progress-circular>
  </div>

</template>

<script>
import ButtonComponent from '@/components/ButtonComponent.vue'
  export default {
    name: 'CharacterComponent',
    components: {
      ButtonComponent
    },
    data() {
      return {
        userData: null,
        loading: true
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
      },
      navigateHome(){
        this.$router.push('/');
      }
    },
    mounted() {
      this.getUserData();
    }
  }
</script>
<style lang="scss">
.character-parent{
  padding: 100px;
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
.back-button{
  position: absolute;
  top: 40px;
  left: 40px;
}
</style>
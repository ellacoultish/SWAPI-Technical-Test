<template>
  <div class="character-parent" v-if="!this.$store.state.loading">
    <ButtonComponent class="back-button" text="Go Back" icon="mdi-arrow-left" @button-clicked="navigateHome()"></ButtonComponent>
    <div class="content-wrapper">
  <v-card max-width="500px" class="d-flex justify-center">
    <v-list>
      <ListItemComponent :title="'Name'" :value="userData?.name"></ListItemComponent>
      <ListItemComponent :title="'Birth Year'" :value="userData?.birth_year"></ListItemComponent>
      <ListItemComponent :title="'Height'" :value="userData?.height"></ListItemComponent>
      <ListItemComponent :title="'Mass'" :value="userData?.mass"></ListItemComponent>
      <ListItemComponent :title="'Hair Colour'" :value="userData?.hair_color"></ListItemComponent>
      <ListItemComponent :title="'Skin Colour'" :value="userData?.skin_color"></ListItemComponent>
      <ListItemComponent :title="'Likes'" :value="$store.getters.getCharacterLikesById($route.params.id) ?? 0"></ListItemComponent>
        <v-list-item>
        <v-list-item-content>
          <ButtonComponent text="Like Character" icon=" mdi-thumb-up"  @button-clicked="$store.commit('likeCharacter',$route.params.id)"></ButtonComponent>
          <ButtonComponent text="Write Review" icon="mdi-pencil-plus"  @button-clicked="dialog = true"></ButtonComponent>
          <v-dialog v-model="dialog" persistent max-width="600px">
                <ReviewComponent @closeWindow="dialog=false" :character-id="$route.params.id"></ReviewComponent>  
            </v-dialog>
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
import ButtonComponent from '@/components/ButtonComponent.vue';
import ReviewComponent from '@/components/ReviewComponent.vue';
import ListItemComponent from '@/components/ListItemComponent.vue';
import ApiMixin from "@/mixins/ApiMixin.js"
  export default {
    name: 'CharacterComponent',
    mixins: [ApiMixin],
    components: {
      ButtonComponent,
      ReviewComponent,
      ListItemComponent
    },
    data() {
      return {
        userData: null,
        loading: true,
        dialog: false,
      }
    },
    methods: {
      async getUserData(){
        this.$store.commit('loading',{state:true});
        this.userData = await this.getCharacterById(this.$route.params.id);
        this.$store.commit('loading',{state:false});
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
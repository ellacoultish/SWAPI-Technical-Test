import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {   
    loading: false,
    characterLikes: []
  },
  getters: {
    getCharacterLikesById: (state) => (id) => {
      console.log(id);
      console.log(state.characterLikes);
      return state.characterLikes.find(element => element.id === id)?.likes;
    }
  },
  mutations: {
    loading(state, payload){
      state.loading = payload.state; 
    },
    likeCharacter(state, id){
      let character = state.characterLikes.find(element => element.id === id);
      if(character){
        character.likes++;
        console.log(character.likes);
        console.log(state.characterLikes);
      }
      else{
        state.characterLikes.push({id:id,likes: 1});
      }
    },
  },
  actions: {
  },
  modules: {
  }
})

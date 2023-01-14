<template>
  <div class="character-parent">
    <v-breadcrumbs :items="breadcrumbItems"></v-breadcrumbs>
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
    <v-btn elevation="2"> 
      <v-icon right dark>
        mdi-pencil-plus
      </v-icon>
      Write Review</v-btn>
    </div>
 
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
        this.loading = true;
        const res = await fetch("https://swapi.dev/api/people/" + this.$route.params.id);
        const finalRes = await res.json();
        this.userData = finalRes;
        this.loading = false;
        console.log(this.userData);
        this.breadcrumbItems.push({
        disabled: false,
        href: "",
        link: true,
        text: this.userData.name
      })
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
.content-wrapper{
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: center;
}
</style>
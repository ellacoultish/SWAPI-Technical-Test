<template>
    <v-card>
      <v-card-title>
          <span class="text-h5">Write Review</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field label="Name" v-model="review.name" ></v-text-field>
            <v-menu v-model="menu" min-width="auto">
        <template v-slot:activator="{ on, attrs }">
          <v-text-field v-model="review.date" label="Review Date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
        </template>
        <v-date-picker
        v-model="review.date"
          @input="menu = false"
        ></v-date-picker>
      </v-menu>
      <v-textarea label="Review" v-model="review.review"></v-textarea>
      <v-select label="Score" v-model="review.score" :items="scores"></v-select>
          </v-container>
        </v-card-text>
      <v-card-actions>
        <v-btn text @click="$emit('closeWindow')">
            Cancel
          </v-btn>
          <v-btn text @click="submitReview()">
            Save
          </v-btn>
      </v-card-actions>
    </v-card>
</template>

<script>
import ApiMixin from "@/mixins/ApiMixin.js"
  export default {
    name: 'ReviewComponent',
    props: ['characterId'],
    emits: ['closeWindow'],
    mixins: [ApiMixin],
    data () {
      return {
        dialog: false,
        menu: false,
        review: {name:null, date: null,review:null,score:5,characterId:this.characterId},
        scores: [1,2,3,4,5,6,7,8,9,10]
      }
    },
    methods: {
      submitReview(){
        this.postReview(this.review);
        this.$emit('closeWindow');
      }
    }
  }
</script>
<style lang="scss">
</style>
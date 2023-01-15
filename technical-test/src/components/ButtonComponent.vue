<template>
     <v-btn elevation="2" @click="$emit('button-clicked')"> 
      <v-icon right dark>
        {{icon}}
      </v-icon>
      {{text}}
    </v-btn>
</template>

<script>
  export default {
    name: 'ButtonComponent',
    props: {
      text: String,
      icon: String
    },
    emits: ['button-clicked'],
  }
</script>
<style lang="scss">
</style>
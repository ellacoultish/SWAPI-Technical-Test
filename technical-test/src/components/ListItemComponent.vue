<template>
        <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{value}}</v-list-item-title>
          <v-list-item-subtitle>{{title}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
</template>

<script>
  export default {
    name: 'ListItemComponent',
    props:{
      title: String,
      value: String
    },
    emits: [],
  }
</script>
<style lang="scss">
</style>
export default {
    methods: {
      extractIdFromApi: function(apiURL){
        const splitURL = apiURL.split("/");
        const id = splitURL[splitURL.length-2];
        return id;
      }
    }
  };
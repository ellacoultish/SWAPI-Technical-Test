export default {
    methods: {
      extractIdFromApi: function(apiURL){
        const splitURL = apiURL.split("/");
        const id = splitURL[splitURL.length-2];
        return id;
      },
      getCharactersByPage: async function(pageNumber){
        const res = await fetch("https://swapi.dev/api/people/?page=" + pageNumber);
        return await res.json();
      },
      postReview: async function(review){
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({review})
        };
        return await fetch("https://swapi.dev/api/review/", requestOptions);
      }
    }
  };
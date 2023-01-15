export default {
    methods: {
      extractIdFromApi: function(apiURL){
        const splitURL = apiURL.split("/");
        const id = splitURL[splitURL.length-2];
        return id;
      },
      getCharactersByPage: async function(pageNumber){
        const response = await fetch("https://swapi.dev/api/people/?page=" + pageNumber);
        if (!response.ok){
          throw response.statusText;
        }
        else{
          return await response.json();
        }
      },
      getCharacterById: async function(characterId){
        const response = await fetch("https://swapi.dev/api/people/" + characterId);
        if (!response.ok){
          throw response.statusText;
        }
        else{
          return await response.json();
        }
      },
      postReview: async function(review){
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({review})
          };
          const response = await fetch("https://swapi.dev/api/review/", requestOptions);
          if (!response.ok){
            throw response.statusText;
          }
          else{
            return response.json();
          }
      }
    }
  };
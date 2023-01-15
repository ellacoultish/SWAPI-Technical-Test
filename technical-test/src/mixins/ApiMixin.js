export default {
    methods: {
      //Returns the ID out of SWAPI's URLs
      extractIdFromApi: function(apiURL){
        const splitURL = apiURL.split("/");
        const id = splitURL[splitURL.length-2];
        return id;
      },
      //Fetches page of characetrs from SWAPI
      getCharactersByPage: async function(pageNumber){
        const response = await fetch("https://swapi.dev/api/people/?page=" + pageNumber);
        if (!response.ok){
          throw response.statusText;
        }
        else{
          return await response.json();
        }
      },
      //Fetches Character details from SWAPI
      getCharacterById: async function(characterId){
        const response = await fetch("https://swapi.dev/api/people/" + characterId);
        if (!response.ok){
          throw response.statusText;
        }
        else{
          return await response.json();
        }
      },
      //Example post of a review
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
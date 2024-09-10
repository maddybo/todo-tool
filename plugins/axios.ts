import axios from "axios";

export default defineNuxtPlugin(() => {
  // ustawienie bazowego URL, w produkcyjnej appce przychodziłby z .env
  axios.defaults.baseURL = "http://51.83.230.116:9000";

  // tutaj tez można dodać logike to refresh tokena
  // można było też uzyć wrappera nuxt do axiosa

  return {
    provide: {
      axios,
    },
  };
});

import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41079066-0341c17d8bd684537c8a66e3e';

export default class NewsApiService {
  constructor() {
    this.searchAnimal = '';
    this.page = 1;
  }

  fetchHits() {
    const queryParams = {
      key: API_KEY,
      q: `${this.searchAnimal}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: `${this.page}`,
      per_page: 100,
    };
    return axios
      .get(BASE_URL, { params: queryParams })
      .then(response => {
        this.incrementPage();
        return response.data.hits;
      })
      .catch(error => console.log(error));
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get animal() {
    return this.searchAnimal;
  }

  set animal(newSearchAnimal) {
    this.searchAnimal = newSearchAnimal;
  }
}

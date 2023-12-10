import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41079066-0341c17d8bd684537c8a66e3e';

export default class NewsApiService {
  constructor() {
    this.searchAnimal = '';
    this.page = 1;
    this.per_page = 100;
  }

  async fetchHits() {
    try {
      const queryParams = {
        key: API_KEY,
        q: `${this.searchAnimal}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: `${this.page}`,
        per_page: `${this.per_page}`,
      };

      const response = await axios.get(BASE_URL, { params: queryParams });
      this.incrementPage();
      return response.data.hits;
    } catch (error) {
      console.error('Error fetching hits:', error);
      throw error;
    }
  }

  incrementPage() {
    this.page += 1;
    // this.per_page += 40;
  }

  getTotalHits() {
    return (this.totalHits = this.per_page);
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

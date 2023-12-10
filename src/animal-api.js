import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41079066-0341c17d8bd684537c8a66e3e';

export default class NewsApiService {
  constructor() {
    // this.searchAnimal = '';
    this.page = 1;
    // this.per_page = 40;
    // this.totalHits = 1;
  }

  async fetchHits(searchQuery, currentPage) {
    try {
      const queryParams = {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: currentPage,
        per_page: '40',
      };

      const response = await axios.get(BASE_URL, { params: queryParams });
      this.incrementPage();
      return response.data;
    } catch (error) {
      console.error('Error fetching hits:', error);
      throw error;
    }
  }

  incrementPage() {
    this.page += 1;
  }

  // getTotalHits() {
  //   return (this.totalHits = data.totalHits);
  // }

  resetPage() {
    this.page = 1;
  }

  // get animal() {
  //   return this.searchAnimal;
  // }

  // set animal(newSearchAnimal) {
  //   this.searchAnimal = newSearchAnimal;
  // }
}

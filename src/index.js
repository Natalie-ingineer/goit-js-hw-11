const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41079066-0341c17d8bd684537c8a66e3e';

const queryParams = new URLSearchParams({
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  page: page,
  per_page: 40,
});

let page = 1;

const searchForm = document.querySelector('.search-form');
const btnSubmit = document.querySelector('button');
const loadMore = document.querySelector('.load-more');
const divGallery = document.querySelector('.gallery');

searchForm.addEventListener('submit', handlerSearch);
btnSubmit.addEventListener('click', handlerSubmit);
loadMore.addEventListener('click', handlerLoadMore);

function handlerSearch(event) {
  event.preventDefault();

  const data = new FormData(event.currentTarget);
  const arr = data
    .getAll('animal')
    .filter(item => item)
    .map(item => item.trim());
  getAnimals(arr);
}

async function getAnimals(arr) {
  const resps = arr.map(async item => {
    const resp = fetch(`${BASE_URL}?API_KEY&${queryParams}`);
  });
}

console.log('Buy world!');

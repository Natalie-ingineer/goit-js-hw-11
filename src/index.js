const axios = require('axios').default;

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41079066-0341c17d8bd684537c8a66e3e';

let page = 1;

const queryParams = {
  key: API_KEY,
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  page: page,
  per_page: 40,
};

axios
  .get(BASE_URL, { params: queryParams })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  });

const searchForm = document.querySelector('.search-form');
const btnSubmit = document.querySelector('button');
const loadMore = document.querySelector('.load-more');
const divGallery = document.querySelector('.gallery');

// searchForm.addEventListener('submit', handlerSearch);
// btnSubmit.addEventListener('click', handlerSubmit);
// loadMore.addEventListener('click', handlerLoadMore);

// function handlerSearch(event) {
//   event.preventDefault();

//   const data = new FormData(event.currentTarget);
//   const arr = data
//     .getAll('animal')
//     .filter(item => item)
//     .map(item => item.trim());
//   getAnimals(arr)
//     .then(async resp => {
//       const animals = resp.map(({ origin }) => origin[0]);
//       const animalsService = await getAnimals(animals);
//       divGallery.innerHTML = createMarkup(animalsService);
//     })
//     .catch(e => console.log(e))
//     .finally(() => searchForm.reset());
// }

// async function getAnimals(arr) {
//   const resps = arr.map(async animal => {
//     const queryParams = new URLSearchParams({
//       key: API_KEY,
//       q: animal,
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: 'true',
//       page: page,
//       per_page: 40,
//     });

//     const resp = await fetch(`${BASE_URL}?${queryParams}&${animal}`);
//     if (!resp.ok) {
//       throw new Error();
//     }
//     return await resp.json();
//   });

//   const data = await Promise.allSettled(resps);
//   const animalObj = data
//     .filter(({ status }) => status === 'fulfilled')
//     .map(({ value }) => value[0]);

//   return animalObj;
// }

// async function getAnimals(arr) {
//   const resps = arr.map(async item => {
//     const resp = await fetch(`${BASE_URL}?${queryParams}&${item}`);
//     if (!resp.ok) {
//       throw new Error();
//     }
//     return await resp.json();
//   });
//   const data = await Promise.allSettled(resps);
//   const animalObj = data
//     .filter(({ status }) => status === 'fulfilled')
//     .map(({ value }) => value[0]);

//   return animalObj;
// }

// function createMarkup() {
//   `<div class="photo-card">
//     <img src="" alt="" loading="lazy" />
//     <div class="info">
//       <p class="info-item">
//         <b>Likes</b>
//       </p>
//       <p class="info-item">
//         <b>Views</b>
//       </p>
//       <p class="info-item">
//         <b>Comments</b>
//       </p>
//       <p class="info-item">
//         <b>Downloads</b>
//       </p>
//     </div>
//   </div>;`;
// }

// function handlerSubmit() {}
// function handlerLoadMore() {}

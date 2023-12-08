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
    console.log(error);
    console.log(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  });

const searchForm = document.querySelector('.search-form');
const btnSubmit = document.querySelector('button');
const loadMore = document.querySelector('.load-more');
const divGallery = document.querySelector('.gallery');

searchForm.addEventListener('submit', handlerSearch);
btnSubmit.addEventListener('click', handlerSubmit);
// loadMore.addEventListener('click', handlerLoadMore);

async function handlerSearch(event) {
  event.preventDefault();

  const data = new FormData(event.currentTarget);
  const arr = data
    .getAll('animal')
    .filter(item => item)
    .map(item => item.trim());

  try {
    const animalsService = await getAnimals(arr);
    divGallery.innerHTML = createMarkup(animalsService);
  } catch (e) {
    console.log(e);
  } finally {
    searchForm.reset();
  }
}

async function getAnimals(arr) {
  const resps = arr.map(async animal => {
    const queryParams = new URLSearchParams({
      key: API_KEY,
      q: animal,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 40,
    });

    const resp = await fetch(`${BASE_URL}?${queryParams}`);
    if (!resp.ok) {
      throw new Error();
    }
    return await resp.json();
  });

  return Promise.all(resps);
}

function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes'${likes}'</b>
      </p>
      <p class="info-item">
        <b>Views'${views}'</b>
      </p>
      <p class="info-item">
        <b>Comments'${comments}'</b>
      </p>
      <p class="info-item">
        <b>Downloads'${downloads}'</b>
      </p>
    </div>
  </div>;`
    )
    .join('');
}

function handlerSubmit() {}
// function handlerLoadMore() {}

// const data = new FormData(event.currentTarget);
//   const arr = data
//     .getAll('animal')
//     .filter(item => item)
//     .map(item => item.trim());
//   getAnimals(arr)
//     .then(async resp => {
//       // const animals = resp.map(
//       //   ({
//       //     webformatURL,
//       //     largeImageURL,
//       //     tags,
//       //     likes,
//       //     views,
//       //     comments,
//       //     downloads,
//       //   }) => [...arg[0]]
//       // );
//       const animalsService = await Promise.all(resp);
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
//       safesearch: true,
//       page: page,
//       per_page: 40,
//     });

//     const resp = await fetch(`${BASE_URL}?${queryParams}`);
//     if (!resp.ok) {
//       throw new Error();
//     }
//     return await resp.json();
//   });

//   // const data = await Promise.allSettled(resps);
//   // const animalObj = data
//   //   .filter(({ status }) => status === 'fulfilled')
//   //   .map(({ hits }) => hits[0]);

//   // return animalObj;

//   return resps;
// }

// function createMarkup(arr) {
//   return arr
//     .map(
//       ({
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) => `<div class="photo-card">
//     <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//     <div class="info">
//       <p class="info-item">
//         <b>Likes'${likes}'</b>
//       </p>
//       <p class="info-item">
//         <b>Views'${views}'</b>
//       </p>
//       <p class="info-item">
//         <b>Comments'${comments}'</b>
//       </p>
//       <p class="info-item">
//         <b>Downloads'${downloads}'</b>
//       </p>
//     </div>
//   </div>;`
//     )
//     .join('');
// }

// function handlerSubmit() {}
// // function handlerLoadMore() {}

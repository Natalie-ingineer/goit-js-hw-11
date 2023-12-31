import NewsApiService from './js/animal-api';

import { lightbox } from './js/lightbox';

import { success, error, warning } from './js/notify';

import { renderMarkup } from './js/gallery';

const body = document.querySelector('body');
const searchForm = document.querySelector('.search-form');
const btnSubmit = document.querySelector('button');
const loadMore = document.querySelector('.load-more');
const divGallery = document.querySelector('.gallery');

const newsApiService = new NewsApiService();

searchForm.addEventListener('submit', handlerSearch);
loadMore.addEventListener('click', onLoadMore);
let totalHits = 1;
let page = 1;
let maxPage;

loadMore.style.display = 'none';

async function handlerSearch(e) {
  e.preventDefault();

  newsApiService.animal = e.currentTarget.searchQuery.value;

  if (
    newsApiService.animal.trim() === '' ||
    !/^[a-zA-Z]+$/.test(newsApiService.animal)
  ) {
    divGallery.innerHTML = '';
    onLoaderHidden();
    return error();
  }

  newsApiService.resetPage();

  try {
    const newHits = await newsApiService.fetchHits();

    if (newHits.length === 0) {
      onLoaderHidden();
      return error();
    }

    totalHits = newHits.length * page;

    clearDivContainer();
    createMarkupAnimals(newHits);
    success(totalHits);
    loadMore.style.display = 'block';

    if (newHits.length < 40) {
      loadMore.style.display = 'none';
      warning();
    }
  } catch (error) {
    error(error.message);
  }
  lightbox.refresh();
}

async function onLoadMore() {
  try {
    const newHits = await newsApiService.fetchHits();

    let newHitsCount = Number(newHits.length);

    totalHits += newHitsCount;

    createMarkupAnimals(newHits);
    success(totalHits);

    if (newHitsCount === 0 || totalHits >= 500 || newHitsCount < 40) {
      loadMore.style.display = 'none';
      warning();
      return;
    }

    if (newHitsCount < totalHits) {
      loadMore.style.display = 'block';
    }
  } catch (error) {
    error(error.message);
  }
  lightbox.refresh();
}

function createMarkupAnimals(hits) {
  divGallery.insertAdjacentHTML('beforeend', renderMarkup(hits));
}

function clearDivContainer() {
  divGallery.innerHTML = '';
}

function onLoaderVisible() {
  loadMore.style.display = 'block';
}

function onLoaderHidden() {
  loadMore.style.display = 'none';
}

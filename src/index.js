import NewsApiService from './animal-api';

// import Notiflix from 'notiflix';

// import Notiflix from 'notiflix/dist/notiflix-aio-3.2.6.min.js';

// Notiflix.Notify.init({
//   width: '280px',
//   position: 'right-top', // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' - 'center-top' - 'center-bottom' - 'center-center'
//   distance: '10px',
//   opacity: 1,
//   borderRadius: '5px',
//   rtl: false,
//   timeout: 3000,
//   messageMaxLength: 110,
//   backOverlay: false,
//   backOverlayColor: 'rgba(0,0,0,0.5)',
//   plainText: true,
//   showOnlyTheLastOne: false,
//   clickToClose: false,
//   pauseOnHover: true,

//   ID: 'NotiflixNotify',
//   className: 'notiflix-notify',
//   zindex: 4001,
//   fontFamily: 'Quicksand',
//   fontSize: '13px',
//   cssAnimation: true,
//   cssAnimationDuration: 400,
//   cssAnimationStyle: 'fade', // 'fade' - 'zoom' - 'from-right' - 'from-top' - 'from-bottom' - 'from-left'
//   closeButton: false,
//   useIcon: true,
//   useFontAwesome: false,
//   fontAwesomeIconStyle: 'basic', // 'basic' - 'shadow'
//   fontAwesomeIconSize: '34px',

//   failure: {
//     background: '#ff5549',
//     textColor: '#fff',
//     childClassName: 'notiflix-notify-failure',
//     notiflixIconColor: 'rgba(0,0,0,0.2)',
//     fontAwesomeClassName: 'fas fa-times-circle',
//     fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
//     backOverlayColor: 'rgba(255,85,73,0.2)',
//   },
// });

const searchForm = document.querySelector('.search-form');
const btnSubmit = document.querySelector('button');
const loadMore = document.querySelector('.load-more');
const divGallery = document.querySelector('.gallery');

const newsApiService = new NewsApiService();

searchForm.addEventListener('submit', handlerSearch);
loadMore.addEventListener('click', onLoadMore);
let totalHits = 500;
let hits = 0;

loadMore.style.display = 'none';
divGallery.style.display = 'flex';
divGallery.style.flexWrap = 'wrap';

async function handlerSearch(e) {
  e.preventDefault();

  newsApiService.animal = e.currentTarget.searchQuery.value;

  if (
    newsApiService.animal.trim() === '' ||
    !/^[a-zA-Z]+$/.test(newsApiService.animal)
  ) {
    onLoaderHidden();
    return alert('Oops!');
  }

  newsApiService.resetPage();

  try {
    const hits = await newsApiService.fetchHits();

    if (hits.length === 0) {
      onLoaderHidden();
      return alert('Oops(((');
    }
    clearDivContainer();
    createMarkupAnimals(hits);
    onLoaderVisible();
  } catch (error) {
    console.log('Error fetching hits:', error.name);
    alert(
      'An error occurred while fetching search results. Please try again later.'
    );
  }
}

async function onLoadMore() {
  try {
    const newHits = await newsApiService.fetchHits();

    if (newHits.length === 0) {
      onLoaderHidden();
      return;
    }

    createMarkupAnimals(newHits);
    hits += newHits.length;

    if (hits < totalHits) {
      onLoaderVisible();
    } else {
      onLoaderHidden();
      divGallery.insertAdjacentHTML(
        'beforeend',
        `<p>We're sorry, but you've reached the end of search results.</p>`
      );
    }
  } catch (error) {
    console.error('Error fetching hits:', error);
  }
}

function renderMarkup(hits) {
  return hits
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
    <img src="${webformatURL}" alt="${tags}" width = "300" loading="lazy" />
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
  </div>`
    )
    .join('');
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

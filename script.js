
console.log('Итого 60/60')
console.log("Критерии оценки приложения:");
console.log("+10: Вёрстка");
console.log("+5: Наличие нескольких фото и строки поиска на странице");
console.log("+5: Наличие в футере приложения ссылки на GitHub автора, год создания приложения и логотип курса со ссылкой на курс");
console.log("+10: При загрузке приложения на странице отображаются полученные от API изображения");
console.log("+10: Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения соответствующей тематики, если такие данные предоставляет API");
console.log("+30: Реализация поиска");
console.log("+5: При открытии приложения курсор находится в поле ввода");
console.log("+5: Наличие placeholder в поле поиска");
console.log("+5: Отключение автозаполнения поля ввода (нет выпадающего списка с предыдущими запросами)");
console.log("+5: Поисковый запрос можно отправить нажатием клавиши Enter");
console.log("+5: После отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода");
console.log("+5: В поле ввода есть крестик, при клике на который поисковый запрос из поля ввода удаляется и отображается placeholder");
console.log("+10: Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения");
console.log("+10: Высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо");

// создаем нужный запрос
function createRequestUrl() {
  const searchInput = document.getElementById('search-input');
  const inputContent = searchInput.value; 
  
  const url = `https://api.unsplash.com/search/photos?query=${inputContent}&per_page=28&orientation=landscape&client_id=85mYNtOlzRi1DPfKyIidA_NCz4URYHy4md3DgS5lAOg`;
  
  return url; 
}

// выброс ошибки при пустом поле либо отсутствии результатов
function errorImg() {
  const imgErrSrc = './assets/Nothing.jpeg'
  createNodeImg(imgErrSrc);
}


let imgObj = {};
// получаем фото c API
async function fetchHandler() {
  try {
    const requestUrl = createRequestUrl();
    const response = await fetch(requestUrl);
    const data = await response.json();
    imgObj.data = data;
    if (imgObj.data.results.length === 0) {
      errorImg();
    } else createImagesFromData(imgObj.data.results);

  } catch (error) {
    console.log(error);
  }
}

// создаем img
function createNodeImg(imageSrc) {
  const imgContainer = document.createElement('div');
  imgContainer.className = 'img-container';

  const img = document.createElement('img');
  img.src = imageSrc;
  img.alt = '';

  imgContainer.appendChild(img);

  const galleryContainer = document.querySelector('.gallery-container');

  galleryContainer.appendChild(imgContainer);
}

// Функция для создания изображений из данных
function createImagesFromData(results) {
  results.forEach((result) => {
    const imageSrc = result.urls.regular;
    createNodeImg(imageSrc);
  });
}

// очищаем старые картинки 
function cleanContent() {
  const galleryContainer = document.querySelector('.gallery-container');
  while (galleryContainer.firstChild) {
    galleryContainer.removeChild(galleryContainer.firstChild);
  }
}

// обработка инпута
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    cleanContent();
    event.preventDefault();
    fetchHandler();
  }
});

// Функция для выполнения поиска с текстом "search" при загрузке страницы
function performDefaultSearch() {
  const defaultSearchText = 'search';
  searchInput.value = defaultSearchText; 
  fetchHandler();
  searchInput.value = '';
  searchInput.focus(); 
}

// Вызываем поиск при загрузке страницы
document.addEventListener('DOMContentLoaded', performDefaultSearch);

const clearButton = document.getElementById('clear-button');
// Обработчик для кнопки "крест"
clearButton.addEventListener('click', function() {
  searchInput.value = '';
  searchInput.focus();
});

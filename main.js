// Настройки

const apiKey = 'de9f118d-8f9a-4440-a0d9-c4f8fd480919'

const url = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/'
const options = {
    method: 'GET',
    headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
    },
}

// DOM эдементы
const filmsWrapper = document.querySelector('.films')
const loader = document.querySelector('.loader-wrapper')
const btnShowMore = document.querySelector('.show-more')
btnShowMore.onclick = fetchAndRenderFilms;

let page = 1;


// Основная функция, в ней происходит взаимодействие. Отвечает за получение и вывод ТОП 250 фильмов
async function fetchAndRenderFilms (event) {
    //console.log(event);
    // Показываем прелоадер
    loader.classList.remove('none')

    // Получаем данные по фильмам
    const data = await fetchData(url + `top?page=${page}`, options)
    // Добавляем возможность увеличивать номер страницы чтобы добавлять фильмы по нажатии кнопки
    if (data.pagesCount > 1) {
        page += 1
    }
  
    // Проверка на отображение кнопки сработает, если страниц для отображения > 1
    if (data.pagesCount > 1) {
        // Отобразить кнопку 'Следующие 20 фильмов'
        btnShowMore.classList.remove('none')
    }

    // Скрываем прелоадер

    loader.classList.add('none')

    // Рендерим фильмы
    renderFilms(data.films)   

    // Убираем кнопку 'Следующие 20 фильмов' при достижении максимального номера страницы
    if (page > data.pagesCount) {
        btnShowMore.textContent = 'Всё'
    }

}

// Функция для работы с фетчем.
async function fetchData(url, options) {
    const response = await fetch(url, options)
    const data = await response.json()
    return data
}

// Функция для перебора массива фильмов, добавляем img и информацию. Рендерит фильмы.    
function renderFilms(films) {
    for (film of films) {
        //console.log(film);

// Создаём div card и присваиваем сard Id соответствующего фильма
        const card = document.createElement('div')
        card.classList.add('card')
        card.id = film.filmId

// По клику должна запуститься функция для отображения деталей фильма
        card.onclick = openFilmDetails;

// Наполнение для div card
        const html = `
            <img src= ${film.posterUrlPreview}  alt="Cover" class="card__img">
            <h3 class="card__title">${film.nameRu}</h3>
            <p class="card__year">Год: ${film.year}</p>
            <p class="card__rate">Рейтинг: ${film.rating}</p>
        `;
        
// Добавляем HTML к нашей карточке
        card.insertAdjacentHTML("afterbegin", html)

// с помощью этой инструкции вставляем кусок разметки по каждому фильму в filmsWrapper     
        filmsWrapper.insertAdjacentElement("beforeend", card) 
        }
}

async function openFilmDetails (event) {

// Выводим в консоль элемент card (c нужным Id) по которому кликаем
    //console.log(event.currentTarget.id);

// Достаем Id фильма
    const id = event.currentTarget.id

// Получаем данные фильма для отображения, для этого используем уже существующую функцию fetchData, но с другими параметрами
    const data = await fetchData(url + id, options) 
        console.log(data);
    
// Отобразить детали фильма на странице
    renderFilmData(data)
}

function renderFilmData (film) {
    console.log('RENDER!');

    // 1. Отрендерить container-right

    const containerRight = document.createElement('div')
    containerRight.classList.add('container-right')
    document.body.insertAdjacentElement('beforeend', containerRight)

    // 2.1 Кнопка закрытия
    const btnClose = document.createElement('button');
    btnClose.classList.add('btn-close');

    // вставляем HTML Разметку в кнопку
    btnClose.innerHTML = '<img src="./img/OIP.jpg" alt="Close" width="24">'
    containerRight.insertAdjacentElement('afterbegin', btnClose)

    // 2.2 Кнопка закрытия по клику, удаление контейнера со страницы. Альтернативный вариант кода закомментируем
    // btnClose.onclick = function close() {
    //     containerRight.classList.add('none')
    // }
        btnClose.onclick = () => {containerRight.remove()}

    // 3. Детали фильма

    const html = `<div class="film">
    <div class="film__title">${film.nameRu}</div>

    <div class="film__img">
        <img src= ${film.posterUrlPreview} alt="Cover">
    </div>

    <div class="film__desc">
        <p class="film__details">Год: ${film.year}</p>
        <p class="film__details">Рейтинг: ${film.ratingKinopoisk}</p>
        <p class="film__details">Продолжительность: ${film.filmLength} минут.</p>
        <p class="film__details">Страна: ${film.countries[0]['country']}</p>
        <p class="film_text">${film.description}</p>
    </div>
</div>`

containerRight.insertAdjacentHTML('beforeend', html)

}

    // Вызываем основную функцию. Такой способ 'отлавливания ошибок' короче, чем через try catch
fetchAndRenderFilms().catch(err => console.log(err))
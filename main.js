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
async function fetchAndRenderFilms () {
    // Показываем прелоадер
    loader.classList.remove('none')

    // Получаем данные по фильмам
    const data = await fetchData(url + `top?page=${page}`, options)
    // Добавляем возможность увеличивать номер страницы чтобы добавлять фильмы по нажати. кнопки
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
        const html = `<div class="card">
            <img src= ${film.posterUrlPreview}  alt="Cover" class="card__img">
            <h3 class="card__title">${film.nameRu}</h3>
            <p class="card__year">Год: ${film.year}</p>
            <p class="card__rate">Рейтинг: ${film.rating}</p>
        </div>`;
           
        // с помощью этой инструкции вставляем кусок разметки по каждому фильму в filmsWrapper     
        filmsWrapper.insertAdjacentHTML("beforeend", html) 
        }
}
    // Вызываем основную функцию. Такой способ 'отлавливания ошибок' короче, чем через try catch
fetchAndRenderFilms().catch(err => console.log(err))
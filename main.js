const apiKey = 'de9f118d-8f9a-4440-a0d9-c4f8fd480919'


const url = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/'
const options = {
    method: 'GET',
    headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
    },
}

// Закомментировали код, сделаем ниже через функцию
// fetch(url + 'top', options)
//     .then(res => res.json())
//     .then(json => console.log(json))
//     .catch(err => console.log(err))


// Объявляем переменную, находим и присваиваем ей элемент с классом films
const filmsWrapper = document.querySelector('.films')


async function fetchAndRenderFilms () {
    const response = await fetch(url + 'top', options)
    const data = await response.json()
    console.log(data); 
    console.log(data.films);


    for (film of data.films) {
        console.log(film);
        
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
// Такой способ 'отлавливания ошибок' короче, чем через try catch
fetchAndRenderFilms().catch(err => console.log(err))
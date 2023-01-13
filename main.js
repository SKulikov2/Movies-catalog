const apiKey = 'de9f118d-8f9a-4440-a0d9-c4f8fd480919'


const url = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/'
const options = {
    method: 'GET',
    headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
    },
}


fetch(url + 'top', options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.log(err))
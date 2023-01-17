const upButton = document.querySelector('.up-button')

window.onscroll = function() {
    if(window.pageYOffset > 800) {
        upButton.classList.remove('none')
    };
}

upButton.onclick = function () {
    window.scrollTo(0, 0)
}
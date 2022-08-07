const searchBox = document.querySelector('.search-box');

document.querySelector('.share-button').addEventListener('click', () => {
    searchBox.classList.remove('hidden');
});

document.querySelector('.search-box .close').addEventListener('click', () => {
    searchBox.classList.add('hidden');
    searchBox.querySelector('.results').innerHTML = '';
    searchBox.querySelector('.search-input').value = '';
});

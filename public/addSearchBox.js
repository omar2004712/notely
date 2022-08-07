const searhBoxTemplate = `
  <div class="search-box">
    <div class="close-container">
      <i class="fa-solid fa-xmark close"></i>
    </div>
    <div class="search-input-container">
      <input
        type="text"
        class="search-input"
        placeholder="Search for someone"
      />
      <i class="fa-solid fa-magnifying-glass search-button"></i>
    </div>
    <div class="result dropdown scrollbar-hidden">
    <div class="dropdown-item">
      <span>John</span>
      <i class="fa-solid fa-plus add-editor"></i>
    </div>
    <div class="dropdown-item">
      <span>John</span>
      <i class="fa-solid fa-plus add-editor"></i>
    </div>
    <div class="dropdown-item">
      <span>John</span>
      <i class="fa-solid fa-plus add-editor"></i>
    </div>
    <div class="dropdown-item">
      <span>John</span>
      <i class="fa-solid fa-plus add-editor"></i>
    </div>
    <div class="dropdown-item">
      <span>John</span>
      <i class="fa-solid fa-plus add-editor"></i>
    </div>
  </div>
  `;

document.querySelector('.share-button').addEventListener('click', () => {
    if (document.querySelector('.search-box')) {
        return;
    }

    const searchBoxEl = document.createElement('div');
    searchBoxEl.classList.add('search-box-container');
    searchBoxEl.innerHTML = searhBoxTemplate;
    document.body.appendChild(searchBoxEl);

    document
        .querySelector('.search-box .close')
        .addEventListener('click', () => {
            searchBoxEl.remove();
        });
});

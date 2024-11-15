document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.querySelector('.searchBtn');
  const searchBar = document.querySelector('.search-bar');
  const closeSearchButton = document.querySelector('.searchClose');
  const input = document.querySelector('.searchInput');

  searchButton.addEventListener('click', () => {
    searchBar.style.visibility = 'visible';
    searchBar.classList.add('open');
    input.focus();
  });

  closeSearchButton.addEventListener('click', () => {
    searchBar.style.visibility = 'hidden';
    searchBar.classList.remove('open');
  });
});

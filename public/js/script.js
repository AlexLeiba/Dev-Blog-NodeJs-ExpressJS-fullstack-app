document.addEventListener('DOMContentLoaded', () => {
  // SEARCH BAR
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
  //

  // DASHBOARD LOGOUT
  const logoutButton = document.querySelector('.logoutButton');
  logoutButton.addEventListener('click', () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.reload();
  });
  //
});

document.addEventListener('DOMContentLoaded', () => {
  // SEARCH BAR
  const searchButton = document.querySelector('.searchBtn');
  const searchBar = document.querySelector('.search-bar');
  const closeSearchButton = document.querySelector('.searchClose');
  const input = document.querySelector('.searchInput');

  searchButton.addEventListener('click', () => {
    console.log('searchButton clicked');
    searchBar.style.visibility = 'visible';
    searchBar.classList.add('open');
    input.focus();
  });

  closeSearchButton.addEventListener('click', () => {
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

  const showToastBtn = document.querySelector('.auth-form');

  showToastBtn.addEventListener('click', async () => {
    const message = 'Blog deleted successfully';
    const timeout = 3000;

    const toast = document.querySelector(`.toast`);
    toast.classList.add('open');
    toast.innerHTML = message;
    setTimeout(() => {
      toast.classList.add('toast');
    }, timeout);
  });
});

// ADD NEW BLOG

// const addBlogForm = document.getElementById('new-blog-form');

// if (addBlogForm) {
//   addBlogForm.addEventListener('submit', async (event) => {
//     event.preventDefault(); // Prevent the form from submitting the traditional way

//     const formData = new FormData(event.target.value); // Get form data

//     try {
//       // Submit the form using fetch
//       const response = await fetch('/auth/add-new-blog', {
//         method: 'POST',
//         body: formData,
//       });

//       // Handle successful response
//       Toastify({
//         text: data.message,
//         duration: 3000,
//         gravity: 'top',
//         position: 'right',
//         backgroundColor: 'linear-gradient(to right, #28a745, #218838)',
//       }).showToast();

//       console.log('data\n\n\n', response.json());
//       alert('new blog added');
//     } catch (error) {
//       // Trigger a toast alert for errors
//       Toastify({
//         text: `Error: ${error.message}`,
//         duration: 3000,
//         gravity: 'top',
//         position: 'right',
//         backgroundColor: 'linear-gradient(toright, #ff4b1f, #ff416c)',
//       }).showToast();
//       console.log('error', error);
//     }
//   });
// } else {
//   console.log('addBlogForm not found');
// }

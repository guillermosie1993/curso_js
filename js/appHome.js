let currentUser = JSON.parse(localStorage.getItem('current_user'));
let bannerTitle = document.getElementById('heroBanner-title');

console.log(currentUser);

bannerTitle.innerText = `Hola, ${currentUser.userName}`
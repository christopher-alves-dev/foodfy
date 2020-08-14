const openMenuBtn = document.querySelector('.openMenuButton');
const closeMenuBtn = document.querySelector('.closeMenuButton');
const mobileMenu = document.querySelector('.nav');

openMenuBtn.addEventListener('click', function() {
  mobileMenu.classList.toggle('nav-active');
  openMenuBtn.classList.toggle('hide');
  closeMenuBtn.classList.toggle('hide');
})

closeMenuBtn.addEventListener('click', function() {
  mobileMenu.classList.toggle('nav-active');
  openMenuBtn.classList.toggle('hide');
  closeMenuBtn.classList.toggle('hide');
})

// ================================

// === Individual Page ===
const cards = document.querySelectorAll('.recipeCard');

// for (let card of cards) {
//   card.addEventListener('click', function() {
//     //pegar o atributo id 
//     const addressId = card.getAttribute('id');
   
//     window.location.href = `/recipes/${addressId}`;
    
//   })
// }

// === Recipe Wrapper ===
const content = document.querySelectorAll('.recipeInfo .content');
const buttons = document.querySelectorAll('.button');

for(let [i, button] of buttons.entries()) {
  button.addEventListener('click', () => {
    if(content[i].classList.contains('show')) {
      content[i].classList.remove('show');
      content[i].classList.add('hide');
      button.innerHTML= 'mostrar'
    } else {
      content[i].classList.add('show');
      content[i].classList.remove('hide');
      button.innerHTML= 'esconder';
    }
  });
};

// ===================================
const editButton = document.querySelector('#editButton');
const saveButton = document.querySelector('#saveButton');
console.log(editButton)
console.log(saveButton)
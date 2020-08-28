const openMenuBtn = document.querySelector('.openMenuButton');
const closeMenuBtn = document.querySelector('.closeMenuButton');
const mobileMenu = document.querySelector('.nav');

if(openMenuBtn) {
  
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
}


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

// === Add Field ===
const buttonsAdd = document.querySelectorAll('#addField');

if(buttonsAdd) {
  buttonsAdd.forEach(btn => btn.addEventListener('click', cloneField => {

    const field = cloneField.target.parentNode;
    const fieldContainer = field.querySelector('.fieldContainer');
    const fieldItems = field.querySelectorAll('.fieldInput');
    const newFieldItem = fieldItems[fieldItems.length - 1].cloneNode(true);

    if(newFieldItem.value == '') return false;

    newFieldItem.value = '';

    return fieldContainer.appendChild(newFieldItem);
  }))
}

// === Remove Field ===
// const btnRemoveField = document.querySelectorAll('#removeField');

// if(btnRemoveField) {
//   btnRemoveField.forEach(btn => btn.addEventListener('click', removeField => {
//     const field = removeField.target.parentNode;
//     const fieldItems = document.querySelectorAll('.fieldInput');
//     const fieldItem = fieldItems[fieldItems.length -1];

//     return field.removeChild(fieldItem);
//   }))
// }
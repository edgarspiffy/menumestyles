const desktopFilters = document.querySelector('#desktopFilters');
const cardHolder = document.querySelector('#cardHolder');
const attributes = document.querySelectorAll('.dish-attributes');
const addNew = document.querySelector('#addNew');
const hoursButton = document.querySelector('#duplicate-hours');



loadEventListener();
function loadEventListener() {
  addNew.addEventListener('click', displayForm);

  hoursButton.addEventListener('click', duplicateHours);


};



let selected = true;
function displayForm(e) {
  const theInput = document.querySelector('.adding-form');
  if (selected == true) {
    theInput.style.display = 'block'
    selected = false;
    return;
  }
  if (selected == false) {
    theInput.style.display = 'none'
    selected = true;
    return;
  }
  e.preventDefault();
}

function duplicateHours(e) {
  let mon = document.querySelector('#mon').value;
  let tue = document.querySelector('#tue');
  let wed = document.querySelector('#wed');
  let thu = document.querySelector('#thu');
  let fri = document.querySelector('#fri');
  let sat = document.querySelector('#sat');
  let sun = document.querySelector('#sun');

  tue.value = mon;
  wed.value = mon;
  thu.value = mon;
  fri.value = mon;
  sat.value = mon;
  sun.value = mon;

  e.preventDefault;
}







function openNav() {
  document.getElementById('mobile-filters').style.width = '100%';
};

function closeNav() {
  document.getElementById('mobile-filters').style.width = '0%';
}
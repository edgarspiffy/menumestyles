// const desktopFilters = document.querySelector('#desktopFilters');
// const cardHolder = document.querySelector('#cardHolder');
// const attributes = document.querySelectorAll('.dish-attributes');
// const addNew = document.querySelector('#addNew');




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

function duplicateHours() {

  let openMon = document.querySelector('#open-Monday').value;
  let closeMon = document.querySelector('#close-Monday').value;

  let openTue = document.querySelector('#open-Tuesday');
  let openWed = document.querySelector('#open-Wednesday');
  let openThu = document.querySelector('#open-Thursday');
  let openFri = document.querySelector('#open-Friday');
  let openSat = document.querySelector('#open-Saturday');
  let openSun = document.querySelector('#open-Sunday');

  let closeTue = document.querySelector('#close-Tuesday');
  let closeWed = document.querySelector('#close-Wednesday');
  let closeThu = document.querySelector('#close-Thursday');
  let closeFri = document.querySelector('#close-Friday');
  let closeSat = document.querySelector('#close-Saturday');
  let closeSun = document.querySelector('#close-Sunday');

  openTue.value = openMon;
  openWed.value = openMon;
  openThu.value = openMon;
  openFri.value = openMon;
  openSat.value = openMon;
  openSun.value = openMon;

  closeTue.value = closeMon;
  closeWed.value = closeMon;
  closeThu.value = closeMon;
  closeFri.value = closeMon;
  closeSat.value = closeMon;
  closeSun.value = closeMon;
}



function openNav() {
  document.getElementById('search-page-filters').style.width = '100%';
};

function closeNav() {
  document.getElementById('search-page-filters').style.width = '0%';
}
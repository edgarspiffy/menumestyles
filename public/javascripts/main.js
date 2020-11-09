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

  let openMon = document.querySelector('#openMonday').value;
  let closeMon = document.querySelector('#closeMonday').value;

  let openTue = document.querySelector('#openTuesday');
  let openWed = document.querySelector('#openWednesday');
  let openThu = document.querySelector('#openThursday');
  let openFri = document.querySelector('#openFriday');
  let openSat = document.querySelector('#openSaturday');
  let openSun = document.querySelector('#openSunday');

  let closeTue = document.querySelector('#closeTuesday');
  let closeWed = document.querySelector('#closeWednesday');
  let closeThu = document.querySelector('#closeThursday');
  let closeFri = document.querySelector('#closeFriday');
  let closeSat = document.querySelector('#closeSaturday');
  let closeSun = document.querySelector('#closeSunday');

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
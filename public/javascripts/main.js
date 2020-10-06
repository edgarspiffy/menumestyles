const desktopFilters = document.querySelector('#desktopFilters');
const cardHolder = document.querySelector('#cardHolder');
const attributes = document.querySelectorAll('.dish-attributes');

loadEventListener();


function loadEventListener(){
  desktopFilters.addEventListener('click',alertMe);
};

function alertMe(e){
  console.log(e.target.value);
  console.log(e.target.name);
  
  // attributes.forEach(som => {
  //   console.log(som.innerText);
  // })
}




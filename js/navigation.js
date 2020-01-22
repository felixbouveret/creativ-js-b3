
const body = document.querySelector('body');
let head
const seanceNbr = 4;

head = document.createElement('p');

for(let i = 1; i < 4; i++) {
  body.insertAdjacentHTML("afterbegin", '<li><a href="/seance' + i + '">Séance' + i + '</a></li>');
}
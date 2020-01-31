// DECLARATION VARIABLES
var can;
var ctx;

var tabCars = [];
var tabRoads = [];
var points = 0;
var deaths = 0;

let pointsDisplay
let deathsDisplay

const roadNumber = 5;
const carSpeed = 5;
const carSpawnRate = 300;

const initialFrog = {
  positionX:    300 - ((400 / roadNumber) / 2) /2,
  positionY:    100 + ((400 / roadNumber) * roadNumber) + (400 / roadNumber) / 2,
  size:         (400 / roadNumber) / 2,
  moveUp:       false,       
  moveDown:     false,       
  moveLeft:     false,       
  moveRight:    false,    
  speed:        5,
};
var frog = {};


function init(){
  can = document.getElementById('le_canvas');
  ctx = can.getContext('2d');

  generateRoadsTab();
  setInterval(generateCars, carSpawnRate);
  setInterval(display, 10);

  frog = initialFrog

  document.addEventListener("keydown", frogMovesKeyDown);
  document.addEventListener("keyup", frogMovesKeyUp);

  pointsDisplay = document.querySelector(".points")
  deathsDisplay = document.querySelector(".deaths")

}

generateRoadsTab = () => {
  for (let index = 0; index < roadNumber; index++) {
    road = {
      direction:    index % 2, 
      sizeY:        400 / roadNumber,
      sizeX:        600,
      positionY:    null,
      cars:         [],
    }
    road.positionY = 100 + road.sizeY * index

    tabRoads.push(road);
  }
};
displayRoads = () => {
  for (let index = 0; index < tabRoads.length; index++) {
    const road = tabRoads[index];
    
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.strokeStyle = "#000000";
  
    ctx.rect(0, road.positionY, road.sizeX, road.sizeY);
    ctx.stroke();
  }
}

displayFrog = () => {
  if (frog.moveUp) {
    frog.positionY -= frog.speed
  }
  if (frog.moveDown) {
    frog.positionY += frog.speed
  }
  if (frog.moveLeft) {
    frog.positionX -= frog.speed
  }
  if (frog.moveRight) {
    frog.positionX += frog.speed
  }
  ctx.beginPath();
  fillStyle = "rgb(0,255,0)";
  ctx.fillRect(frog.positionX, frog.positionY, frog.size, frog.size );
  ctx.fill();
}

frogMovesKeyDown = (event) => {
  if(event.key === "ArrowUp") {
    frog.moveUp = true;
  }
  if(event.key === "ArrowDown") {
    frog.moveDown = true;
  }
  if(event.key === "ArrowLeft") {
    frog.moveLeft = true;
  }
  if(event.key === "ArrowRight") {
    frog.moveRight = true;
  }
}

frogMovesKeyUp = (event) => {
  if(event.key === "ArrowUp") {
    frog.moveUp = false;
  }
  if(event.key === "ArrowDown") {
    frog.moveDown = false;
  }
  if(event.key === "ArrowLeft") {
    frog.moveLeft = false;
  }
  if(event.key === "ArrowRight") {
    frog.moveRight = false;
  }
}

generateCars = () => {
  const carRoadNumber = tabRoads[Math.floor(Math.random() * Math.floor(roadNumber))];
  const size = carRoadNumber.sizeY / 2 + Math.random() * 100;
  car = {
    direction:    carRoadNumber.direction,
    sizeY:        carRoadNumber.sizeY / 2,
    sizeX:        size,
    positionY:    carRoadNumber.positionY + (carRoadNumber.sizeY / 2) / 2,
    positionX:    carRoadNumber.direction ? 500 * carRoadNumber.direction + size : 500 * carRoadNumber.direction - size,
    deplacementX: carSpeed
  };

  tabCars.push(car);
}

gameRules = () => {
  if(frog.positionY < 0 || frog.positionX < 0 || frog.positionY > 600 || frog.positionX > 600) {
    frog.positionX = 300 - ((400 / roadNumber) / 2) /2
    frog.positionY = 100 + ((400 / roadNumber) * roadNumber) + (400 / roadNumber) / 2
  }

  for (let index = 0; index < tabCars.length; index++) {
    const car = tabCars[index];
    
    if(frog.positionY + frog.size > car.positionY 
      && frog.positionY < car.positionY + car.sizeY 
      && frog.positionX + frog.size > car.positionX 
      && frog.positionX < car.positionX + car.sizeX) {
      frog.positionX = 300 - ((400 / roadNumber) / 2) /2
      frog.positionY = 100 + ((400 / roadNumber) * roadNumber) + (400 / roadNumber) / 2
      deaths++

      deathsDisplay.innerHTML = "Morts : " + deaths;
    }
  }

  if (frog.positionY + frog.size < 100) {
    frog.positionX = 300 - ((400 / roadNumber) / 2) /2
    frog.positionY = 100 + ((400 / roadNumber) * roadNumber) + (400 / roadNumber) / 2
    points++;
    pointsDisplay.innerHTML = "Points : " + points;
  }
}

display = () => {

  ctx.clearRect(0,0,600,600);
  for (let index = 0; index < tabCars.length; index++) {
    const element = tabCars[index];
    // deplacement

    if(element.direction === 0) {
      element.positionX += element.deplacementX;
      if(element.positionX > 800) {
        let partIndex = tabCars.indexOf(element);
        tabCars.splice(partIndex, 1);
      }
    } else {
      element.positionX -= element.deplacementX;
      if(element.positionX < -300 - element.sizeX) {
        let partIndex = tabCars.indexOf(element);
        tabCars.splice(partIndex, 1);
      }
    }
    
    // affichage

    ctx.fillStyle = "#000000";
    
    ctx.beginPath();
    ctx.fillRect(element.positionX, element.positionY, element.sizeX, element.sizeY );
    ctx.fill();

  }
  displayRoads()
  displayFrog()
  gameRules()

}

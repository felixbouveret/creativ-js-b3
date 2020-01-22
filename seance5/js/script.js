// DECLARATION VARIABLES
var can;
var ctx;

var tabParts = [];
var mousePosition = {x:0, y:0}
var part
var partIndex = 0

function init(){
  can = document.getElementById('le_canvas');
  ctx = can.getContext('2d');

  can.addEventListener("mousemove", getMouseCoords);
  setInterval(generate,10);
}

getMouseCoords = (event) => {
  mousePosition.x = event.layerX;
  mousePosition.y = event.layerY;
}

generate = () => {
  part = {
    index:        partIndex,
    positionX:    mousePosition.x,
    positionY:    mousePosition.y,
    direction:    Math.random() * 360,
    opacity:      1,
    colorR:       255 * Math.random(),
    colorG:       255 * Math.random(),
    colorB:       255 * Math.random(),
    speed:        .5 + Math.random(),
    size:         1 + Math.random() * 10,
    lifeTime:     100 + Math.random() * 50,
  };
  tabParts.push(part);

  display();
}

display = () => {

  ctx.clearRect(0,0,600,600);

  for (let index = 0; index < tabParts.length; index++) {
    const element = tabParts[index];
    // deplacement
    const deplacementX = Math.cos(element.direction * Math.PI / 180) * element.speed;
    const deplacementY = Math.sin(element.direction * Math.PI / 180) * element.speed;

    element.positionX += deplacementX;
    element.positionY += deplacementY;
    
    element.lifeTime--;
    element.opacity-=.01;

    if(element.lifeTime <= 0) {
      let partIndex = tabParts.indexOf(element);
      tabParts.splice(partIndex, 1);
    }

    // affichage

    ctx.fillStyle = "rgba(" + element.colorR + "," + element.colorG+ "," + element.colorB + "," + element.opacity + ")";
    
    ctx.beginPath();
    ctx.arc(element.positionX, element.positionY, element.size, 0, 2 * Math.PI);
    ctx.fill();
  }
}

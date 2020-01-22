// DECLARATION VARIABLES
var can;
var ctx;
var boulet_count=0;
var tab_boulets = [];
var canon_pos = {x:300,y:500};
var mouse_pos = {x:0,y:0};
var canon_angle = 0;
var canon = document.createElement("img");
canon.src = "IMG/canon.png";
var boul = document.createElement("img");
boul.src = "IMG/boulet.png";

function init(){
  can = document.getElementById('le_canvas');
  ctx = can.getContext('2d');
  can.onmousemove = get_mouse_position;
  can.onmousedown = create_projectile;
  setInterval(refresh,10);
}
function refresh(){
  ctx.clearRect(0,0,600,600);
    canon_orientation();
    gestion_boulets();
}

function get_mouse_position(event){
  mouse_pos.x = event.clientX - 164;
  mouse_pos.y = event.clientY - 64;
}

function canon_orientation(){
    var dx = mouse_pos.x-canon_pos.x;
    var dy = mouse_pos.y-canon_pos.y;
    canon_angle = Math.atan2(dy,dx);
    ctx.translate(canon_pos.x, canon_pos.y);
    ctx.rotate(canon_angle);
    ctx.drawImage(canon, -50, -50,100,100);
    // reinitialisation de la matrice
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}
function create_projectile(){
  var boulet = {
    id_b:boulet_count,
    vit:10,
    x:canon_pos.x,
    y:canon_pos.y,
    orient:canon_angle,
    vx:Math.cos(canon_angle),
    vy:Math.sin(canon_angle)
  }
  tab_boulets.push(boulet);
  boulet_count++;
}
function gestion_boulets(){
  for (var i = 0; i < tab_boulets.length; i++) {
    var b = tab_boulets[i];
    b.x+= b.vx*b.vit;
    b.y+= b.vy*b.vit;
    boulet_out(b);
    ctx.translate(b.x, b.y);
    ctx.rotate(b.orient);
    ctx.drawImage(boul, -25, -25,50,50);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}
function boulet_out(arg_boulet){
  if(arg_boulet.x>600 || arg_boulet.x<0
  || arg_boulet.y>600 || arg_boulet.y<0){
    var boul_index = tab_boulets.indexOf(arg_boulet);
    tab_boulets.splice(boul_index,1);
  }
}
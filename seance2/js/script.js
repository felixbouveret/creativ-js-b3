init = () => {

  const nb_parts = 100;
  let tab_parts = [];
  
  // espace canvas
  let can = document.querySelector('#le_canvas');
  let ctx = can.getContext('2d');

  // generation des particules
  for (let i = 0; i < nb_parts; i++ ) {
    // generation d'une particule
    let part = {
      posx: Math.random()*500, // position X
      posy: Math.random()*500, // position Y
      direction: Math.random()*360, // direction en degré
      height: 1 + Math.random() * 10,
      speed: .5 + Math.random() * 2,
      r: 255*Math.random(),
      g: 255*Math.random(),
      b: 255*Math.random(),
    };

    // insertion de la particule dans le tableau
    tab_parts.push(part);
  }

  loop = () => {
    // Nettoyage du canvas
    ctx.clearRect(0, 0, 500, 500);

    // on traite tous les elements du tableau
    for (let i = 0; i < tab_parts.length; i++) {
      
      let temp_part = tab_parts[i];
      
      // deplacement (vitesse x et y)
      let vx = Math.cos(temp_part.direction * Math.PI / 180);
      let vy = Math.sin(temp_part.direction * Math.PI / 180);
      temp_part.posx += vx*temp_part.speed;
      temp_part.posy += vy*temp_part.speed;

      // affichage
      ctx.beginPath();
      ctx.fillStyle='rgb(' + temp_part.r + ',' + temp_part.g + ',' + temp_part.b + ')';
      ctx.arc(temp_part.posx, temp_part.posy, temp_part.height, 0, 2 * Math.PI)
      ctx.fill();

      // detection hors zone
      if(temp_part.posy > 400 || temp_part.posy < 100 || temp_part.posx > 400 || temp_part.posx < 100 ) {
        temp_part.direction ++;
      }
  
    }

  }

  setInterval(loop, 10);

};

init = () => {
  
  let tab_parts = [];
  const nb_parts = 10; 
  
  // espace canvas
  const can = document.querySelector('#le_canvas');
  const ctx = can.getContext('2d');


  gen = () => {
    for ( let i = 0; i < nb_parts; i++ ) {

      let angle = Math.random() * 2 * Math.PI;
      let rayon = 100 + Math.random() * 50;
      let dx = Math.sin(angle) * rayon;
      let dy = Math.cos(angle) * rayon;

      let part = {
        id: i,
        posx: 250,
        posy: 250,
        destx: 250 + dx,
        desty: 250 + dy,
        age: 100,
      };

      tab_parts.push(part);

    };

  };

  loop = () => {
    ctx.fillStyle = 'rgba(255,255,255, .5)'; 
    ctx.clearRect( 0, 0, 500, 500)
    ctx.fill();

    for (let i = 0; i < tab_parts.length; i++) {
      let p = tab_parts[i];
      
      
      // déplacement
      let vx = ( p.destx - p.posx ) / 10;
      let vy = ( p.desty - p.posy ) / 10;

      p.posx += vx;
      p.posy += vy;
      p.age--;

      if ( p.age === 0 ) {
        tab_parts.splice(p.id, 1)
      }

      // affichage
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(p.posx, p.posy, 2, 1, .2 * Math.PI);
      ctx.fill();
    };
  
  };

  setInterval(gen, 60);
  setInterval(loop, 30);

};

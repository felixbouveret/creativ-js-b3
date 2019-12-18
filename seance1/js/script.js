init = () => {

  const spacer = 0;
  const size = 10;
  const radius = 200;
  const nb_pounts = 75; 
  const offsetx = 250;
  const offsety = 250;


  let can = document.querySelector('#le_canvas');
  let c = can.getContext('2d');

  for(let i = 0; i < nb_pounts; i++) {
    let angle = 360/nb_pounts*i*Math.PI/180;
    let px = Math.cos(angle)*radius;
    let py = Math.sin(angle)*radius;

    c.beginPath();
    let hue = i / nb_pounts * 360;
    c.fillStyle = 'hsl(' + hue + ', 50%, 50%)';
    c.strokeStyle = 'hsl(' + hue + ', 50%, 50%)';
    c.arc(offsetx+px, offsety+py , 5, 0, 2 * Math.PI);
    c.fill();

    c.lineWidth = 2;
    c.moveTo(offsetx, offsety);
    c.lineTo(offsetx+px, offsety+py);
    c.stroke();
  };
  
  // let count = 0;

  // setInterval( () => { 
  //   for(let i = 0; i < 50; i++) {

  //     for(let u = 0; u < 50; u++) {
  
  //       let r = Math.random() * 255;
  //       let g = Math.random() * 255;
  //       let b = Math.random() * 255;
  
  //       c.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
  //       // c.fillRect(i*(size+spacer),u*(size+spacer),size,size);
  //       c.fillText(count, i*(size+spacer),u*(size+spacer))
  //       count++
  
  //     }
  
  //   }
  //   count = 0
  // }, 1);


  

};


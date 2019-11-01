//basic setups
let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let c = canvas.getContext('2d');
//declare some variables
let mouse = {
  x: undefined,
  y: undefined
}
let maxRadius = 40;
let colorArray = [
  '#247ba0',
  '#70c1b3',
  '#b2dbbf',
  '#F3FFBD',
  '#FF1654'
]
//interact with the canvas
window.addEventListener('mousemove',
  function(e){
    mouse.x = e.x;
    mouse.y = e.y;
    console.log(mouse);
});

window.addEventListener('resize',
  function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

//create a circle object
function Circle(x, y, dx, dy, radius){
  this.radius = radius;
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
  //draw the circle
  this.draw = function(){
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    //c.stroke();
    c.fill();
  }
  //use draw method and update the circle
  this.update = function(){
    this.draw();
    //if the circle's edge hit the edge of the creen change the dx dy to nagative
    if(this.x + radius > innerWidth || this.x - radius < 0){
      this.dx = -this.dx;
    }
    if(this.y + radius > innerHeight || this.y - radius < 0){
      this.dy = -this.dy;
    }
    //update the position of the circle
    this.y += this.dy;
    this.x += this.dx;
    //interact with mouse
    //if mouse is in a curtain range of the circle then do something
    if(mouse.x - this.x < 50 && mouse.x - this.x > - 50 && mouse.y - this.y < 50 & mouse.y - this.y > -50){
      //set the max radius so the radius will not grow indefinitely
      if(this.radius < maxRadius){
        this.radius += 2.5;
      }
    }else if(this.radius > radius){
      this.radius -= 2.5;
    }
  }
}
//end of circle object


//create multiple randomly located circle in an array
//and put them in an circleAray
let number = 600;
let circleArray = [];
function init(){
  circleArray = [];
  for(let i = 0; i < number; i++){
    let radius = Math.floor(Math.random() * 5) + 1;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 2;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dy = (Math.random() - 0.5) * 2;
    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}

function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for(let i = 0; i < circleArray.length; i++){
    circleArray[i].update();
  }
}

init();
animate();
